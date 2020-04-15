import {BaseEntity, Column, Entity, ObjectID, ObjectIdColumn} from "typeorm";
import {Field, ID, ObjectType} from "type-graphql";
import {Item} from "./Item";

@ObjectType()
@Entity()
export class Tag extends BaseEntity {

  @Field(() => ID)
  @ObjectIdColumn()
  id: ObjectID;

  @Field(() => String)
  @Column()
  name: string

  @Field({nullable: true})
  @Column()
  description: string

  @Field({nullable: true})
  @Column()
  color: string

  @Field({nullable: true})
  @Column()
  icon: string

  @Field(() => Boolean)
  @Column()
  published: boolean

  @Field(() => [Item])
  items: Item[]
}
