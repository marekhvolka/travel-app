import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm'
import { Field, ID, ObjectType } from 'type-graphql'

@Entity()
@ObjectType()
export class City {
  @Field(() => ID)
  @ObjectIdColumn()
  id: ObjectID

  @Field(() => String)
  @Column()
  name: string
}
