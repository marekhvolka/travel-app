import { Field, ObjectType } from 'type-graphql'
import { File } from './File'

@ObjectType()
export class Directory {
  @Field(() => String)
  name: string

  @Field(() => String)
  path: string

  @Field(() => [Directory])
  subdirectories: Directory[]

  @Field(() => [File])
  files: File[]
}
