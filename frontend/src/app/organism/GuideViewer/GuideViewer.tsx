import React from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { Guide } from '../../../models/Guide'
import { GuideData } from '../../../models/GuideData'
import { Tag } from '../../../models/Tag'
import { MapShowFullItemDetailAction, State } from '../../../store'
import { media } from '../../../theme'
import { MapViewer } from '../Map/MapViewer'
import { ItemCard } from '../../molecules/ItemCard/ItemCard'
import { ItemsSearch } from '../../organism/ItemsSearch'
import { ItemDetail } from '../ItemDetail/ItemDetail'

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
  tags: Tag[]
}

export const GuideViewer = ({ model, tags }: Props) => {
  const dispatch = useDispatch()
  const guideData: GuideData = useSelector((state: State) => state.userData.guidesData[model.id])
  const selectedItem = model.items && model.items.find(item => guideData && item.id === guideData.selectedItemId)

  return (
    <GuideViewerWrapper>
      <MainContent>
        <MapViewer
          model={model}
          guideData={guideData}
        />
        {guideData && guideData.showSearch && (
          <SidebarWrapper>
            <ItemsSearch guide={model} tags={tags} />
          </SidebarWrapper>
        )}
        {guideData && !guideData.showSearch && guideData.selectedItemId &&
        (guideData.showFullDetail ? (
          <SidebarWrapper>
            <ItemDetail
              guide={model}
              isInFavourites={!!guideData.favouriteItemsIds[selectedItem.id]}
              item={selectedItem}
            />
          </SidebarWrapper>
        ) : (
          <SelectedItemWrapper onClick={() => dispatch({ ...new MapShowFullItemDetailAction(model.id) })}>
            <ItemCard item={selectedItem}/>
          </SelectedItemWrapper>
        ))}
      </MainContent>
    </GuideViewerWrapper>
  )
}
