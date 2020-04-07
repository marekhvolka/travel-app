import {Restrictions} from "./Restrictions";

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
  previewImageUrl: string
  restrictions: Restrictions
  relatedItems: Item[]
}
