export type GuideData = {
  mapZoomLevel: number
  mapLatitude: number
  mapLongitude: number
  selectedItemId: string
  showFullDetail: boolean
  showSearch: boolean
  favouriteItemsIds: {
    [itemId: string]: {}
  }
}
