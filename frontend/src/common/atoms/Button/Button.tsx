import styled, { css } from 'styled-components'
import { color, fontSize, space, width } from 'styled-system'
import { StyledSystemProps } from '../../../theme'

type Props = StyledSystemProps & {
  primary?: boolean
  small?: boolean
  float?: string
}

export const Button = styled.button<Props> `
  ${space}
  ${width}
  ${fontSize}
  ${color}
  float: ${props => props.float || 'none'}
  border: 2px solid;
  margin: 0 24px;
  border-color: ${props => props.theme.primaryColor};
  border-radius: ${props => props.theme.border.radius};
  padding: 10px 30px;
  font-weight: bold;
  font-size: 20px;
  ${props => props.primary ? css`
    color: ${props.theme.secondaryColor}
    background: ${props.theme.primaryColor}
  ` : css`
    color: ${props.theme.primaryColor}
    background: ${props.theme.secondaryColor}
  `}

`
