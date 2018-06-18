import mongoose from 'mongoose'
import DataLoader from 'dataloader'
import { Guide } from '../../models/index'

export default class GuideLoader extends DataLoader {
  constructor() {
    super((guideIds) => {
      return Guide.find({
        _id: {
          $in: guideIds.map(
            id => new mongoose.Types.ObjectId(id)
          )
        }
      })
    })
  }
}
