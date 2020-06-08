import { Field, ID, ObjectType } from 'type-graphql'
import { Column, ObjectID } from 'typeorm'

@ObjectType()
export class SearchResult {
  @Field(() => ID)
  id: ObjectID

  @Field(() => String)
  @Column()
  name: string

  @Field(() => String)
  type: string
}
