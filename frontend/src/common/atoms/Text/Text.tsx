import React from 'react'
import styled from "styled-components";
import {color, fontSize, space, width} from "styled-system";
import {StyledSystemProps} from "../../../theme";

const P = styled.p<StyledSystemProps>`
  ${space}
  ${width}
  ${fontSize}
  ${color}
`

type Props = StyledSystemProps & {
  value: string
}

export const Text = ({ value, ...restProps }: Props) => (
  <P
    {...restProps}
    className={'text-justify'}
    dangerouslySetInnerHTML={{
      __html: value,
    }}
  />
)
