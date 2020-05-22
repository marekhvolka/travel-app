import React from 'react'
import { Marker } from '@react-google-maps/api'

/* global google*/

type Props = {
  isSelected: boolean
  item: any
  onClick: any
}

export const CustomMarker = ({ item, onClick, isSelected }: Props) => (
  <Marker
    key={item.id}
    // icon={{
    //   url: getImageUrl(IMAGE_SIZES.THUMBNAIL, item.previewImageUrl),
    //   size: new google.maps.Size(50, 50),
    //   scaledSize: new google.maps.Size(50, 50),
    // }}
    onClick={onClick}
    position={{
      lat: item.latitude,
      lng: item.longitude,
    }}
  ></Marker>
)
