import {RestrictionState} from "./RestrictionState";

export type DayRestriction = {
  state: RestrictionState
  from: string
  to: string
}

export const DayLabels = {
  mon: 'Monday',
  tue: 'Tuesday',
  wed: 'Wednesday',
  thu: 'Thursday',
  fri: 'Friday',
  sat: 'Saturday',
  sun: 'Sunday',
}
