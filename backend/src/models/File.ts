import { Field, ObjectType } from 'type-graphql'
import { Directory } from './Directory'
import { FileStats } from './FileStats'

@ObjectType()
export class File {
  @Field(() => String)
  name: string

  @Field(() => String)
  path: string

  @Field(() => Directory)
  directory: Directory

  @Field(() => String)
  content: string

  @Field(() => FileStats)
  stats: FileStats
}
