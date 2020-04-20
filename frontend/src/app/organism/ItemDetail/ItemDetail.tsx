import React from 'react'
import styled from 'styled-components'
import { makeModal } from '../../molecules/ModalWindow/ModalWindow'
import { Text } from '../../../common/atoms/Text/Text'
import { ImageWrapper } from '../../../common/atoms/ImageWrapper/ImageWrapper'
import { IMAGE_SIZES } from '../../../common/common'
import { ItemsList } from '../ItemsList/ItemsList'
import { ItemAvailability } from './ItemAvailability'
import { Item } from '../../../models/Item'

const ItemDetailWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 50px;
  bottom: 0;
  background: #fff;
  width: 500px;
  padding: 15px;
  overflow-y: scroll;
`

type Props = {
  item: Item
  hide: any
  onRelatedItemClicked: (string) => void
}

const ItemDetail = ({ item, hide, onRelatedItemClicked }: Props) => (
  <ItemDetailWrapper>
    <h3 style={{ textAlign: 'center' }}>{item.name}</h3>
    {/*<Button onClick={hide}>X</Button>*/}
    <ImageWrapper size={IMAGE_SIZES.MEDIUM} url={item.previewImageUrl} />
    <Text value={item.title}></Text>
    {/*<Text value={item.description} />*/}
    <ItemAvailability restrictions={item.restrictions} />
    {item.relatedItems.length > 0 && (
      <>
        <h4>Related places</h4>
        <ItemsList items={item.relatedItems} onRelatedItemClicked={onRelatedItemClicked} />
      </>
    )}
  </ItemDetailWrapper>
)

export default makeModal(ItemDetail)
