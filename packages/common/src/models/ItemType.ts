import { registerEnumType } from 'type-graphql'

export enum ItemType {
  PLACE = 'PLACE',
  PERSON = 'PERSON',
  EVENT = 'EVENT',
}

registerEnumType(ItemType, {
  name: 'ItemType'
});
