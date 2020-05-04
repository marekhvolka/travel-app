import { BaseEntity } from 'typeorm'
import { Field, Int, ObjectType } from 'type-graphql'

@ObjectType()
export class FileStats extends BaseEntity {
  @Field(() => Int)
  size: Number
}
