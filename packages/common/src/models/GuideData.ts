import { Column, ObjectIdColumn } from 'typeorm'

export class GuideData {
  @ObjectIdColumn()
  _id: string

  @Column()
  guideId: string

  @Column()
  mapZoomLevel: number

  @Column()
  mapLatitude: number

  @Column()
  mapLongitude: number

  @Column()
  selectedItemId: string

  @Column()
  showSearch: boolean

  @Column()
  viewType: string

  @Column()
  itemId: string

  @Column()
  favouriteItemsIds: {
    [itemId: string]: {}
  }
}
