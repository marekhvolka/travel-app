import { Field, Float, ID, InputType } from 'type-graphql'
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

  @Field(() => Float, { nullable: true })
  latitude: number

  @Field(() => Float, { nullable: true })
  longitude: number

  @Field(() => Float)
  zoomLevel: number

  @Field(() => RestrictionsInput)
  restrictions: RestrictionsInput

  @Field(() => [String])
  relatedItemIds: string[]
}
