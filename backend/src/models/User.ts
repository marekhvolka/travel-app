import { BaseEntity, Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm'
import { ObjectType, Field, ID } from 'type-graphql'
import { GuideData } from './GuideData'

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @Field(() => ID)
  @ObjectIdColumn()
  id: ObjectID

  @Field(() => String)
  @Column()
  email: string

  @Column()
  passwordHash: string

  @Field(() => String)
  @Column()
  role: string

  @Column(() => GuideData)
  guidesData: GuideData

  @Column()
  token: string
}
