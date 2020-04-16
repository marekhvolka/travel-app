import {BaseEntity} from "typeorm";
import {Field, ObjectType} from "type-graphql";

@ObjectType()
export class FileStats extends BaseEntity {

  @Field(() => Number)
  size: Number
}
