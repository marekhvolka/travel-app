import { Field, ID, ObjectType } from 'type-graphql'
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm'

@ObjectType()
@Entity({
  name: 'itemRelation'
})
export class ItemRelation {
  @Field(() => ID)
  @ObjectIdColumn()
  id: ObjectID

  @Field(() => String)
  @Column()
  firstItemId: string

  @Field(() => String)
  @Column()
  secondItemId: string
}
