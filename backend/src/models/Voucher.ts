import {BaseEntity, Column, Entity, ObjectID, ObjectIdColumn} from "typeorm";
import {Field, ID, ObjectType} from "type-graphql";

@ObjectType()
@Entity()
export class Voucher extends BaseEntity {

  @Field(() => ID)
  @ObjectIdColumn()
  id: ObjectID;

  @Field(() => String)
  @Column()
  code: string

  @Field(() => Number)
  @Column()
  price: number

  @Field(() => String)
  @Column()
  description: string

  @Field(() => String)
  @Column()
  partnerId: string
}
