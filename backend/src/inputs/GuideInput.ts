import { Field, ID, InputType } from 'type-graphql'

@InputType()
export class GuideInput {
  @Field(() => ID)
  id: string

  @Field(() => String)
  name: string

  @Field(() => String)
  url: string

  @Field(() => String)
  description: string

  @Field(() => Number)
  latitude: number

  @Field(() => Number)
  longitude: number

  @Field(() => Number)
  zoomLevel: number

  @Field(() => Boolean)
  published: boolean

  @Field(() => String)
  cityId: string

  @Field(() => String)
  previewImageUrl: string

  @Field(() => [String])
  itemIds: string[]

  @Field(() => Number)
  price: number

  @Field(() => String)
  currency: string
}
