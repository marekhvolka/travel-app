import {Arg, FieldResolver, Mutation, Query, Resolver, Root} from "type-graphql";
import {Guide} from "../models/Guide";
import {Item} from "../models/Item";
import {ObjectID} from 'mongodb';
import {GuideInput} from "../inputs/GuideInput";

@Resolver(() => Guide)
export class GuideResolver {
  @FieldResolver(() => [Item])
  items(@Root() guide: Guide) {
    return Item.find({
      where: {
        _id: {$in: guide.itemIds.map((id) => new ObjectID(id))}
      }
    })
  }

  @Query(() => Guide)
  fetchGuide(
    @Arg("id", {nullable: true}) id: string,
    @Arg("url", {nullable: true}) url: string
  ) {
    return id ? Guide.findOne(id) : Guide.findOne({url})
  }

  @Query(() => [Guide])
  guides() {
    return Guide.find()
  }

  @Mutation(() => Guide)
  updateGuide(@Arg("data") data: GuideInput) {
    return data.id ? Guide.update(data.id, data) : Guide.create(data)
  }
}
