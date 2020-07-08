import { Field, ID, ObjectType } from 'type-graphql'
import { Column, Entity, ObjectIdColumn } from 'typeorm'

@ObjectType()
@Entity({
  name: 'itemRelation'
})
export class ItemRelation {
  @Field(() => ID)
  @ObjectIdColumn()
  _id: string

  @Field(() => String)
  @Column()
  firstItemId: string

  @Field(() => String)
  @Column()
  secondItemId: string
}
