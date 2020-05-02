import { Field, ID, InputType } from 'type-graphql'
import { ObjectID } from 'typeorm'

@InputType()
export class UserInput {
  @Field(() => ID)
  id: ObjectID

  @Field(() => String)
  email: string

  @Field(() => String)
  password: string

  @Field(() => String)
  role: string

  @Field()
  token: string
}
