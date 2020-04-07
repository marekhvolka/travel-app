import {Field, ObjectType} from "type-graphql";
import {Directory} from "./Directory";

@ObjectType()
export class File {

  @Field(() => String)
  name: string

  @Field(() => String)
  path: string

  @Field(() => Directory)
  directory: Directory

  @Field(() => String)
  createdAt: string

  @Field(() => String)
  owner: string

  @Field(() => String)
  group: string

  // @Field(() => String)
  // permissions: PermissionSet

  @Field(() => String)
  content: string

  @Field(() => Number)
  size: number
}
