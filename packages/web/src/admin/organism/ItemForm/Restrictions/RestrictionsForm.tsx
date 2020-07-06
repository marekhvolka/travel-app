import { Field } from 'formik'
import React from 'react'
import { Item } from '@md/common'
import { Select } from '../../../../common/atoms/Select/Select'
import { DayRestrictionForm } from './DayRestrictionForm'
import { RestrictionState } from '../../../../models/RestrictionState'

type Props = {
  model: Item
}

export const RestrictionsForm = ({ model }: Props) => (
  <div>
    <Field
      name="restrictions.state"
      label="Restriction state"
      component={Select}
      options={[
        {
          id: RestrictionState.NOT_DEFINED,
          name: 'Not defined',
        },
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
    <h2>Days restrictions</h2>
    <div>
      {Object.keys(model.restrictions.dayRestrictions)
        .filter((key: string) => key !== '__typename')
        .map(dayRestrictionId => (
          <DayRestrictionForm
            key={dayRestrictionId}
            dayRestriction={model.restrictions.dayRestrictions[dayRestrictionId]}
            dayId={dayRestrictionId}
          />
        ))}
    </div>
  </div>
)
