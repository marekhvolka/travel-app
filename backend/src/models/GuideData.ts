import { Column, ObjectID, ObjectIdColumn } from 'typeorm'

export class GuideData {
  @ObjectIdColumn()
  id: ObjectID

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
  showFullDetail: boolean

  @Column()
  viewType: string

  @Column()
  itemId: string

  @Column()
  favouriteItemsIds: {
    [itemId: string]: {}
  }
}
