import React from 'react'
import styled from 'styled-components'
import {getImageUrl, IMAGE_SIZES} from '../../common'

const Img = styled.img`
  width: 100%;
`

type Props = {
  className?: string
  size?: string
  style?: any
  url: string
}

export const ImageWrapper = ({ size = IMAGE_SIZES.MEDIUM, style, url, className }: Props) => (
  <div className={className} style={style}>
    <Img src={getImageUrl(size, url)} alt="" />
  </div>
)
