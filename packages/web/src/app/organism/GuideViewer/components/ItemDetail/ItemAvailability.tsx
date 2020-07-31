import React from 'react'
import { Restrictions } from '@md/common'
import { RestrictionState } from '../../../../../models/RestrictionState'
import { ItemDayAvailability } from './ItemDayAvailability'

type Props = {
  restrictions: Restrictions
}

export const ItemAvailability = ({ restrictions }: Props) => {
  if (restrictions.state === RestrictionState.NOT_DEFINED || restrictions.state === RestrictionState.OPEN) {
    return <></>
  }

  if (restrictions.state === RestrictionState.CLOSED) {
    return (
      <>
        <div>Unfortunately this sight is closed</div>
      </>
    )
  }

  return (
    <div>
      <ItemDayAvailability dayId="mon" dayRestriction={restrictions.dayRestrictions.mon} />
      <ItemDayAvailability dayId="tue" dayRestriction={restrictions.dayRestrictions.tue} />
      <ItemDayAvailability dayId="wed" dayRestriction={restrictions.dayRestrictions.wed} />
      <ItemDayAvailability dayId="thu" dayRestriction={restrictions.dayRestrictions.thu} />
      <ItemDayAvailability dayId="fri" dayRestriction={restrictions.dayRestrictions.fri} />
      <ItemDayAvailability dayId="sat" dayRestriction={restrictions.dayRestrictions.sat} />
      <ItemDayAvailability dayId="sun" dayRestriction={restrictions.dayRestrictions.sun} />
    </div>
  )
}
