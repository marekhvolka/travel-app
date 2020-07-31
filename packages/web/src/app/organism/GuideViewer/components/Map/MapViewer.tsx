import { GoogleMap, LoadScript } from '@react-google-maps/api'
import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Guide, GuideData } from '@md/common'
import { ITEM_TYPES } from '../../../../../common/common'
import { config } from '../../../../../config'
import { MapLatLngChangedAction, MapShowItemDetailAction, MapZoomLevelChangedAction, } from '../../../../../store'
import { CustomMarker } from './Marker'

type Props = {
  model: Guide
  guideData: GuideData
}

export const MapViewer = React.memo(({ model, guideData }: Props) => {
  const [map, setMap] = useState()
  const dispatch = useDispatch()

  const onMarkerClicked = useCallback((itemId: string) => {
    dispatch({...new MapShowItemDetailAction(model._id, itemId)})
  }, [dispatch, model._id])

  return (
    <>
      <LoadScript id="script-loader" googleMapsApiKey={config.googleMapsApiKey}>
        <GoogleMap
          mapContainerStyle={{
            left: 0,
            top: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
          }}
          options={{
            disableDefaultUI: true
          }}
          onLoad={(mapRef) => setMap(mapRef)}
          onZoomChanged={() => map && dispatch({ ...new MapZoomLevelChangedAction(model._id, map.zoom) })}
          onDragEnd={() => map && dispatch({ ...new MapLatLngChangedAction(model._id, map.center.lat(), map.center.lng()) })}
          zoom={guideData ? guideData.mapZoomLevel || model.location.zoomLevel : model.location.zoomLevel}
          center={{
            lat: guideData ? guideData.mapLatitude || model.location.latitude : model.location.latitude,
            lng: guideData ? guideData.mapLongitude || model.location.longitude : model.location.longitude,
          }}
        >
          {model.items &&
          model.items
            .filter(item => item.type === ITEM_TYPES.PLACE && item.showOnMap)
            .map(item => (
              <CustomMarker
                key={item._id}
                isSelected={guideData && guideData.selectedItemId === item._id}
                item={item}
                onClick={onMarkerClicked}
              />
            ))}
        </GoogleMap>
      </LoadScript>
    </>
  )
})
