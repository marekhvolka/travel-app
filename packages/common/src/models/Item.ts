import { Field, ID, ObjectType } from 'type-graphql'
import { Column, Entity, ObjectIdColumn } from 'typeorm'
import { ItemType } from './ItemType'
import { Location } from './Location'
import { Restrictions } from './Restrictions'
import { Tag } from './Tag'

@Entity()
@ObjectType()
export class Item {
  @Field(() => ID)
  @ObjectIdColumn()
  _id: string

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

  @Field(() => Location)
  @Column()
  location: Location

  @Field(() => Restrictions)
  @Column()
  restrictions: Restrictions = defaultRestrictions


  @Field(() => [Tag])
  tags: Tag[]

  @Field(() => [String])
  relatedItemsIds: string[]

  @Field(() => [Item])
  relatedItems: Item[]
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
