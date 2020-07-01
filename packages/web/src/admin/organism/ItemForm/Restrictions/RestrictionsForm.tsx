import React from 'react'
import { Select } from '../../../../common/atoms/Select/Select'
import { Restrictions } from '../../../../models/Restrictions'
import { DayRestrictionForm } from './DayRestrictionForm'
import { RestrictionState } from '../../../../models/RestrictionState'

type Props = {
  model: Restrictions
  modelChanged: any
}

export const RestrictionsForm = ({ model, modelChanged }: Props) => (
  <div>
    <Select
      name="state"
      label="Restriction state"
      value={model.state}
      onChange={modelChanged}
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
      {Object.keys(model.dayRestrictions)
        .filter((key: string) => key !== '__typename')
        .map(dayRestrictionId => (
          <DayRestrictionForm
            key={dayRestrictionId}
            dayId={dayRestrictionId}
            model={model.dayRestrictions[dayRestrictionId]}
            modelChanged={dayRestriction => {
              modelChanged({
                dayRestrictions: {
                  ...model.dayRestrictions,
                  [dayRestrictionId]: dayRestriction,
                },
              })
            }}
          />
        ))}
    </div>
  </div>
)
