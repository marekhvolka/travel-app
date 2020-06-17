import React from 'react'
import FaHeart from 'react-icons/lib/fa/heart'
import styled from 'styled-components'
import { ImageWrapper } from '../../../common/atoms/ImageWrapper/ImageWrapper'
import { Text } from '../../../common/atoms/Text/Text'
import { IMAGE_SIZES } from '../../../common/common'
import { Item } from '../../../models/Item'
import { GuideData } from '../../../store'
import { media } from '../../../theme'
import { ItemsList } from '../ItemsList/ItemsList'
import { ItemAvailability } from './ItemAvailability'

const ItemDetailWrapper = styled.div`
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
    width: 30%
  }
`

const ItemName = styled.h2`
  text-transform: uppercase
  font-weight: bold
  margin-bottom: 5px
  margin-top: 10px
  display: inline-block
  width: 85%
`

const ItemDescription = styled(Text)`
  text-align: justify
  margin-top: 10px
  font-size: 15px
  line-height: 25px
  color: #13111196
`

const Subheading = styled.h4`
  font-weight: bold;
  text-transform: uppercase;
  font-size: 18px;
  margin-top: 20px;
`

type FavouriteButtonProps = {
  active: boolean
  onClick: () => void
}

const FavouriteButton = styled<FavouriteButtonProps>(FaHeart)`
  float: right
  margin: 5px
  margin-top: 12px
  font-size: 20px
  color: ${props => props.active ? 'red' : 'initial'}
  
  :hover {
    transform: scale(1.2)
  }
`

const TagWrapper = styled.span`
  display: inline-block
  border: 1px solid
  border-color: ${props => props.theme.color.primary}
  color: ${props => props.theme.color.primary};
  padding: 5px 10px
  border-radius: 3px
  margin-right: 4px
`

const defaultDescription = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem '

type Props = {
  guideData: GuideData
  item: Item
  hide: any
  onRelatedItemClicked: (string) => void
  onToggleFavouriteItemClicked: () => void
}

export const ItemDetail = ({ guideData, item, hide, onRelatedItemClicked, onToggleFavouriteItemClicked }: Props) => (
  <ItemDetailWrapper>
    {/*<Button onClick={hide}>X</Button>*/}
    <ImageWrapper size={IMAGE_SIZES.MEDIUM} url={item.previewImageUrl}/>
    <div>
      <ItemName>{item.name}</ItemName>
      <FavouriteButton
        active={!!guideData.favouriteItemsIds[item.id]}
        onClick={onToggleFavouriteItemClicked}
      />
    </div>
    <ItemDescription value={item.description || defaultDescription}/>
    <ItemAvailability restrictions={item.restrictions}/>
    <Subheading>Tags</Subheading>
    {item.tags.map((tag) => (
      <TagWrapper>{tag.name}</TagWrapper>
    ))}
    {item.relatedItems.length > 0 && (
      <>
        <Subheading>Related places</Subheading>
        <ItemsList items={item.relatedItems} onRelatedItemClicked={onRelatedItemClicked}/>
      </>
    )}
  </ItemDetailWrapper>
)
