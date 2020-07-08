import { Field, ID, Int, ObjectType } from 'type-graphql'
import { Column, Entity, ObjectIdColumn } from 'typeorm'
import { Item } from './Item'
import { Location } from './Location'
import { Voucher } from './Voucher'

@Entity()
@ObjectType()
export class Guide {
  @Field(() => ID)
  @ObjectIdColumn()
  _id: string

  @Field(() => String)
  @Column()
  name: string

  @Field(() => String)
  @Column()
  url: string

  @Field(() => String)
  @Column()
  description: string

  @Field(() => Location)
  @Column()
  location: Location

  @Field(() => Boolean)
  @Column()
  published: boolean

  @Field(() => String)
  @Column()
  cityId: string

  @Field(() => String)
  @Column()
  previewImageUrl: string

  @Field(() => [String])
  @Column()
  itemIds: string[] = []

  @Field(() => Int)
  @Column()
  price: number

  @Field(() => String)
  @Column()
  currency: string


  @Field(() => [Item])
  items: Item[]

  @Field(() => [Voucher])
  vouchers: Voucher[]
}
