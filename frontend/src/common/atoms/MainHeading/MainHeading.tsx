import styled from 'styled-components'

type Props = {
  center?: boolean
  justify?: boolean
  left?: boolean
  right?: boolean
}

export const MainHeading = styled.h1<Props>`
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
