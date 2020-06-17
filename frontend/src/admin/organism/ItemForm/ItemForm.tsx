import React from 'react'
import { Input } from '../../../common/atoms/Input/Input'
import { ITEM_TYPES } from '../../../common/common'
import { makeForm } from '../../../common/organism/Form/makeForm'
import { WysiwygInput } from '../../../common/atoms/WysiwygInput/WysiwygInput'
import { Toggle } from '../../../common/atoms/Toggle/Toggle'
import { LocationInput } from '../../../common/atoms/LocationInput/LocationInput'
import { ImageInput } from '../../../common/atoms/ImageInput/ImageInput'
import { Select } from '../../../common/atoms/Select/Select'
import { TextArea } from '../../../common/atoms/TextArea/TextArea'

export const ItemForm = makeForm(({ model, onChange }) => (
  <div>
    <Select
      name="type"
      label="Item type"
      value={model.type}
      onChange={onChange}
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
    />
    <Input name="name" label="Item name" value={model.name} onChange={onChange} />
    <TextArea name="title" label="Item title" value={model.title} onChange={onChange} />
    <WysiwygInput name="description" label="Description" onChange={onChange} value={model.description} />
    <Toggle name="published" value={model.published} onChange={onChange} label="Published" />
    {model.type === ITEM_TYPES.PLACE && (
      <>
        <Toggle name="showOnMap" value={model.showOnMap} onChange={onChange} label="Show on map" />
        <Input name="latitude" label="Place latitude" value={model.latitude} onChange={onChange} />
        <Input name="longitude" label="Place longitude" value={model.longitude} onChange={onChange} />
        <LocationInput
          nameLatitude="latitude"
          nameLongitude="longitude"
          nameZoomLevel="zoomLevel"
          latitude={model.latitude}
          longitude={model.longitude}
          zoomLevel={model.zoomLevel}
          onChange={onChange}
        />
      </>
    )}
    <ImageInput name="previewImageUrl" label="Preview Image" value={model.previewImageUrl} onChange={onChange} />
  </div>
))
