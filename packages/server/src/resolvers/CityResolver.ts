import { City } from '@md/common'
import { GraphQLJSONObject } from 'graphql-type-json'
import { Arg, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql'
import { CityInput } from '../inputs/CityInput'
import { isAuth } from '../middleware/isAuth'

@Resolver(() => City)
export class CityResolver {
  @Query(() => City)
  fetchCity(@Arg('id', { nullable: false }) id: string) {
    return City.findOne(id)
  }

  @Query(() => GraphQLJSONObject)
  @UseMiddleware(isAuth)
  returnNewCity() {
    return City.create()
  }

  @Query(() => [City])
  cities() {
    return City.find({})
  }

  @Mutation(() => City)
  @UseMiddleware(isAuth)
  async updateCity(@Arg('data') data: CityInput) {
    if (data.id) {
      await City.update(data.id, data)
      return City.findOne(data.id)
    } else {
      return City.create(data).save()
    }
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  deleteCity(@Arg('id') id: string) {
    City.delete(id)
    return true
  }
}
