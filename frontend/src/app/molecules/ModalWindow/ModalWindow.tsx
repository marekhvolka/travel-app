import React from 'react'
import styled from 'styled-components'

const ModalWindowWrapper = styled.div`
  height: 100%;
  overflow: scroll;
`

/* eslint react/display-name: 0 */
export const makeModal = WrappedComponent => props => (
  <ModalWindowWrapper>
    <WrappedComponent {...props} />
  </ModalWindowWrapper>
)
