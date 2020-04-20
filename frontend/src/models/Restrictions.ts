import { RestrictionState } from './RestrictionState'
import { DayRestriction } from './DayRestriction'

export type Restrictions = {
  state: RestrictionState
  dayRestrictions: {
    mon: DayRestriction
    tue: DayRestriction
    wed: DayRestriction
    thu: DayRestriction
    fri: DayRestriction
    sat: DayRestriction
    sun: DayRestriction
  }
}
