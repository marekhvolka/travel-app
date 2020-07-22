import React from 'react'
import { useLocation } from 'react-router'
import styled from 'styled-components'

const FooterWrapper = styled.div`
  border-top: 1px solid;
  border-color: ${props => props.theme.border.color};
  background: #fff;
  z-index: -1;
  text-align: center;
  padding-top: 15px;
`

export const Footer = () => {
  const location = useLocation()

  return (
    <>
      {location.pathname.indexOf('explore') === -1 && (
        <FooterWrapper>
          <p>&copy; 2020 TravelApp.com All rights reserved</p>
        </FooterWrapper>
      )}
    </>
  )
}
