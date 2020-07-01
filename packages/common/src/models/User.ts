import { BaseEntity, Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm'
import { ObjectType, Field, ID } from 'type-graphql'
import { GuidesData } from './GuidesData'
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

  @Column(() => GuidesData)
  guidesData: GuidesData

  @Column()
  token: string
}
