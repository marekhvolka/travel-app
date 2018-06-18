import React from 'react'
import { Input } from '../../../common/atoms/Input/Input'
import { ImageInput } from '../../../common/atoms/ImageInput/ImageInput'
import { makeForm } from '../../../common/organism/Form/makeForm'
import { WysiwygInput } from '../../../common/atoms/WysiwygInput/WysiwygInput'
import { Toggle } from '../../../common/atoms/Toggle/Toggle'
import { LocationInput } from '../../../common/atoms/LocationInput/LocationInput'

export const GuideForm = makeForm(({model, onChange}) => (
  <div>
    <Input
      name="name"
      label="Guide name"
      value={model.name}
      onChange={onChange}
    />
    <Input
      name="url"
      label="Guide url"
      value={model.url}
      onChange={onChange}
    />
    <WysiwygInput
      name="description"
      label="Description"
      onChange={onChange}
      value={model.description}
    />
    <Input
      name="price"
      type="number"
      label="Price"
      value={model.price}
      onChange={onChange}
    />
    <Input
      name="currency"
      label="Currency"
      value={model.currency}
      onChange={onChange}
    />
    <ImageInput
      name="previewImageUrl"
      label="Preview Image"
      value={model.previewImageUrl}
      onChange={onChange}
    />
    <Toggle
      name="published"
      value={model.published}
      onChange={onChange}
      label="Published"
    />
    <LocationInput
      nameLatitude="latitude"
      nameLongitude="longitude"
      nameZoomLevel="zoomLevel"
      latitude={model.latitude}
      longitude={model.longitude}
      zoomLevel={model.zoomLevel}
      onChange={onChange}
    />
  </div>
))
