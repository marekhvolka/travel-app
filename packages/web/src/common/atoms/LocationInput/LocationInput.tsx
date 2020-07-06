import { FieldProps } from 'formik'
import React, { useState} from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import { config } from '../../../config'

type Props = FieldProps & {
  name: string
}

export const LocationInput = React.memo(({ field, form: { setFieldValue }, ...props }: Props) => {
  const [map, setMap] = useState(null)
  const latitude = field.value.latitude
  const longitude = field.value.longitude
  const zoomLevel = field.value.zoomLevel

  const onClick = data => {
    if (!latitude && !longitude) {
      onChangeLocation(data)
    }
  }

  const onChangeLocation = data => {
    setFieldValue(field.name, {
      latitude: data.latLng.lat(),
      longitude: data.latLng.lng(),
      zoomLevel
    })
  }

  const onChangeZoom = () => {
    map && setFieldValue(field.name, {
      zoomLevel: map.getZoom(),
      latitude,
      longitude
    })
  }

  const showMarker = latitude && longitude

  return (
    <>
      <div>
        latitude {latitude} <br />
        longitude {longitude} <br />
        zoomLevel {zoomLevel} <br />
      </div>
    <LoadScript id="script-loader" googleMapsApiKey={config.googleMapsApiKey}>
      <GoogleMap
        mapContainerStyle={{
          height: '400px',
          width: '800px',
        }}
        onLoad={setMap}
        onClick={onClick}
        onZoomChanged={onChangeZoom}
        zoom={zoomLevel || 12.9}
        center={{
          lat: latitude,
          lng: longitude,
        }}
      >
        {showMarker && (
          <Marker
            position={{
              lat: latitude,
              lng: longitude,
            }}
            onDragEnd={onChangeLocation}
            draggable
          />
        )}
      </GoogleMap>
    </LoadScript>
    </>
  )
})
