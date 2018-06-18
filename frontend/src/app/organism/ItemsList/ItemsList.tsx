import React from 'react'
import { Text } from '../../../common/atoms/Text/Text'
import { ImageWrapper } from '../../../common/atoms/ImageWrapper/ImageWrapper'
import { IMAGE_SIZES } from '../../../common/common'
import { Flex } from '../../../common/atoms/Flex/Flex'
import { Box } from '../../../common/atoms/Box/Box'

type Props = {
  items: any[]
  onRelatedItemClicked: (string) => void
}

export const ItemsList = ({ items, onRelatedItemClicked }: Props) => (
  <div>
    {items.map(item => (
      <Box
        style={{ cursor: 'pointer' }}
        key={item.id}
        onClick={() => onRelatedItemClicked(item.id)}
      >
        <Flex>
          <Box flex={1}>
            <ImageWrapper size={IMAGE_SIZES.SMALL} url={item.previewImageUrl} />
          </Box>
          <Box flex={3} style={{ padding: '13px 10px' }}>
            <h5 className={'font-weight-bold'}>{item.name}</h5>
            <Text value={item.title} />
          </Box>
        </Flex>
      </Box>
    ))}
  </div>
)
