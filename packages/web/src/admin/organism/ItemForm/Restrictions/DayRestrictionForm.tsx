import { Field } from 'formik'
import React  from 'react'
import moment from 'moment'
import { DayRestriction } from '@md/common'
import { TimePicker } from '../../../../common/atoms/TimePicker/TimePicker'
import { Select } from '../../../../common/atoms/Select/Select'
import { RestrictionState } from '../../../../models/RestrictionState'

type Props = {
  dayRestriction: DayRestriction
  dayId: string
}

export const DayRestrictionForm = ({ dayRestriction, dayId }: Props) => {

  return (
    <div style={{ float: 'left', display: 'inline', width: 100 / 7 + '%' }}>
      <h3>{dayId}</h3>
      <Field
        name={`restrictions.dayRestrictions.${dayId}.state`}
        label="State"
        component={Select}
        options={[
          {
            id: RestrictionState.OPEN,
            name: 'Open',
          },
          {
            id: RestrictionState.CLOSED,
            name: 'Closed',
          },
          {
            id: RestrictionState.RESTRICTED,
            name: 'Restricted',
          },
        ]}
      />
      {dayRestriction.state === RestrictionState.RESTRICTED && (
        <>
          <Field
            name={`restrictions.dayRestrictions.${dayId}.from`}
            value={moment(dayRestriction.from ? dayRestriction.from : Date.now())}
            component={TimePicker}
          />
          <Field
            name={`restrictions.dayRestrictions.${dayId}.to`}
            value={moment(dayRestriction.to ? dayRestriction.to : Date.now())}
            component={TimePicker}
          />
        </>
      )}
    </div>
  )
}
