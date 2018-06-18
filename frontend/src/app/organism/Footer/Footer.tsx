import React from 'react'
import styled from 'styled-components'

const FooterWrapper = styled.div`
  grid-area: footer;

  @include mobile {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
  }
`

export const Footer = () => (
  <div className={'border-top'}>
    <FooterWrapper className={'footer text-center p-3'}>
      <p className={'mb-0'}>
        &copy; 2018 Marco&apos;sGuide.com All rights reserved
      </p>
    </FooterWrapper>
  </div>
)
