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
  ToggleFavouriteItemAction,
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
  const guideData = useSelector((state: State) => state.userData.guidesData[model.id])
  const dispatch = useDispatch()

  const selectedItem = model.items && model.items.find(item => guideData && item.id === guideData.selectedItemId)

  return (
    <LoadScript id="script-loader" googleMapsApiKey={config.googleMapsApiKey}>
      <GoogleMap
        mapContainerStyle={{
          left: 0,
          top: '50px',
          bottom: 0,
          right: 0,
          position: 'absolute',
        }}
        onLoad={(mapRef) => setMap(mapRef)}
        onZoomChanged={() => map && dispatch({ ...new MapZoomLevelChangedAction(model.id, map.zoom) })}
        onDragEnd={() => map && dispatch({ ...new MapLatLngChangedAction(model.id, map.center.lat(), map.center.lng()) })}
        zoom={guideData ? guideData.zoomLevel || model.zoomLevel : model.zoomLevel}
        center={{
          lat: guideData ? guideData.mapLatitude || model.latitude : model.latitude,
          lng: guideData ? guideData.mapLongitude || model.longitude : model.longitude,
        }}
      >
        {model.items &&
        model.items
          .filter(item => item.type === ITEM_TYPES.PLACE && item.showOnMap)
          .map(item => (
            <CustomMarker
              key={item.id}
              isSelected={guideData && guideData.selectedItemId === item.id}
              item={item}
              onClick={() => dispatch({ ...new MapSelectItemAction(model.id, item.id) })}
            />
          ))}
      </GoogleMap>
      {guideData &&
      guideData.selectedItemId &&
      (guideData.showFullDetail ? (
        <ItemDetail
          guideData={guideData}
          item={selectedItem}
          hide={() => dispatch({ ...new MapHideFullItemDetailAction(model.id) })}
          onRelatedItemClicked={(selectedItemId) => dispatch({ ...new MapSelectItemAction(model.id, selectedItemId) })}
          onToggleFavouriteItemClicked={() => dispatch({... new ToggleFavouriteItemAction(model.id, selectedItem.id)})}
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
              <Button onClick={() => dispatch({ ...new MapShowFullItemDetailAction(model.id) })} small>
                Detail
              </Button>
            </Box>
          </Flex>
        </SelectedItemWrapper>
      ))}
    </LoadScript>
  )
}
