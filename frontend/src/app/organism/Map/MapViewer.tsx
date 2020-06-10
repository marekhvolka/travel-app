import { GoogleMap, LoadScript } from '@react-google-maps/api'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { Box } from '../../../common/atoms/Box/Box'
import { Button } from '../../../common/atoms/Button/Button'
import { Flex } from '../../../common/atoms/Flex/Flex'
import { ImageWrapper } from '../../../common/atoms/ImageWrapper/ImageWrapper'
import { Text } from '../../../common/atoms/Text/Text'
import { IMAGE_SIZES, ITEM_TYPES } from '../../../common/common'
import { config } from '../../../config'
import {
  MapHideFullItemDetailAction,
  MapLatLngChangedAction,
  MapSelectItemAction,
  MapShowFullItemDetailAction,
  MapZoomLevelChangedAction,
  State,
} from '../../../store'
import { ItemDetail } from '../ItemDetail/ItemDetail'
import { CustomMarker } from './Marker'

const SelectedItemWrapper = styled.div`
  width: 500px
  height: 250px
  left: 0
  right: 0
  margin-left: auto
  margin-right: auto
  position: absolute
  bottom: 20px
  border: 1px solid #c7b7b7
  border-radius: 4px
  background: #fff
  padding: 5px 10px
`

const defaultTitle = 'This is default title. It\'s usually shorter than a description. Two sentences seems to be all right'

export const MapViewer = ({ model }) => {
  const [map, setMap] = useState()
  const userData = useSelector((state: State) => state.userData)
  const dispatch = useDispatch()

  const selectedItem = model.items && model.items.find(item => userData && item.id === userData.selectedItemId)

  return (
    <LoadScript id="script-loader" googleMapsApiKey={config.googleMapsApiKey}>
      <GoogleMap
        mapContainerStyle={{
          left: 0,
          top: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
        }}
        onLoad={(mapRef) => setMap(mapRef)}
        onZoomChanged={() => map && dispatch({ ...new MapZoomLevelChangedAction(map.zoom) })}
        onDragEnd={() => map && dispatch({ ...new MapLatLngChangedAction(map.center.lat(), map.center.lng()) })}
        zoom={userData ? userData.zoomLevel || model.zoomLevel : model.zoomLevel}
        center={{
          lat: userData ? userData.mapLatitude || model.latitude : model.latitude,
          lng: userData ? userData.mapLongitude || model.longitude : model.longitude,
        }}
      >
        {model.items &&
        model.items
          .filter(item => item.type === ITEM_TYPES.PLACE)
          .map(item => (
            <CustomMarker
              key={item.id}
              isSelected={userData && userData.selectedItemId === item.id}
              item={item}
              onClick={() => dispatch({ ...new MapSelectItemAction(item.id) })}
            />
          ))}
      </GoogleMap>
      {userData &&
      userData.selectedItemId &&
      (userData.showFullDetail ? (
        <ItemDetail
          item={selectedItem}
          hide={() => dispatch({ ...new MapHideFullItemDetailAction() })}
          onRelatedItemClicked={(selectedItemId) => dispatch({ ...new MapSelectItemAction(selectedItemId) })}
        />
      ) : (
        <SelectedItemWrapper>
          <h4>{selectedItem.name}</h4>
          <Flex>
            <Box flex={1}>
              <ImageWrapper size={IMAGE_SIZES.THUMBNAIL} url={selectedItem.previewImageUrl}/>
            </Box>
            <Box flex={3}>
              <Text p={'0 20px'} value={selectedItem.title || defaultTitle}/>
              <Button onClick={() => dispatch({ ...new MapShowFullItemDetailAction() })} small>
                Detail
              </Button>
            </Box>
          </Flex>
        </SelectedItemWrapper>
      ))}
    </LoadScript>
  )
}
