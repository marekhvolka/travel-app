import { Column, ObjectID, ObjectIdColumn } from 'typeorm'
import { Field, ID, Int, ObjectType } from 'type-graphql'

@ObjectType()
export class GuideData {
  @Field(() => ID)
  @ObjectIdColumn()
  id: ObjectID

  @Field(() => String)
  @Column()
  guideId: string

  @Field(() => Int)
  @Column()
  mapZoomLevel: number

  @Field(() => Int)
  @Column()
  mapLatitude: number

  @Field(() => Int)
  @Column()
  mapLongitude: number

  @Field(() => String)
  @Column()
  viewType: string

  @Field(() => String)
  @Column()
  itemId: string

  @Field(() => [String])
  @Column()
  favouriteItemIds: string[]
}
