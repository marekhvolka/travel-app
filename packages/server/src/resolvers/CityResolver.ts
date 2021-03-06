import { City } from '@md/common'
import { GraphQLJSONObject } from 'graphql-type-json'
import { Arg, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql'
import { getRepository } from 'typeorm'
import { CityInput } from '../inputs/CityInput'
import { isAuth } from '../middleware/isAuth'
import { generateId } from '../utils/random'

const CityRepository = getRepository(City)

@Resolver(() => City)
export class CityResolver {
  @Query(() => City)
  fetchCity(@Arg('id', { nullable: false }) _id: string) {
    return CityRepository.findOne({ _id })
  }

  @Query(() => GraphQLJSONObject)
  @UseMiddleware(isAuth)
  returnNewCity() {
    return CityRepository.create()
  }

  @Query(() => [City])
  cities() {
    return CityRepository.find({})
  }

  @Mutation(() => City)
  @UseMiddleware(isAuth)
  async updateCity(@Arg('data') data: CityInput) {
    if (data._id) {
      await CityRepository.update(data._id, data)
      return CityRepository.findOne(data._id)
    } else {
      return CityRepository.save({
        ...data,
        _id: generateId()
      })
    }
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  deleteCity(@Arg('id') id: string) {
    CityRepository.delete(id)
    return true
  }
}
