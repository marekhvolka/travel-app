import { Tag } from '../../models/index'

export const resolver = {

  Query: {
    fetchTag(_, { id }) {
      return Tag.findById(id)
    },
    tags() {
      return Tag.find({})
    },
  },

  Mutation: {
    updateTag(_, { data }) {
      return data.id ? Tag.findByIdAndUpdate(data.id, data) : Tag.create(data)
    },
  },
}
