import { Field, ID, Int, ObjectType } from 'type-graphql'
import { BaseEntity, Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm'
import { Guide } from './Guide'
import { User } from './User'

@ObjectType()
@Entity()
export class Voucher extends BaseEntity {
  @Field(() => ID)
  @ObjectIdColumn()
  id: ObjectID

  @Field(() => String)
  @Column()
  code: string

  @Field(() => Int)
  @Column()
  price: number

  @Field(() => Int)
  @Column()
  maxUsageCount: number

  @Field(() => String)
  @Column()
  description: string

  @Field(() => String, { nullable: true })
  @Column()
  partnerId: string

  @Field(() => String)
  @Column()
  guideId: string

  @Field(() => Guide)
  guide: Guide

  @Field(() => [String])
  @Column()
  usedByIds: string[]

  @Field(() => [User])
  usedBy: User[]
}
