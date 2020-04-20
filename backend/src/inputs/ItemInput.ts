import { Field, ID, InputType } from 'type-graphql'
import { ObjectID } from 'typeorm'
import { RestrictionsInput } from './RestrictionsInput'

@InputType()
export class ItemInput {
  @Field(() => ID)
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

  @Field({ nullable: true })
  latitude: number

  @Field({ nullable: true })
  longitude: number

  @Field(() => Number)
  zoomLevel: number

  @Field(() => RestrictionsInput)
  restrictions: RestrictionsInput

  @Field(() => [String])
  relatedItemIds: string[]
}
