import styled from 'styled-components'
import { StyledSystemProps } from '../../../theme'
import { color, fontSize, space, width } from 'styled-system'

type Props = StyledSystemProps & {
  primary?: boolean
  small?: boolean
}

export const Button = styled.button<Props>`
  ${space}
  ${width}
  ${fontSize}
  ${color}
  border: 2px solid;
  border-color: ${props => props.theme.primaryColor};
  border-radius: ${props => props.theme.border.radius};
  padding: 10px 30px;
  background: ${props => (props.primary ? props.theme.primaryColor : props.theme.secondaryColor)};
  color: ${props => (props.primary ? props.theme.secondaryColor : props.theme.primaryColor)};
  font-weight: bold;
  font-size: 20px;
`
