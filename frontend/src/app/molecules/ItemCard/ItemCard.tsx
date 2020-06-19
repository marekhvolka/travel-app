import React from 'react'
import styled from 'styled-components'
import { Box } from '../../../common/atoms/Box/Box'
import { Flex } from '../../../common/atoms/Flex/Flex'
import { ImageWrapper } from '../../../common/atoms/ImageWrapper/ImageWrapper'
import { IMAGE_SIZES } from '../../../common/common'
import { Item } from '../../../models/Item'

type Props = {
  item: Item
}

const defaultTitle = 'This is default title. It\'s usually shorter than a description. Two sentences seems to be all right'

const Wrapper = styled.div`
  cursor: pointer
`

const ItemName = styled.h4`
  font-weight: bold
  margin-bottom: 4px
  text-transform: uppercase
`

const ItemText = styled.p`
  text-align: justify
  color: #13111196
`

export const ItemCard = (props: Props) => (
  <Wrapper>
    <Flex>
      <Box flex={3}>
        <ImageWrapper size={IMAGE_SIZES.SMALL} url={props.item.previewImageUrl}/>
      </Box>
      <Box flex={5} style={{ padding: '0px 10px' }}>
        <ItemName>{props.item.name}</ItemName>
        <ItemText>{props.item.title || defaultTitle}</ItemText>
      </Box>
    </Flex>
  </Wrapper>
)
