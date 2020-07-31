import React from 'react'
import { Dropdown, Menu } from 'antd'
import FaSearch from 'react-icons/lib/fa/search'
import FaBars from 'react-icons/lib/fa/bars'
import styled from 'styled-components'

const LogoWrapper = styled.span`
  font-weight: bold;
  padding-right: 10px;
  font-size: 30px;
  color: #751818;
`

const SearchIcon = styled(FaSearch)`
  font-size: 30px;
  margin: 10px 10px 0;
  vertical-align: top !important;
`

const MenuIcon = styled(FaBars)`
  font-size: 30px;
  margin: 10px;
  float: right;
`

const NavbarWrapper = styled.div`
  
`

const dropdownMenu = (
  <Menu>
    <Menu.Item key="0">
      Profile
    </Menu.Item>
    <Menu.Item key="1">
      My favourites
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3">Logout</Menu.Item>
  </Menu>
)
type Props = {
  onSearchClick: () => void
}

export const Navbar = ({ onSearchClick }: Props) => (
  <NavbarWrapper>
    <LogoWrapper>TravelApp</LogoWrapper>
    <SearchIcon onClick={onSearchClick}/>
    <Dropdown overlay={dropdownMenu} trigger={['click']}>
      <MenuIcon/>
    </Dropdown>
  </NavbarWrapper>
)
