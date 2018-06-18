import { Item, ItemRelation, Tag } from '../../models/index'
import mongoose from 'mongoose'

export const resolver = {
  Item: {
    tags(item) {
      return Tag.find({
        _id: {
          $in: item.tagIds.map(id => new mongoose.Types.ObjectId(id))
        }
      })
    },

    async relatedItemIds(item) {
      const relations1 = await ItemRelation.find({
        firstItemId: item.id
      })

      const relations2 = await ItemRelation.find({
        secondItemId: item.id
      })

      return [
        ...relations1.map(
          relation =>
            new mongoose.Types.ObjectId(relation.secondItemId)
        ),
        ...relations2.map(
          relation =>
            new mongoose.Types.ObjectId(relation.firstItemId)
        )
      ]
    },

    async relatedItems(item) {
      const relations1 = await ItemRelation.find({
        firstItemId: item.id
      })

      const relations2 = await ItemRelation.find({
        secondItemId: item.id
      })

      return Item.find({
        _id: {
          $in: [
            ...relations1.map(
              relation =>
                new mongoose.Types.ObjectId(
                  relation.secondItemId
                )
            ),
            ...relations2.map(
              relation =>
                new mongoose.Types.ObjectId(
                  relation.firstItemId
                )
            )
          ]
        }
      })
    }
  },
  Query: {
    // Get a item by it ID
    fetchItem(_, { id }) {
      return Item.findById(id)
    },
    items() {
      return Item.find({})
        .populate('tag')
    },
  },

  Mutation: {
    // Update a particular item
    async updateItem(_, { data }) {
      const item = data.id ? Item.findByIdAndUpdate(data.id, data) : Item.create(data)
      const promises = data.relatedItemIds.map(relatedItemId => {
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
    },
  }
}
