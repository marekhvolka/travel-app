import { GoogleMap, LoadScript } from '@react-google-maps/api'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { ITEM_TYPES } from '../../../common/common'
import { config } from '../../../config'
import { Guide } from '../../../models/Guide'
import { GuideData } from '../../../models/GuideData'
import {
  ToggleFavouriteItemAction,
  MapHideFullItemDetailAction,
  MapLatLngChangedAction,
  MapSelectItemAction,
  MapShowFullItemDetailAction,
  MapZoomLevelChangedAction,
  State,
} from '../../../store'
import { media } from '../../../theme'
import { ItemCard } from '../../molecules/ItemCard/ItemCard'
import { ItemsSearch } from '../../organism/ItemsSearch'
import { ItemDetail } from '../ItemDetail/ItemDetail'
import { CustomMarker } from './Marker'

const SelectedItemWrapper = styled.div`
  width: 500px
  left: 0
  right: 0
  margin-left: auto
  margin-right: auto
  position: absolute
  bottom: 20px
  border: 1px solid #c7b7b7
  border-radius: 4px
  background: #fff
  padding: 10px
  cursor: pointer
  
  ${media.mobile} {
    width: 90%
  }
`

const SidebarWrapper = styled.div`
  position: absolute
  left: 0
  top: 50px
  bottom: 0
  background: #fff
  padding: 15px
  overflow-y: scroll
  
  ${media.tablet} {
    width: 50%
  }
  
  ${media.desktop} {
    width: 400px
  }
`

type Props = {
  model: Guide
}

export const MapViewer = ({ model }: Props) => {
  const [map, setMap] = useState()
  const guideData: GuideData = useSelector((state: State) => state.userData.guidesData[model.id])
  const dispatch = useDispatch()

  const selectedItem = model.items && model.items.find(item => guideData && item.id === guideData.selectedItemId)

  return (
    <>
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
          zoom={guideData ? guideData.mapZoomLevel || model.zoomLevel : model.zoomLevel}
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
      </LoadScript>

      {guideData && guideData.showSearch && (
        <SidebarWrapper>
          <ItemsSearch guide={model}/>
        </SidebarWrapper>
      )}
      {guideData && !guideData.showSearch && guideData.selectedItemId &&
      (guideData.showFullDetail ? (
        <SidebarWrapper>
          <ItemDetail
            guideData={guideData}
            item={selectedItem}
            hide={() => dispatch({...new MapHideFullItemDetailAction(model.id)})}
            onRelatedItemClicked={(selectedItemId) => dispatch({ ...new MapSelectItemAction(model.id, selectedItemId) })}
            onToggleFavouriteItemClicked={() => dispatch({... new ToggleFavouriteItemAction(model.id, selectedItem.id)})}
          />
        </SidebarWrapper>
      ) : (
        <SelectedItemWrapper onClick={() => dispatch({ ...new MapShowFullItemDetailAction(model.id) })}>
          <ItemCard item={selectedItem}/>
        </SelectedItemWrapper>
      ))}
    </>
  )
}
