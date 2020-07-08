import React, { useCallback } from 'react'
import { Marker } from '@react-google-maps/api'
import { Item } from '@md/common'

/* global google*/

type Props = {
  isSelected: boolean
  item: Item
  onClick: any
}

export const CustomMarker = React.memo(({ item, onClick, isSelected }: Props) => {
  const handleOnClick = useCallback(() => {
    onClick(item._id)
  }, [item._id])

  return (
    <Marker
      key={item._id}
      // icon={{
      //   url: getImageUrl(IMAGE_SIZES.THUMBNAIL, item.previewImageUrl),
      //   size: new google.maps.Size(50, 50),
      //   scaledSize: new google.maps.Size(50, 50),
      // }}
      onClick={handleOnClick}
      position={{
        lat: item.location.latitude,
        lng: item.location.longitude,
      }}
    ></Marker>
  )
})
