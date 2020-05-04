import { ObjectID } from 'mongodb'
import { Arg, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql'
import { ItemInput } from '../inputs/ItemInput'
import { City } from '../models/City'
import { Context } from '../models/Context'
import { Item } from '../models/Item'
import { ItemRelation } from '../models/ItemRelation'
import { Restrictions } from '../models/Restrictions'
import { Tag } from '../models/Tag'
import { AuthorizationError } from '../utils/errors'

@Resolver(() => Item)
export class ItemResolver {
  @FieldResolver(() => [Tag])
  tags(@Root() item: Item) {
    return Tag.find({
      where: {
        _id: { $in: item.tagIds.map(id => new ObjectID(id)) },
      },
    })
  }

  @FieldResolver(() => [String])
  async relatedItemIds(@Root() item: Item) {
    const relations1 = await ItemRelation.find({
      where: {
        firstItemId: item.id,
      },
    })

    const relations2 = await ItemRelation.find({
      where: {
        secondItemId: item.id,
      },
    })

    return [
      ...relations1.map(relation => new ObjectID(relation.secondItemId)),
      ...relations2.map(relation => new ObjectID(relation.firstItemId)),
    ]
  }

  @FieldResolver(() => [Item])
  async relatedItems(@Root() item: Item) {
    const relations1 = await ItemRelation.find({
      where: {
        firstItemId: item.id,
      },
    })

    const relations2 = await ItemRelation.find({
      where: {
        secondItemId: item.id,
      },
    })

    return Item.find({
      where: {
        _id: {
          $in: [
            ...relations1!.map(relation => new ObjectID(relation.secondItemId)),
            ...relations2!.map(relation => new ObjectID(relation.firstItemId)),
          ],
        },
      },
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
          state: 'open',
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
        },
      },
    }
  }

  @Query(() => Item)
  fetchItem(@Arg('id', { nullable: false }) id: string) {
    return Item.findOne(id)
  }

  @Query(() => [Item])
  items() {
    return Item.find({})
  }

  @Mutation(() => Item)
  async updateItem(@Arg('data') data: ItemInput, @Ctx() context: Context) {
    if (!context.user) {
      throw new AuthorizationError('User not authorized')
    }

    let item;

    if (data.id) {
      await Item.update(data.id, data)
      item = Item.findOne(data.id)
    } else {
      item = Item.create(data).save()
    }
    const promises = data.relatedItemIds.map((relatedItemId: string) => {
      return ItemRelation.find()
        .or([
          {
            firstItemId: relatedItemId,
            secondItemId: data.id,
          },
          {
            firstItemId: data.id,
            secondItemId: relatedItemId,
          },
        ])
        .then(relations => {
          console.log(relations)

          if (relations.length === 0) {
            ItemRelation.create({
              firstItemId: data.id,
              secondItemId: relatedItemId,
            })
          }
        })
    })

    await Promise.all(promises)
    return item
  }

  @Mutation(() => Boolean)
  deleteItem(@Arg('id') id: string, @Ctx() context: Context) {
    if (!context.user) {
      throw new AuthorizationError('User not authorized')
    }

    Item.delete(id)
    return true
  }
}
