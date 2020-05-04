import { BaseEntity, Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm'
import { Field, Float, ID, Int, ObjectType } from 'type-graphql'
import { Item } from './Item'

@Entity()
@ObjectType()
export class Guide extends BaseEntity {
  @Field(() => ID)
  @ObjectIdColumn()
  id: ObjectID

  @Field(() => String)
  @Column()
  name: string

  @Field(() => String)
  @Column()
  url: string

  @Field(() => String)
  @Column()
  description: string

  @Field(() => Float)
  @Column()
  latitude: number

  @Field(() => Float)
  @Column()
  longitude: number

  @Field(() => Float)
  @Column()
  zoomLevel: number

  @Field(() => Boolean)
  @Column()
  published: boolean

  @Field(() => String)
  @Column()
  cityId: string

  @Field(() => String)
  @Column()
  previewImageUrl: string

  @Field(() => [String])
  @Column()
  itemIds: string[]

  @Field(() => [Item])
  items: Item[]

  @Field(() => Int)
  @Column()
  price: number

  @Field(() => String)
  @Column()
  currency: string
}
