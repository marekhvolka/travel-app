import React from 'react'
import { Input } from '../../../common/atoms/Input/Input'
import { ITEM_TYPES } from '../../../common/common'
import { WysiwygInput } from '../../../common/atoms/WysiwygInput/WysiwygInput'
import { Toggle } from '../../../common/atoms/Toggle/Toggle'
import { LocationInput } from '../../../common/atoms/LocationInput/LocationInput'
import { ImageInput } from '../../../common/atoms/ImageInput/ImageInput'
import { Select } from '../../../common/atoms/Select/Select'
import { TextArea } from '../../../common/atoms/TextArea/TextArea'
import { Item } from '../../../models/Item'

type Props = {
  model: Item
  modelChanged: any
}

export const ItemForm = ({ model, modelChanged }: Props) => (
  <div>
    <Select
      name="type"
      label="Item type"
      value={model.type}
      onChange={modelChanged}
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
    <Input name="name" label="Item name" value={model.name} onChange={modelChanged} />
    <TextArea name="title" label="Item title" value={model.title} onChange={modelChanged} />
    <WysiwygInput name="description" label="Description" onChange={modelChanged} value={model.description} />
    <Toggle name="published" value={model.published} onChange={modelChanged} label="Published" />
    {model.type === ITEM_TYPES.PLACE && (
      <>
        <Toggle name="showOnMap" value={model.showOnMap} onChange={modelChanged} label="Show on map" />
        <Input name="latitude" label="Place latitude" value={model.latitude} onChange={modelChanged} />
        <Input name="longitude" label="Place longitude" value={model.longitude} onChange={modelChanged} />
        <LocationInput
          nameLatitude="latitude"
          nameLongitude="longitude"
          nameZoomLevel="zoomLevel"
          latitude={model.latitude}
          longitude={model.longitude}
          zoomLevel={model.zoomLevel}
          onChange={modelChanged}
        />
      </>
    )}
    <ImageInput name="previewImageUrl" label="Preview Image" value={model.previewImageUrl} onChange={modelChanged} />
  </div>
)
