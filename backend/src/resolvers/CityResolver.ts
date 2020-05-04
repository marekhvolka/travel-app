import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { CityInput } from '../inputs/CityInput'
import { City } from '../models/City'
import { Context } from '../models/Context'
import { AuthorizationError } from '../utils/errors'

@Resolver(() => City)
export class CityResolver {
  @Query(() => City)
  fetchCity(@Arg('id', { nullable: false }) id: string) {
    return City.findOne(id)
  }

  @Query(() => [City])
  cities() {
    return City.find({})
  }

  @Mutation(() => City)
  async updateCity(@Arg('data') data: CityInput, @Ctx() context: Context) {
    if (!context.user) {
      throw new AuthorizationError('User not authorized')
    }

    if (data.id) {
      await City.update(data.id, data)
      return City.findOne(data.id)
    } else {
      return City.create(data).save()
    }
  }

  @Mutation(() => Boolean)
  deleteCity(@Arg('id') id: string, @Ctx() context: Context) {
    if (!context.user) {
      throw new AuthorizationError('User not authorized')
    }

    City.delete(id)
    return true
  }
}
