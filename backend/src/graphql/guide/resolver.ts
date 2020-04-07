import mongoose from 'mongoose'
import { Guide } from '../../models/Guide'
import { Item } from '../../models/Item'
import { User } from '../../models/User'

export const resolver = {
  Guide: {
    items(guide) {
      return Item.find({
        _id: {
          $in: guide.itemIds.map(
            id => new mongoose.Types.ObjectId(id)
          )
        }
      })
    },
  },

  GuideData: {
    guide(guideData) {
      // return Guide.findOne(guideData.guideId)
      return context.dataloaders.guides.load(guideData.guideId)
    },
    favouriteItems(guideState) {
      return Item.find({
        _id: {
          $in: guideState.favouriteItemIds.map(
            id => new mongoose.Types.ObjectId(id)
          )
        }
      })
    }
  },

  Query: {
    // Get a guide by it ID
    fetchGuide(_, { id, url }) {
      return id ? Guide.findOne(id) : Guide.findOne({ url })
    },
    guides() {
      return Guide.find()
    },
  },

  Mutation: {
    updateGuide(_, { data }) {
      return data.id ? Guide.findByIdAndUpdate(data.id, data) : Guide.create(data)
    },
  }
}
