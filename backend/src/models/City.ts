import {BaseEntity, Column, Entity, ObjectID, ObjectIdColumn} from "typeorm";
import {Item} from "./Item";
import {Field, ID, ObjectType} from "type-graphql";

@Entity()
@ObjectType()
export class City extends BaseEntity {

  @Field(() => ID)
  @ObjectIdColumn()
  id: ObjectID

  @Field(() => String)
  @Column()
  name: string

  @Field(() => [String])
  @Column()
  itemIds: string[]

  @Field(() => [Item])
  items: Item[]
}
