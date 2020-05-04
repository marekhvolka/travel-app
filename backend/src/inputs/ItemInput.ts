import { Field, ID, InputType, Int } from 'type-graphql'
import { ObjectID } from 'typeorm'
import { RestrictionsInput } from './RestrictionsInput'

@InputType()
export class ItemInput {
  @Field(() => ID, { nullable: true })
  id: ObjectID

  @Field(() => String)
  name: string

  @Field(() => String)
  title: string

  @Field(() => String)
  description: string

  @Field(() => String)
  type: string

  @Field(() => Boolean)
  published: boolean

  @Field(() => String)
  previewImageUrl: string

  @Field(() => [String])
  tagIds: string[]

  @Field(() => Int, { nullable: true })
  latitude: number

  @Field(() => Int, { nullable: true })
  longitude: number

  @Field(() => Int)
  zoomLevel: number

  @Field(() => RestrictionsInput)
  restrictions: RestrictionsInput

  @Field(() => [String])
  relatedItemIds: string[]
}
