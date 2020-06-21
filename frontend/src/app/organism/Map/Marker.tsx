import React, { useCallback } from 'react'
import { Marker } from '@react-google-maps/api'

/* global google*/

type Props = {
  isSelected: boolean
  item: any
  onClick: any
}

export const CustomMarker = React.memo(({ item, onClick, isSelected }: Props) => {
  const handleOnClick = useCallback(() => {
    onClick(item.id)
  }, [item.id])

  return (
    <Marker
      key={item.id}
      // icon={{
      //   url: getImageUrl(IMAGE_SIZES.THUMBNAIL, item.previewImageUrl),
      //   size: new google.maps.Size(50, 50),
      //   scaledSize: new google.maps.Size(50, 50),
      // }}
      onClick={handleOnClick}
      position={{
        lat: item.latitude,
        lng: item.longitude,
      }}
    ></Marker>
  )
})
