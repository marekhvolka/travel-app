import { Field, Float, ID, ObjectType } from 'type-graphql'
import { BaseEntity, Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm'
import { Restrictions } from './Restrictions'
import { Tag } from './Tag'

@Entity()
@ObjectType()
export class Item extends BaseEntity {
  @Field(() => ID)
  @ObjectIdColumn()
  id: ObjectID

  @Field(() => String)
  @Column()
  name: string

  @Field(() => String)
  @Column()
  title: string

  @Field(() => String)
  @Column()
  description: string

  @Field(() => String)
  @Column()
  type: string

  @Field(() => Boolean)
  @Column()
  published: boolean

  @Field(() => String)
  @Column()
  previewImageUrl: string

  @Field(() => [String])
  @Column()
  tagIds: string[]

  @Field(() => [Tag])
  tags: Tag[]

  @Field(() => Float, { nullable: true })
  @Column()
  latitude: number

  @Field(() => Float, { nullable: true })
  @Column()
  longitude: number

  @Field(() => Float, { nullable: true })
  @Column()
  zoomLevel: number

  @Field(() => Restrictions)
  @Column()
  restrictions: Restrictions
}
