import React from 'react'
import styled from 'styled-components'
import { Text } from '../../../common/atoms/Text/Text'
import { ImageWrapper } from '../../../common/atoms/ImageWrapper/ImageWrapper'
import { IMAGE_SIZES } from '../../../common/common'
import { Flex } from '../../../common/atoms/Flex/Flex'
import { Box } from '../../../common/atoms/Box/Box'

type Props = {
  items: any[]
  onRelatedItemClicked: (string) => void
}

const ItemWrapper = styled.div`
  cursor: pointer
  margin-bottom: 10px
`

const ItemName = styled.h4`
  font-weight: bold
  margin-bottom: 4px
`

const ItemText = styled.p`
  text-align: justify
  color: #13111196
`

const defaultTitle = 'This is default title. It\'s usually shorter than a description. Two sentences seems to be all right'

export const ItemsList = ({ items, onRelatedItemClicked }: Props) => (
  <div>
    {items.map(item => (
      <ItemWrapper key={item.id} onClick={() => onRelatedItemClicked(item.id)}>
        <Flex>
          <Box flex={3}>
            <ImageWrapper size={IMAGE_SIZES.SMALL} url={item.previewImageUrl} />
          </Box>
          <Box flex={5} style={{ padding: '0px 10px' }}>
            <ItemName>{item.name}</ItemName>
            <ItemText>{item.title || defaultTitle}</ItemText>
          </Box>
        </Flex>
      </ItemWrapper>
    ))}
  </div>
)
