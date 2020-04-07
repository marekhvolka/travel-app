import {Column} from "typeorm";
import {Field, ObjectType} from "type-graphql";
import {DayRestriction} from "./DayRestriction";

@ObjectType()
export class DayRestrictions {

  @Field(() => DayRestriction)
  @Column()
  mon: DayRestriction

  @Field(() => DayRestriction)
  @Column()
  tue: DayRestriction

  @Field(() => DayRestriction)
  @Column()
  wed: DayRestriction

  @Field(() => DayRestriction)
  @Column()
  thu: DayRestriction

  @Field(() => DayRestriction)
  @Column()
  fri: DayRestriction

  @Field(() => DayRestriction)
  @Column()
  sat: DayRestriction

  @Field(() => DayRestriction)
  @Column()
  sun: DayRestriction
}
