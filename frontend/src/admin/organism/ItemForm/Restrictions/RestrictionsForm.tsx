import React from 'react'
import { makeForm } from '../../../../common/organism/Form/makeForm'
import { Select } from '../../../../common/atoms/Select/Select'
import { DayRestrictionForm } from './DayRestrictionForm'
import { RestrictionState } from '../../../../models/RestrictionState'

export const RestrictionsForm = makeForm(({ model, onChange }) => (
  <div>
    <Select
      name="state"
      label="Restriction state"
      value={model.state}
      onChange={onChange}
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
              onChange({
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
))
