import React, { Component } from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api'
import styled from 'styled-components'
import { IMAGE_SIZES, ITEM_TYPES } from '../../../common/common'
import { CustomMarker } from './Marker'
import { ImageWrapper } from '../../../common/atoms/ImageWrapper/ImageWrapper'
import { Text } from '../../../common/atoms/Text/Text'
import { Button } from '../../../common/atoms/Button/Button'
import { Box } from '../../../common/atoms/Box/Box'
import { Flex } from '../../../common/atoms/Flex/Flex'
import {
  MapHideFullItemDetailAction,
  MapLatLngChangedAction,
  MapSelectItemAction,
  MapShowFullItemDetailAction,
  MapZoomLevelChangedAction,
  State,
} from '../../../store'
import { connect, ConnectedProps } from 'react-redux'
import config from '../../../config'
import ItemDetail from '../ItemDetail/ItemDetail'

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

const mapState = (state: State) => ({
  userData: state.userData,
})

const mapDispatch = {
  onZoomChanged: zoomLevel => ({ ...new MapZoomLevelChangedAction(zoomLevel) }),
  onLatLngChanged: (latitude, longitude) => ({ ...new MapLatLngChangedAction(latitude, longitude) }),
  onItemClicked: selectedItemId => ({ ...new MapSelectItemAction(selectedItemId) }),
  onShowFullDetail: () => ({ ...new MapShowFullItemDetailAction() }),
  onHideFullDetail: () => ({ ...new MapHideFullItemDetailAction() }),
}

const connector = connect(mapState, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {
  model: any
}

class MapViewer extends Component<Props> {
  map: any

  render() {
    const {
      userData,
      model,
      onZoomChanged,
      onShowFullDetail,
      onHideFullDetail,
      onItemClicked,
      onLatLngChanged,
    } = this.props
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
          onLoad={mapRef => (this.map = mapRef)}
          onZoomChanged={() => this.map && onZoomChanged(this.map.zoom)}
          onDragEnd={() => this.map && onLatLngChanged(this.map.center.lat(), this.map.center.lng())}
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
                  onClick={() => onItemClicked(item.id)}
                />
              ))}
        </GoogleMap>
        {userData &&
          userData.selectedItemId &&
          (userData.showFullDetail ? (
            <ItemDetail item={selectedItem} hide={onHideFullDetail} onRelatedItemClicked={onItemClicked} />
          ) : (
            <SelectedItemWrapper>
              <h4>{selectedItem.name}</h4>
              <Flex>
                <Box flex={1}>
                  <ImageWrapper size={IMAGE_SIZES.THUMBNAIL} url={selectedItem.previewImageUrl} />
                </Box>
                <Box flex={3}>
                  <Text p={'0 20px'} value={selectedItem.title} />
                  <Button onClick={onShowFullDetail} small>
                    Detail
                  </Button>
                </Box>
              </Flex>
            </SelectedItemWrapper>
          ))}
      </LoadScript>
    )
  }
}

export default connector(MapViewer)
