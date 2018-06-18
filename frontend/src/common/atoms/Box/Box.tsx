import styled from 'styled-components'
import { space, width, fontSize, color } from 'styled-system';
import {StyledSystemProps} from "../../../theme";

type Props = StyledSystemProps & {
  flex?: number
}

export const Box = styled.div<Props>`
  ${space}
  ${width}
  ${fontSize}
  ${color}
  // border: 1px solid;
  // border-radius: ${props => props.theme.border.radius};
  // border-color: ${props => props.theme.border.color};
  // padding: 10px;
  // margin: 10px;
  flex: ${props => props.flex}
`
