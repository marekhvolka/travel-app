import React from 'react'
import {Input} from '../../../common/atoms/Input/Input'
import {WysiwygInput} from '../../../common/atoms/WysiwygInput/WysiwygInput'
import {Toggle} from '../../../common/atoms/Toggle/Toggle'
import {Select} from '../../../common/atoms/Select/Select'
import {makeForm} from "../../../common/organism/Form/makeForm";

export const TagForm = makeForm(({model, onChange}) => (
  <div>
    <Input
      name="name"
      label="Tag name"
      value={model.name}
      onChange={onChange}
    />
    <WysiwygInput
      name="description"
      label="Description"
      onChange={onChange}
      value={model.description}
    />
    <Select
      name="color"
      label="Color"
      value={model.color}
      onChange={onChange}
      options={[
        {
          id: '#28a745',
          name: 'Green',
        },
        {
          id: '#ffc107',
          name: 'Orange',
        },
        {
          id: '#dc3545',
          name: 'Red',
        },
      ]}
    />
    <Select
      name="icon"
      label="Icon"
      value={model.icon}
      onChange={onChange}
      options={[
        {
          id: 'FaUser',
          name: 'User',
        },
        {
          id: 'FaUser',
          name: 'Walk',
        },
      ]}
    />
    <Toggle
      name="published"
      value={model.published}
      onChange={onChange}
      label="Published"
    />
  </div>
))
