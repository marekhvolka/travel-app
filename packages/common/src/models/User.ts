import { Field, ID, ObjectType } from 'type-graphql'
import { Column, Entity, ObjectIdColumn } from 'typeorm'
import { GuidesData } from './GuidesData'
import { UnlockedGuide } from './UnlockedGuide'

@Entity()
@ObjectType()
export class User {
  @Field(() => ID)
  @ObjectIdColumn()
  _id: string

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
