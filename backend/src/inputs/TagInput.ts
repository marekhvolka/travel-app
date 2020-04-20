import { BaseEntity, ObjectID } from 'typeorm'
import { Field, ID, InputType } from 'type-graphql'

@InputType()
export class TagInput extends BaseEntity {
  @Field(() => ID)
  id: ObjectID

  @Field(() => String)
  name: string

  @Field({ nullable: true })
  description: string

  @Field({ nullable: true })
  color: string

  @Field({ nullable: true })
  icon: string

  @Field(() => Boolean)
  published: boolean
}
