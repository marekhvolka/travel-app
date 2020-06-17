import { Field, Float, ID, ObjectType } from 'type-graphql'
import { BaseEntity, Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm'
import { ItemType } from './ItemType'
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

  @Field(() => ItemType)
  @Column()
  type: ItemType

  @Field(() => Boolean)
  @Column()
  published: boolean

  @Field(() => Boolean)
  @Column()
  showOnMap: boolean

  @Field(() => String)
  @Column()
  previewImageUrl: string

  @Field(() => [String])
  @Column()
  tagIds: string[] = []

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
  restrictions: Restrictions = defaultRestrictions


  @Field(() => [Tag])
  tags: Tag[]
}

export const defaultRestrictions = {
  state: 'notDefined',
  dayRestrictions: {
    mon: {
      state: 'open',
    },
    tue: {
      state: 'open',
    },
    wed: {
      state: 'open',
    },
    thu: {
      state: 'open',
    },
    fri: {
      state: 'open',
    },
    sat: {
      state: 'open',
    },
    sun: {
      state: 'open',
    },
  },
}
