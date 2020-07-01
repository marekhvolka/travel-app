import { Field, ID, Int, ObjectType } from 'type-graphql'
import { Column, ObjectID, ObjectIdColumn } from 'typeorm'

@ObjectType()
export class UnlockedGuide {
  @Field(() => ID)
  @ObjectIdColumn()
  id?: ObjectID

  @Field(() => String)
  @Column()
  guideId: string

  @Field(() => String, { nullable: true })
  @Column()
  voucherId: string

  @Field(() => Int, { nullable: true })
  @Column()
  unlockedAt: number
}
