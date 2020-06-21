import { Item } from './Item'

export type Guide = {
  id: string
  name: string
  url: string
  title: string
  description: string
  zoomLevel: number
  latitude: number
  longitude: number
  published: boolean
  previewImageUrl: string
  currency: string
  price: number
  cityId: string
  items: Item[]
}
