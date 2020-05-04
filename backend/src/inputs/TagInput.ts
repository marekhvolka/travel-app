import { ObjectID } from 'typeorm'
import { Field, ID, InputType } from 'type-graphql'

@InputType()
export class TagInput {
  @Field(() => ID, { nullable: true })
  id: ObjectID

  @Field(() => String)
  name: string

  @Field(() => String, { nullable: true })
  description: string

  @Field(() => String, { nullable: true })
  color: string

  @Field(() => String, { nullable: true })
  icon: string

  @Field(() => Boolean, { nullable: true, defaultValue: false})
  published: boolean
}
