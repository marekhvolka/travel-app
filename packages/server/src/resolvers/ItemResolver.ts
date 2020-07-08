import { defaultRestrictions, Item, ItemRelation, Restrictions, Tag } from '@md/common'
import { GraphQLJSONObject } from 'graphql-type-json'
import { Arg, FieldResolver, Mutation, Query, Resolver, Root, UseMiddleware } from 'type-graphql'
import { getRepository } from 'typeorm'
import { ItemInput } from '../inputs/ItemInput'
import { isAuth } from '../middleware/isAuth'
import { generateId } from '../utils/random'

const ItemRepository = getRepository(Item)
const ItemRelationRepository = getRepository(ItemRelation)
const TagRepository = getRepository(Tag)

@Resolver(() => Item)
export class ItemResolver {
  @FieldResolver(() => [Tag])
  tags(@Root() item: Item) {
    return TagRepository.find({
      where: {
        _id: { $in: item.tagIds },
      },
    })
  }

  @FieldResolver(() => [String])
  async relatedItemsIds(@Root() item: Item) {
    const relations1 = await ItemRelationRepository.find({
      where: {
        firstItemId: item._id
      },
    })

    const relations2 = await ItemRelationRepository.find({
      where: {
        secondItemId: item._id
      },
    })

    return [
      ...relations1.map(relation => relation.secondItemId),
      ...relations2.map(relation => relation.firstItemId),
    ]
  }

  @FieldResolver(() => [Item])
  async relatedItems(@Root() item: Item, @Arg('published', { nullable: true }) published: boolean) {
    const relations1 = await ItemRelationRepository.find({
      where: {
        firstItemId: item._id
      },
    })

    const relations2 = await ItemRelationRepository.find({
      where: {
        secondItemId: item._id
      },
    })

    return ItemRepository.find({
      where: {
        _id: {
          $in: [
            ...relations1!.map(relation => relation.secondItemId),
            ...relations2!.map(relation => relation.firstItemId),
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
  fetchItem(@Arg('id') _id: string) {
    return ItemRepository.findOne({ _id })
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

    if (data._id) {
      await ItemRepository.update(data._id, data)
      item = await ItemRepository.findOne(data._id)
    } else {
      item = await ItemRepository.save({
        ...data,
        _id: generateId()
      })
    }
    const promises = data.relatedItemsIds.map(async (relatedItemId: string) => {
      const relations1 = await ItemRelationRepository.find({
        where: {
          firstItemId: relatedItemId,
          secondItemId: data._id,
        }
      })

      const relations2 = await ItemRelationRepository.find({
        where: {
          firstItemId: data._id,
          secondItemId: relatedItemId,
        }
      })

      if (relations1.length === 0 && relations2.length === 0) {
        ItemRelationRepository.save({
          firstItemId: data._id,
          secondItemId: relatedItemId,
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
