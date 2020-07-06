import { Field, Float, InputType } from 'type-graphql'

@InputType()
export class LocationInput {
  @Field(() => Float, { nullable: true })
  latitude: number

  @Field(() => Float, { nullable: true })
  longitude: number

  @Field(() => Float, { nullable: true })
  zoomLevel: number
}
