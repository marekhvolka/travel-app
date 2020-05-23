import { BaseEntity, Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm'
import { ObjectType, Field, ID } from 'type-graphql'
import { GuideData } from './GuideData'
import { UnlockedGuide } from './UnlockedGuide'

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

  @Field(() => [UnlockedGuide])
  @Column()
  unlockedGuides: UnlockedGuide[]

  @Column(() => GuideData)
  guidesData: GuideData

  @Column()
  token: string
}
