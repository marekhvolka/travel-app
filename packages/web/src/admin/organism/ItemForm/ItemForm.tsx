import { Field } from 'formik'
import React from 'react'
import { Input } from '../../../common/atoms/Input/Input'
import { ITEM_TYPES } from '../../../common/common'
import { WysiwygInput } from '../../../common/atoms/WysiwygInput/WysiwygInput'
import { Toggle } from '../../../common/atoms/Toggle/Toggle'
import { LocationInput } from '../../../common/atoms/LocationInput/LocationInput'
import { ImageInput } from '../../../common/atoms/ImageInput/ImageInput'
import { Select } from '../../../common/atoms/Select/Select'
import { TextArea } from '../../../common/atoms/TextArea/TextArea'
import { Item } from '@md/common'

type Props = {
  model: Item
}

export const ItemForm = ({ model }: Props) => (
  <div>
    <Field
      name="type"
      label="Item type"
      options={[
        {
          id: ITEM_TYPES.PLACE,
          name: 'Place',
        },
        {
          id: 'PERSON',
          name: 'Person',
        },
        {
          id: 'EVENT',
          name: 'Event',
        },
      ]}
      component={Select}
    />
    <Field
      name="name"
      label="Item name"
      component={Input}
    />
    <Field
      name="title"
      label="Item title"
      component={TextArea}
    />
    <Field
      name="description"
      label="Description"
      component={WysiwygInput}
    />
    <Field
      name="published"
      label="Published"
      component={Toggle}
    />
    {model.type === ITEM_TYPES.PLACE && (
      <>
        <Field
          name="showOnMap"
          label="Show on map"
          component={Toggle}
        />
        <Field
          name="latitude"
          label="Place latitude"
          component={Input}
        />
        <Field
          name="longitude"
          label="Place longitude"
          component={Input}
        />
        <Field
          name="location"
          component={LocationInput}
        />
      </>
    )}
    <Field
      name="previewImageUrl"
      label="Preview Image"
      component={ImageInput}
    />
  </div>
)
