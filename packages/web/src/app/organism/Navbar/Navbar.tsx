import React from 'react'
import FaSearch from 'react-icons/lib/fa/search'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Container } from '../../../common/atoms/Container/Container'
import { UserAuthentication } from '../../../common/organism/UserAuthentication/UserAuthentication'
import { ToggleSearchAction } from '../../../store'

const NavbarContainer = styled.div`
  height: 50px;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: 1000;
  background: #fff;
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

export const Navbar = () => {
  const location = useLocation()
  const dispatch = useDispatch()

  return (
    <NavbarContainer>
      <Container withoutPadding>
        <Link className="link" to={'/'}>
          Home
        </Link>
        {location.pathname.indexOf('explore') !== -1 && (
          <FaSearch onClick={() => dispatch({...new ToggleSearchAction('5b68778f241fbfa1bdbf2a73')})}/>
        )}
        <div style={{ float: 'right' }}>
          <UserAuthentication/>
        </div>
      </Container>
    </NavbarContainer>
  )
}
