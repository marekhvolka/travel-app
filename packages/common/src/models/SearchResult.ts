import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
export class SearchResult {
  @Field(() => ID)
  _id: string

  @Field(() => String)
  name: string

  @Field(() => String)
  type: string
}
