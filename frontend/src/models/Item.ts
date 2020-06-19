import { Restrictions } from './Restrictions'
import { Tag } from './Tag'

export type Item = {
  id: string
  name: string
  title: string
  description: string
  type: string
  latitude: number
  longitude: number
  zoomLevel: number
  published: boolean
  showOnMap: boolean
  previewImageUrl: string
  restrictions: Restrictions
  relatedItemsIds: string[]
  relatedItems: Item[]
  tags: Tag[]
}
