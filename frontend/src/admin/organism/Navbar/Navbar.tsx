import React from 'react'
import { Link } from 'react-router-dom'
import FaUser from 'react-icons/lib/fa/user'
import FaImage from 'react-icons/lib/fa/image'
import FaTags from 'react-icons/lib/fa/tags'
import styled from 'styled-components'
import { Container } from '../../../common/atoms/Container/Container'
import { UserAuthentication } from '../../../common/organism/UserAuthentication/UserAuthentication'

const NavbarItem = styled.li`
  border-right: 1px solid #e7e7e7;
  display: inline;

  a {
    padding: 10px 15px;
  }
`

export const Navbar = () => {
  const links = [
    {
      slug: '/guides',
      label: 'Guides',
    },
    {
      slug: '/items',
      label: 'Items',
    },
    {
      slug: '/tags',
      label: <FaTags />,
    },
    {
      slug: '/cities',
      label: 'Cities',
    },
    {
      slug: '/users',
      label: <FaUser />,
    },
    {
      slug: '/vouchers',
      label: 'Vouchers',
    },
    {
      slug: '/gallery',
      label: <FaImage />,
    },
  ]
  return (
    <div
      style={{
        gridArea: 'navbar',
        backgroundColor: '#F6F6F6',
        borderBottom: '1px solid #e7e7e7',
        minHeight: '50px',
      }}
    >
      <Container withoutPadding>
        <ul
          style={{
            listStyle: 'none',
            paddingLeft: '0px',
            lineHeight: '50px',
            marginBottom: '0px',
          }}
        >
          {links.map(link => (
            <NavbarItem key={link.slug}>
              <Link to={link.slug}>{link.label}</Link>
            </NavbarItem>
          ))}
          <NavbarItem style={{float: 'right'}}>
            <UserAuthentication />
          </NavbarItem>
        </ul>
      </Container>
    </div>
  )
}
