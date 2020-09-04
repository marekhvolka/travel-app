import { Guide, GuideData, Item } from '@md/common'
import { DirectionsRenderer, GoogleMap, LoadScript } from '@react-google-maps/api'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { ITEM_TYPES } from '../../../../../common/common'
import { config } from '../../../../../config'
import { MapLatLngChangedAction, MapShowItemDetailAction, MapZoomLevelChangedAction, } from '../../../../../store'
import { CustomMarker } from './Marker'

var google: any

type DirectionsProps = {
  item1: Item,
  item2: Item
}

const Directions = ({ item1, item2 }: DirectionsProps) => {
  const [directions, setDirections] = useState()

  useEffect(() => {
    console.log('Drawing route from ' + item1.name + ' to ' + item2.name)
    const directionsService = new (window as any).google.maps.DirectionsService()

    const origin = { lat: item1.location.latitude, lng: item1.location.longitude }
    const destination = { lat: item2.location.latitude, lng: item2.location.longitude }

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: (window as any).google.maps.TravelMode.WALKING
      },
      (result, status) => {
        console.log(status)
        console.log(result)
        if (status === (window as any).google.maps.DirectionsStatus.OK) {
          setDirections(result)
        } else {
          console.error(`error fetching directions ${result}`)
        }
      }
    )
  }, [])

  return (
    <DirectionsRenderer
      directions={directions}
    />
  )
}

type Props = {
  model: Guide
  guideData: GuideData
}

export const MapViewer = React.memo(({ model, guideData }: Props) => {
  const [map, setMap] = useState()
  const [loaded, setLoaded] = useState(false)
  const dispatch = useDispatch()

  const onMarkerClicked = useCallback((itemId: string) => {
    dispatch({ ...new MapShowItemDetailAction(model._id, itemId) })
  }, [dispatch, model._id])

  return (
    <>
      <LoadScript id="script-loader" googleMapsApiKey={config.googleMapsApiKey} onLoad={() => setLoaded(true)}>
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
          {loaded && (
            <Directions item1={model.items[0]} item2={model.items[1]}/>
          )}
        </GoogleMap>
      </LoadScript>
    </>
  )
})
