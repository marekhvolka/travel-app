import { defaultRestrictions, Item, ItemRelation, Restrictions, Tag } from '@md/common'
import { GraphQLJSONObject } from 'graphql-type-json'
import { ObjectID } from 'mongodb'
import { Arg, FieldResolver, Mutation, Query, Resolver, Root, UseMiddleware } from 'type-graphql'
import { getRepository } from 'typeorm'
import { ItemInput } from '../inputs/ItemInput'
import { isAuth } from '../middleware/isAuth'

const ItemRepository = getRepository(Item)
const ItemRelationRepository = getRepository(ItemRelation)
const TagRepository = getRepository(Tag)

@Resolver(() => Item)
export class ItemResolver {
  @FieldResolver(() => [Tag])
  tags(@Root() item: Item) {
    return TagRepository.find({
      where: {
        _id: { $in: item.tagIds.map(id => new ObjectID(id)) },
      },
    })
  }

  @FieldResolver(() => [String])
  async relatedItemsIds(@Root() item: Item) {
    const relations1 = await ItemRelationRepository.find({
      where: {
        firstItemId: item.id.toString(),
      },
    })

    const relations2 = await ItemRelationRepository.find({
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
    const relations1 = await ItemRelationRepository.find({
      where: {
        firstItemId: item.id.toString(),
      },
    })

    const relations2 = await ItemRelationRepository.find({
      where: {
        secondItemId: item.id.toString(),
      },
    })

    return ItemRepository.find({
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
    return ItemRepository.findOne(id)
  }

  @Query(() => GraphQLJSONObject)
  @UseMiddleware(isAuth)
  returnNewItem() {
    return ItemRepository.create()
  }

  @Query(() => [Item])
  items() {
    return ItemRepository.find({})
  }

  @Mutation(() => Item)
  @UseMiddleware(isAuth)
  async updateItem(@Arg('data') data: ItemInput) {
    let item: Item | undefined

    if (data.id) {
      await ItemRepository.update(data.id, data)
      item = await ItemRepository.findOne(data.id)
    } else {
      item = await ItemRepository.save(data)
    }
    const promises = data.relatedItemsIds.map(async (relatedItemId: string) => {
      const relations1 = await ItemRelationRepository.find({
        where: {
          firstItemId: relatedItemId,
          secondItemId: data.id,
        }
      })

      const relations2 = await ItemRelationRepository.find({
        where: {
          firstItemId: data.id,
          secondItemId: relatedItemId,
        }
      })

      if (relations1.length === 0 && relations2.length === 0) {
        ItemRelationRepository.save({
          firstItemId: new ObjectID(data.id),
          secondItemId: new ObjectID(relatedItemId),
        })
      }
    })

    await Promise.all(promises)
    return item
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  deleteItem(@Arg('id') id: string) {
    ItemRepository.delete(id)
    return true
  }
}
