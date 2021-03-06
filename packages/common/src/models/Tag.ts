import { Field, ID, ObjectType } from 'type-graphql'
import { Column, Entity, ObjectIdColumn } from 'typeorm'
import { Item } from './Item'

@ObjectType()
@Entity()
export class Tag {
  @Field(() => ID)
  @ObjectIdColumn()
  _id: string

  @Field(() => String)
  @Column()
  name: string

  @Field(() => String, { nullable: true })
  @Column()
  description: string

  @Field(() => String, { nullable: true })
  @Column()
  color: string

  @Field(() => String, { nullable: true })
  @Column()
  icon: string

  @Field(() => Boolean)
  @Column()
  published: boolean


  @Field(() => [Item])
  items: Item[]
}
