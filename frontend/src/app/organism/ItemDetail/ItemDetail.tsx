import React from 'react'
import styled from 'styled-components'
import { ImageWrapper } from '../../../common/atoms/ImageWrapper/ImageWrapper'
import { Text } from '../../../common/atoms/Text/Text'
import { IMAGE_SIZES } from '../../../common/common'
import { Item } from '../../../models/Item'
import { ItemsList } from '../ItemsList/ItemsList'
import { ItemAvailability } from './ItemAvailability'

const ItemDetailWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 50px;
  bottom: 0;
  background: #fff;
  width: 400px;
  padding: 15px;
  overflow-y: scroll;
`

const ItemName = styled.h2`
  text-transform: uppercase
  font-weight: bold
  margin-bottom: 5px
  margin-top: 10px
`

const ItemDescription = styled(Text)`
  text-align: justify
  margin-top: 10px
  font-size: 15px
  line-height: 25px
  color: #13111196
`

const RelatedPlacesHeading = styled.h4`
  font-weight: bold;
  text-transform: uppercase;
  font-size: 18px;
  margin-top: 20px;
`

const defaultDescription = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem '

type Props = {
  item: Item
  hide: any
  onRelatedItemClicked: (string) => void
}

export const ItemDetail = ({ item, hide, onRelatedItemClicked }: Props) => (
  <ItemDetailWrapper>
    {/*<Button onClick={hide}>X</Button>*/}
    <ImageWrapper size={IMAGE_SIZES.MEDIUM} url={item.previewImageUrl}/>
    <ItemName>{item.name}</ItemName>
    <ItemDescription value={item.description || defaultDescription}/>
    <ItemAvailability restrictions={item.restrictions}/>
    {item.relatedItems.length > 0 && (
      <>
        <RelatedPlacesHeading>Related places</RelatedPlacesHeading>
        <ItemsList items={item.relatedItems} onRelatedItemClicked={onRelatedItemClicked}/>
      </>
    )}
  </ItemDetailWrapper>
)
