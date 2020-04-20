import React from 'react'
import { RestrictionState } from '../../../models/RestrictionState'
import { DayLabels, DayRestriction } from '../../../models/DayRestriction'

type Props = {
  dayId: string
  dayRestriction: DayRestriction
}

export const ItemDayAvailability = ({ dayId, dayRestriction }: Props) => {
  if (dayRestriction.state === RestrictionState.OPEN) {
    return <div>{DayLabels[dayId]}: Open</div>
  }

  if (dayRestriction.state === RestrictionState.CLOSED) {
    return <div>{DayLabels[dayId]}: Closed</div>
  }

  return (
    <div>
      {DayLabels[dayId]}: {dayRestriction.from} - {dayRestriction.to}
    </div>
  )
}
