import { Column, ObjectID, ObjectIdColumn } from 'typeorm'
import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
export class GuideData {
  @Field(() => ID)
  @ObjectIdColumn()
  id: ObjectID

  @Field(() => String)
  @Column()
  guideId: string

  @Field(() => Number)
  @Column()
  mapZoomLevel: number

  @Field(() => Number)
  @Column()
  mapLatitude: number

  @Field(() => Number)
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
