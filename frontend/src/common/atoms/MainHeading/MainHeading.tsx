import styled from 'styled-components'
import { width } from 'styled-system'

type Props = {
  center?: boolean
  justify?: boolean
  left?: boolean
  right?: boolean
}

export const MainHeading = styled.h1<Props>`
  ${width}
  text-align: ${props => {
    if (props.center) {
      return 'center'
    }
    if (props.justify) {
      return 'justify'
    }

    if (props.left) {
      return 'left'
    }

    if (props.right) {
      return 'right'
    }

    return 'left'
  }};
`
