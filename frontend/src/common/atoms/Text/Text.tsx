import React from 'react'
import styled from 'styled-components'
import { color, fontSize, space, textAlign, width } from 'styled-system'
import { StyledSystemProps } from '../../../theme'

const P = styled.p<StyledSystemProps>`
  ${space}
  ${width}
  ${fontSize}
  ${color}
  ${textAlign}
`

type Props = StyledSystemProps & {
  value: string
}

export const Text = ({ value, ...restProps }: Props) => (
  <P
    {...restProps}
    dangerouslySetInnerHTML={{
      __html: value,
    }}
  />
)
