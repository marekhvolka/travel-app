import { City } from '../../models/index'

export const resolver = {
  Query: {
    // Get a city by it ID
    fetchCity(_, { id }) {
      return City.findById(id)
    },
    cities() {
      return City.find({})
    },
  },

  Mutation: {
    updateCity(_, { data }) {
      return data.id ? City.findByIdAndUpdate(data.id, data) : City.create(data)
    },
  }
}
