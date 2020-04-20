import React from 'react'
import TimePicker from 'antd/lib/time-picker'
import moment from 'moment'
import { makeForm } from '../../../../common/organism/Form/makeForm'
import { Select } from '../../../../common/atoms/Select/Select'
import 'antd/dist/antd.css'
import { RestrictionState } from '../../../../models/RestrictionState'

export const DayRestrictionForm = makeForm(({ dayId, model, onChange }) => {
  const format = 'HH:mm'

  return (
    <div style={{ float: 'left', display: 'inline', width: 100 / 7 + '%' }}>
      <h3>{dayId}</h3>
      <Select
        key={`dayRestriction-state-${model.id}`}
        name="state"
        label="State"
        value={model.state}
        onChange={onChange}
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
      <TimePicker
        style={{ display: model.state === RestrictionState.RESTRICTED ? 'initial' : 'none' }}
        key={`dayRestriction-from-${model.id}`}
        format={format}
        value={moment(model.from ? model.from : Date.now())}
        onChange={data =>
          onChange({
            from: data.toString(),
          })
        }
      />
      <TimePicker
        style={{ display: model.state === RestrictionState.RESTRICTED ? 'initial' : 'none' }}
        key={`dayRestriction-to-${model.id}`}
        format={format}
        value={moment(model.to ? model.to : Date.now())}
        onChange={data =>
          onChange({
            to: data.toString(),
          })
        }
      />
    </div>
  )
})
