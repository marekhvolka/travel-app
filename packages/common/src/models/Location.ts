import { Column } from 'typeorm'
import { Field, Float, ObjectType } from 'type-graphql'

@ObjectType()
export class Location {
  @Field(() => Float, { nullable: true })
  @Column()
  latitude: number

  @Field(() => Float, { nullable: true })
  @Column()
  longitude: number

  @Field(() => Float, { nullable: true })
  @Column()
  zoomLevel: number
}
