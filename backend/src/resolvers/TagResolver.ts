import {Arg, Mutation, Query, Resolver} from "type-graphql";
import {Tag} from "../models/Tag";

@Resolver(() => Tag)
export class TagResolver {
  @Query(() => Tag)
  fetchTag(@Arg("id", {nullable: false}) id: string) {
    return Tag.findOne(id)
  }

  @Query(() => [Tag])
  tags() {
    return Tag.find({})
  }

  @Mutation(() => Tag)
  updateTag(_, { data }) {
    return data.id ? Tag.update(data.id, data) : Tag.create(data)
  }
}
