import { Column } from 'typeorm'
import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class DayRestriction {
  @Field(() => String)
  @Column()
  state: string

  @Field({ nullable: true })
  @Column()
  from: string

  @Field({ nullable: true })
  @Column()
  to: string
}
