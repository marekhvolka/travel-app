import { GraphQLJSONObject } from 'graphql-type-json'
import { ObjectID } from 'mongodb'
import { Arg, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql'
import { ItemInput } from '../inputs/ItemInput'
import { Context } from '../models/Context'
import { defaultRestrictions, Item } from '../models/Item'
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
        firstItemId: item.id.toString(),
      },
    })

    const relations2 = await ItemRelation.find({
      where: {
        secondItemId: item.id.toString(),
      },
    })

    return [
      ...relations1.map(relation => new ObjectID(relation.secondItemId)),
      ...relations2.map(relation => new ObjectID(relation.firstItemId)),
    ]
  }

  @FieldResolver(() => [Item])
  async relatedItems(@Root() item: Item, @Arg('published', { nullable: true }) published: boolean) {
    const relations1 = await ItemRelation.find({
      where: {
        firstItemId: item.id.toString(),
      },
    })

    const relations2 = await ItemRelation.find({
      where: {
        secondItemId: item.id.toString(),
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
        ...(published ? { published: true } : {})
      },
    })
  }

  @FieldResolver(() => Restrictions)
  restrictions(@Root() item: Item) {
    if (item.restrictions) {
      return item.restrictions
    }

    return defaultRestrictions
  }

  @Query(() => Item)
  fetchItem(@Arg('id') id: string) {
    return Item.findOne(id)
  }

  @Query(() => GraphQLJSONObject)
  returnNewItem(@Ctx() context: Context) {
    if (!context.user) {
      throw new AuthorizationError('User not authorized')
    }

    return Item.create()
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

    let item: Item | undefined

    if (data.id) {
      await Item.update(data.id, data)
      item = await Item.findOne(data.id)
    } else {
      item = await Item.create(data).save()
    }
    const promises = data.relatedItemIds.map(async (relatedItemId: string) => {
      const relations1 = await ItemRelation.find({
        where: {
          firstItemId: relatedItemId,
          secondItemId: data.id,
        }
      })

      const relations2 = await ItemRelation.find({
        where: {
          firstItemId: data.id,
          secondItemId: relatedItemId,
        }
      })

      if (relations1.length === 0 && relations2.length === 0) {
        ItemRelation.create({
          firstItemId: new ObjectID(data.id),
          secondItemId: new ObjectID(relatedItemId),
        }).save()
      }
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
