import styled from 'styled-components'

type Props = {
  flex?: number
}

export const Box = styled.div`
  // border: 1px solid;
  // border-radius: ${props => props.theme.border.radius};
  // border-color: ${props => props.theme.border.color};
  // padding: 10px;
  // margin: 10px;
  flex: ${(props: Props) => props.flex};
`
