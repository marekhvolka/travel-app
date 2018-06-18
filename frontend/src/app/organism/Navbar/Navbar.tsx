import React from 'react'
import Link from 'react-router-dom/Link'
import styled from 'styled-components'
import UserAuthentication from '../../../common/organism/UserAuthentication/UserAuthentication'

const NavbarContainer = styled.div`
  height: 50px;
  width: 100%;
  padding: 12px 0;
  border-bottom: 1px solid;
  border-color: ${props => props.theme.border.color};
  margin-bottom: 1.5rem !important;

  @include mobile {
    height: 30px;
    padding: 5px 0;
  }

  .link {
    padding: 0 10px;
  }
`

export const Navbar = () => (
  <NavbarContainer>
    <div className="nav-bar container">
      <Link className="link" to={'/'}>
        Home
      </Link>
      <div className={'float-right'}>
        <UserAuthentication />
      </div>
    </div>
  </NavbarContainer>
)
