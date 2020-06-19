import { GuideData } from './GuideData'

export type User = {
  id: string
  email: string
  token: string
  guidesData: {
    [guideId: string]: GuideData
  }
}
