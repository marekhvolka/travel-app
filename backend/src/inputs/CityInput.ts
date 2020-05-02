import { Field, InputType } from 'type-graphql'
import { City } from '../models/City'

@InputType()
export class CityInput implements Partial<City>{
  @Field()
  id: string

  @Field()
  name: string
}
