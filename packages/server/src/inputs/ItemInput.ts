import { Field, ID, InputType } from 'type-graphql'
import { ObjectID } from 'typeorm'
import { ItemType } from '@md/common'
import { LocationInput } from './LocationInput'
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

  @Field(() => ItemType)
  type: ItemType

  @Field(() => Boolean)
  published: boolean

  @Field(() => Boolean)
  showOnMap: boolean

  @Field(() => String)
  previewImageUrl: string

  @Field(() => [String])
  tagIds: string[]

  @Field(() => LocationInput, { nullable: true })
  location: LocationInput

  @Field(() => RestrictionsInput)
  restrictions: RestrictionsInput

  @Field(() => [String])
  relatedItemsIds: string[]
}
