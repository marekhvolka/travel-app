import { City } from '../../models/City'

export const resolver = {
  Query: {
    // Get a city by it ID
    fetchCity(_, { id }) {
      return City.findOne(id)
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
