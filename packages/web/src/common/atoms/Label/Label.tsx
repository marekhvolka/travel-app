import styled from 'styled-components'

export const Label = styled.span`
  border: 1px solid ${props => props.theme.border.color};
  border-radius: ${props => props.theme.border.radius};
  padding: 5px 10px;
`
