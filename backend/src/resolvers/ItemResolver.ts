import { Item } from '../models/Item'
import { Tag } from '../models/Tag'
import {ItemRelation} from "../models/ItemRelation";
import {Arg, FieldResolver, Mutation, Query, Resolver, Root} from "type-graphql";
// import {Restrictions} from "../models/Restrictions";
import {ObjectID} from "mongodb";
import {In} from "typeorm";
import {Restrictions} from "../models/Restrictions";

@Resolver(() => Item)
export class ItemResolver {

  @FieldResolver(() => [Tag])
  tags(@Root() item: Item) {
    return Tag.find({
      where: {
        _id: In(item.tagIds.map((id) => new ObjectID(id)))
      }
    })
  }

  @FieldResolver(() => [String])
  async relatedItemIds(@Root() item: Item) {
    const relations1 = await ItemRelation.find({
      where: {
        firstItemId: item.id
      }
    })

    const relations2 = await ItemRelation.find({
      where: {
        secondItemId: item.id
      }
    })

    return [
      ...relations1.map(
        relation =>
          new ObjectId(relation.secondItemId)
      ),
      ...relations2.map(
        relation =>
          new ObjectId(relation.firstItemId)
      )
    ]
  }

  @FieldResolver(() => [Item])
  async relatedItems(@Root() item: Item) {
    const relations1 = await ItemRelation.find({
      where: {
        firstItemId: item.id
      }
    });

    const relations2 = await ItemRelation.find({
      where: {
        secondItemId: item.id
      }
    });

    return Item.find({
      where: {
        _id: In([
          ...relations1!.map(relation => new ObjectId(relation.secondItemId)),
          ...relations2!.map(relation => new ObjectId(relation.firstItemId))
        ])
      }
    })
  }

  @FieldResolver(() => Restrictions)
  restrictions(@Root() item: Item) {
    if (item.restrictions) {
      return item.restrictions
    }

    return {
      state: 'notDefined',
      dayRestrictions: {
        mon: {
          state: 'open'
        },
        tue: {
          state: 'open',
        },
        wed: {
          state: 'open',
        },
        thu: {
          state: 'open',
        },
        fri: {
          state: 'open',
        },
        sat: {
          state: 'open',
        },
        sun: {
          state: 'open',
        }
      }
    }
  }

  @Query(() => Item)
  fetchItem(@Arg("id", {nullable: false}) id: string) {
    return Item.findOne(id)
  }

  @Query(() => [Item])
  items() {
    return Item.find({})
  }

  @Mutation(() => Item)
  async updateItem(_, { data }) {
    const item = data.id ? Item.update(data.id, data) : Item.create(data)
    const promises = data.relatedItemIds.map((relatedItemId: string) => {
      return ItemRelation.find()
        .or([
          {
            firstItemId: relatedItemId,
            secondItemId: data.id
          },
          {
            firstItemId: data.id,
            secondItemId: relatedItemId
          }
        ])
        .then(relations => {
          console.log(relations)

          if (relations.length === 0) {
            ItemRelation.create({
              firstItemId: data.id,
              secondItemId: relatedItemId
            })
          }
        })
    })

    await  Promise.all(promises)
    return item
  }
}
