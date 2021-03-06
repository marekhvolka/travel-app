import { Column } from 'typeorm'
import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class DayRestriction {
  @Field(() => String)
  @Column()
  state: string

  @Field(() => String, { nullable: true })
  @Column()
  from?: string

  @Field(() => String, { nullable: true })
  @Column()
  to?: string
}
