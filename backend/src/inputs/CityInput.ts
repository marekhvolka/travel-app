import { Field, InputType } from 'type-graphql'

@InputType()
export class CityInput {
  @Field()
  id: string

  @Field()
  name: string
}
