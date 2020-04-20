import {Arg, Mutation, Query, Resolver} from "type-graphql";
import {Tag} from "../models/Tag";
import {TagInput} from "../inputs/TagInput";

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
  updateTag(@Arg("data") data: TagInput) {
    return data.id ? Tag.update(data.id, data) : Tag.create(data)
  }
}
