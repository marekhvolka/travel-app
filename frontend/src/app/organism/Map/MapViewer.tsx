import { GoogleMap, LoadScript } from '@react-google-maps/api'
import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { ITEM_TYPES } from '../../../common/common'
import { config } from '../../../config'
import { Guide } from '../../../models/Guide'
import { GuideData } from '../../../models/GuideData'
import { MapLatLngChangedAction, MapSelectItemAction, MapZoomLevelChangedAction, } from '../../../store'
import { CustomMarker } from './Marker'

type Props = {
  model: Guide
  guideData: GuideData
}

export const MapViewer = React.memo(({ model, guideData }: Props) => {
  const [map, setMap] = useState()
  const dispatch = useDispatch()

  const onMarkerClicked = useCallback((itemId: string) => {
    dispatch({...new MapSelectItemAction(model.id, itemId)})
  }, [dispatch, model.id])

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
                onClick={onMarkerClicked}
              />
            ))}
        </GoogleMap>
      </LoadScript>
    </>
  )
})
