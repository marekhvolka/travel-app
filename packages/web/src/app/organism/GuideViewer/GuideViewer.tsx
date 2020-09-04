import { Guide, GuideData, Tag } from '@md/common'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled, { createGlobalStyle } from 'styled-components'
import { MapLatLngChangedAction, OpenGuideAction, State, ToggleSearchAction } from '../../../store'
import { media } from '../../../theme'
import { ItemsSearch } from './components/ItemsSearch'
import { ItemDetail } from './components/ItemDetail/ItemDetail'
import { MapViewer } from './components/Map/MapViewer'
import { Navbar } from './components/Navbar/Navbar'

const GuideViewerWrapper = styled.div`
  width: 100%;
  height: 100%;

  * {
    //font-family: 'Libre Baskerville', serif;
  }

  @media only screen and (min-width: 600px) {
    //min-height: 800px;
  }
`

const MainContent = styled.div`
  padding: 0 20px 20px;
  height: 91%;
`

const SidebarWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  max-height: 100%;
  overflow-y: scroll;
  background: #fff;
  padding: 10px 15px;
  width: 100%;
  
  ${media.tablet} {
    width: 50%;
  }
  
  ${media.desktop} {
    width: 400px;
  }
`

export const GlobalStyle = createGlobalStyle`
 body {
  overflow: hidden;
 }
`

type Props = {
  model: Guide
  tags: Tag[]
}

export const GuideViewer = ({ model, tags }: Props) => {
  const dispatch = useDispatch()
  const guideData: GuideData = useSelector((state: State) => (state.userData.guidesData && state.userData.guidesData[model._id]) ? state.userData.guidesData[model._id] : {})
  const selectedItem = model.items && model.items.find(item => guideData && item._id === guideData.selectedItemId)

  const handleOnLocateMe = (latitude: number, longitude: number) => {
    dispatch({...new MapLatLngChangedAction(model._id, latitude, longitude)})
  }

  useEffect(() => {
    dispatch({...new OpenGuideAction(model._id)})
  }, [])

  const showSearchPanel = guideData && guideData.showSearch
  const isItemSelected = guideData && guideData.selectedItemId
  const showItemDetail = guideData && !showSearchPanel && isItemSelected

  return (
    <GuideViewerWrapper>
      <GlobalStyle/>
      <MainContent>
        <MapViewer
          model={model}
          guideData={guideData}
        />
        <SidebarWrapper>
          <Navbar
            onSearchClick={() => dispatch({ ...new ToggleSearchAction(model._id) })}
            onLocateMe={handleOnLocateMe}
          />

          {showSearchPanel && (
            <div style={{ marginTop: '10px', position: 'relative' }}>
              <ItemsSearch guide={model} tags={tags}/>
            </div>
          )}
          {showItemDetail && (
            <div style={{ marginTop: '10px', position: 'relative' }}>
              <ItemDetail
                guide={model}
                isInFavourites={guideData.favouriteItemsIds && !!guideData.favouriteItemsIds[selectedItem._id]}
                item={selectedItem}
              />
            </div>
          )}
        </SidebarWrapper>
      </MainContent>
    </GuideViewerWrapper>
  )
}
