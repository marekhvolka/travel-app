import React from 'react'
import styled from 'styled-components'

const FooterWrapper = styled.div`
  border-top: 1px solid;
  border-color: ${props => props.theme.border.color};
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  background: #fff;
  z-index: 1000;
  text-align: center
  padding-top: 15px;
`

export const Footer = () => (
  <FooterWrapper>
    <p>&copy; 2020 Marco&apos;sGuide.com All rights reserved</p>
  </FooterWrapper>
)
