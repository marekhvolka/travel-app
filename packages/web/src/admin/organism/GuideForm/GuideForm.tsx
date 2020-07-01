import React from 'react'
import { Input } from '../../../common/atoms/Input/Input'
import { ImageInput } from '../../../common/atoms/ImageInput/ImageInput'
import { Select } from '../../../common/atoms/Select/Select'
import { WysiwygInput } from '../../../common/atoms/WysiwygInput/WysiwygInput'
import { Toggle } from '../../../common/atoms/Toggle/Toggle'
import { LocationInput } from '../../../common/atoms/LocationInput/LocationInput'
import { City, Guide } from '@md/common'

type Props = {
  model: Guide
  modelChanged: any
  cities: City[]
}

export const GuideForm = ({ model, modelChanged, cities }: Props) => (
  <div>
    <Input name="name" label="Guide name" value={model.name} onChange={modelChanged} />
    <Input name="url" label="Guide url" value={model.url} onChange={modelChanged} />
    <WysiwygInput name="description" label="Description" onChange={modelChanged} value={model.description} />
    <Input name="price" type="number" label="Price" value={model.price} onChange={modelChanged} />
    <Input name="currency" label="Currency" value={model.currency} onChange={modelChanged} />
    <ImageInput name="previewImageUrl" label="Preview Image" value={model.previewImageUrl} onChange={modelChanged} />
    <Toggle name="published" value={model.published} onChange={modelChanged} label="Published" />
    <LocationInput
      nameLatitude="latitude"
      nameLongitude="longitude"
      nameZoomLevel="zoomLevel"
      latitude={model.latitude}
      longitude={model.longitude}
      zoomLevel={model.zoomLevel}
      onChange={modelChanged}
    />
    <Select label="City" name="cityId" onChange={modelChanged} options={cities} value={model.cityId}/>
  </div>
)
