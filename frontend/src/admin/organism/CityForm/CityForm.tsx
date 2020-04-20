import React from 'react'
import { Input } from '../../../common/atoms/Input/Input'
import { makeForm } from '../../../common/organism/Form/makeForm'

export const CityForm = makeForm(({ onChange, model }) => (
  <div>
    <Input name="name" label="City name" value={model.name} onChange={onChange} />
  </div>
))
