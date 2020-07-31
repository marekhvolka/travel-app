import styled, { css, ThemeProps } from 'styled-components'
import theme from '../../../theme'

type Props = ThemeProps<typeof theme> & {
  primary?: boolean
  small?: boolean
  float?: string
  center?: boolean
}

export const Button = styled.button`
  float: ${props => props.float || 'none'};
  border: 2px solid;
  margin: 0 24px;
  border-color: ${props => props.theme.color.primary};
  border-radius: ${props => props.theme.border.radius};
  padding: 10px 30px;
  font-weight: bold;
  font-size: 20px;
  ${(props: Props) => props.primary ? css`
    color: ${props.theme.color.secondary};
    background: ${props.theme.color.primary};
  ` : css`
    color: ${props.theme.color.primary};
    background: ${props.theme.color.secondary};
  `}
  ${(props: Props) => props.center && css`
    display: block;
    margin-left: auto;
    margin-right: auto;
  `}

`
