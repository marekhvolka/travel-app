import { Field, ID, Int, ObjectType } from 'type-graphql'
import { Column, Entity, ObjectIdColumn } from 'typeorm'
import { Guide } from './Guide'
import { User } from './User'

@ObjectType()
@Entity()
export class Voucher {
  @Field(() => ID)
  @ObjectIdColumn()
  _id: string

  @Field(() => String)
  @Column()
  code: string

  @Field(() => Int)
  @Column()
  price: number

  @Field(() => Int)
  @Column()
  maxUsageCount: number = 1

  @Field(() => String)
  @Column()
  description: string

  @Field(() => String, { nullable: true })
  @Column()
  partnerId: string

  @Field(() => String)
  @Column()
  guideId: string

  @Field(() => [String])
  @Column()
  usedByIds: string[] = []


  @Field(() => Guide)
  guide: Guide

  @Field(() => [User])
  usedBy: User[]
}
