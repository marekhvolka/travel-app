import {City} from '../models/City'
import {Arg, Mutation, Query, Resolver} from "type-graphql";
import {CityInput} from "../inputs/CityInput";

@Resolver(() => City)
export class CityResolver {

  @Query(() => City)
  fetchCity(@Arg("id", {nullable: false})id: string) {
    return City.findOne(id)
  }

  @Query(() => [City])
  cities() {
    return City.find({})
  }

  @Mutation(() => City)
  updateCity(@Arg("data") data: CityInput) {
    return data.id ? City.update(data.id, data) : City.create(data)
  }
}
