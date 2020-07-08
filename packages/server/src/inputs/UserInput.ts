import { Field, ID, InputType } from 'type-graphql'

@InputType()
export class UserInput {
  @Field(() => ID, { nullable: true })
  _id: string

  @Field(() => String)
  email: string

  @Field(() => String)
  password: string

  @Field(() => String)
  role: string

  @Field(() => String)
  token: string
}
