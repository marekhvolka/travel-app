import { Item } from './Item'

export type Guide = {
  id: string
  name: string
  title: string
  description: string
  zoomLevel: number
  latitude: number
  longitude: number

  items: Item[]
}
