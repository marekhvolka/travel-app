import React from 'react'
import { Input } from '../../../common/atoms/Input/Input'
import { City } from '../../../models/City'

type Props = {
  model: City
  modelChanged: any
}

export const CityForm = ({ modelChanged, model }: Props) => (
  <div>
    <Input name="name" label="City name" value={model.name} onChange={modelChanged} />
  </div>
)
