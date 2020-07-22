import { City } from './models/City'
import { DayRestriction } from './models/DayRestriction'
import { DayRestrictions } from './models/DayRestrictions'
import { Directory } from './models/Directory'
import { File } from './models/File'
import { FileStats } from './models/FileStats'
import { Guide } from './models/Guide'
import { GuideData } from './models/GuideData'
import { GuidesData } from './models/GuidesData'
import { Item } from './models/Item'
import { ItemRelation } from './models/ItemRelation'
import { Location } from './models/Location'
import { Restrictions } from './models/Restrictions'
import { SearchResult } from './models/SearchResult'
import { Tag } from './models/Tag'
import { UnlockedGuide } from './models/UnlockedGuide'
import { User } from './models/User'
import { Voucher } from './models/Voucher'

export const entities = [
  City,
  DayRestriction,
  DayRestrictions,
  Directory,
  File,
  FileStats,
  Guide,
  GuideData,
  GuidesData,
  Location,
  Item,
  ItemRelation,
  Restrictions,
  SearchResult,
  Tag,
  UnlockedGuide,
  Voucher,
  User,
]

// const entities: any[] = []
//
// Object.values(a).forEach((entity) => {
//   entities.push(entity)
// })
//
// export default entities

export * from './models/City'
export * from './models/DayRestriction'
export * from './models/DayRestrictions'
export * from './models/Directory'
export * from './models/File'
export * from './models/FileStats'
export * from './models/Guide'
export * from './models/GuideData'
export * from './models/GuidesData'
export * from './models/Item'
export * from './models/ItemRelation'
export * from './models/ItemType'
export * from './models/Location'
export * from './models/Restrictions'
export * from './models/SearchResult'
export * from './models/Tag'
export * from './models/UnlockedGuide'
export * from './models/User'
export * from './models/Voucher'
