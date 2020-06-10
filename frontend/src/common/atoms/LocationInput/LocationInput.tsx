import React from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import { config } from '../../../config'

type Props = {
  latitude?: number
  longitude?: number
  nameLatitude: string
  nameLongitude: string
  nameZoomLevel: string
  onChange: any
  zoomLevel?: number
}

export const LocationInput = (props: Props) => {
  let map: any

  const onClick = data => {
    if (!props.latitude && !props.longitude) {
      onChangeLocation(data)
    }
  }

  const onChangeLocation = data => {
    props.onChange({
      [props.nameLatitude]: data.latLng.lat(),
      [props.nameLongitude]: data.latLng.lng(),
    })
  }

  const onChangeZoom = () => {
    map &&
      props.onChange({
        [props.nameZoomLevel]: map.getZoom(),
      })
  }

  const { latitude, longitude, zoomLevel } = props
  const showMarker = latitude && longitude

  return (
    <LoadScript id="script-loader" googleMapsApiKey={config.googleMapsApiKey}>
      <GoogleMap
        mapContainerStyle={{
          height: '400px',
          width: '800px',
        }}
        onLoad={mapRef => (map = mapRef)}
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
  )
}
