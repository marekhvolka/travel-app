import { Column, Entity, ObjectIdColumn } from 'typeorm'
import { Field, ID, ObjectType } from 'type-graphql'

@Entity()
@ObjectType()
export class City {
  @Field(() => ID)
  @ObjectIdColumn()
  _id: string

  @Field(() => String)
  @Column()
  name: string
}
