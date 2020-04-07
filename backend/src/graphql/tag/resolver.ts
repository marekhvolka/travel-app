import { Tag } from '../../models/Tag'

export const resolver = {

  Query: {
    fetchTag(_, { id }) {
      return Tag.findOne(id)
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
