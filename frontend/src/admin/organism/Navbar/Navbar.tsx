import React from 'react'
import Link from 'react-router-dom/Link'
import FaUser from 'react-icons/lib/fa/user'
import FaImage from 'react-icons/lib/fa/image'
import styled from 'styled-components'
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
      label: 'Tags',
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
        <NavbarItem className={'float-right'}>
          <UserAuthentication />
        </NavbarItem>
      </ul>
    </div>
  )
}
