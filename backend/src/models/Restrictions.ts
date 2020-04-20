import { Column } from 'typeorm'
import { Field, ObjectType } from 'type-graphql'
import { DayRestrictions } from './DayRestrictions'

@ObjectType()
export class Restrictions {
  @Field(() => String)
  @Column()
  state: string

  @Field(() => DayRestrictions)
  @Column()
  dayRestrictions: DayRestrictions
}
