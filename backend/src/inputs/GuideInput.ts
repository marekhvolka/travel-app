import { Field, Float, ID, InputType, Int } from 'type-graphql'
import { ObjectID } from 'typeorm'

@InputType()
export class GuideInput {
  @Field(() => ID, { nullable: true })
  id: ObjectID

  @Field(() => String)
  name: string

  @Field(() => String)
  url: string

  @Field(() => String)
  description: string

  @Field(() => Float)
  latitude: number

  @Field(() => Float)
  longitude: number

  @Field(() => Float)
  zoomLevel: number

  @Field(() => Boolean)
  published: boolean

  @Field(() => String)
  cityId: string

  @Field(() => String)
  previewImageUrl: string

  @Field(() => [String])
  itemIds: string[]

  @Field(() => Int)
  price: number

  @Field(() => String)
  currency: string
}
