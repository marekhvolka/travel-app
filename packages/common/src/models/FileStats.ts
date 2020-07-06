import { Field, Int, ObjectType } from 'type-graphql'

@ObjectType()
export class FileStats {
  @Field(() => Int)
  size: Number
}
