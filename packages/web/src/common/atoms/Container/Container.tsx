import styled, { css } from 'styled-components'

type ContainerProps = {
  withoutPadding?: boolean
}

export const Container = styled.div`
  margin: auto;
  ${(props: ContainerProps) => !props.withoutPadding && css`
    padding: 20px;
  `}
  
  @media (min-width: 768px) {
    width:750px;
  }

  @media (min-width: 992px) {
    width:970px;
  }

  @media (min-width: 1200px) {
    width:1170px; 
  }
`
