import { Dropdown, Menu } from 'antd'
import React from 'react'
import FaBars from 'react-icons/lib/fa/bars'
import FaRegDotCircle from 'react-icons/lib/fa/circle'
import FaSearch from 'react-icons/lib/fa/search'
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

const LocateMeIcon = styled(FaRegDotCircle)`
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
    <Menu.Divider/>
    <Menu.Item key="3">Logout</Menu.Item>
  </Menu>
)
type Props = {
  onSearchClick: () => void
  onLocateMe: (latitude: number, longitude: number) => void
}

export const Navbar = ({ onLocateMe, onSearchClick }: Props) => {

  const handleLocateMe = () => {
    if ('geolocation' in navigator) {
      console.log('Available')

      navigator.geolocation.getCurrentPosition((position) => {

        console.log('Latitude is :', position.coords.latitude)
        console.log('Longitude is :', position.coords.longitude)

        onLocateMe(position.coords.latitude, position.coords.longitude)
      })

    } else {
      console.log('Not Available')
    }
  }

  return (
    <NavbarWrapper>
      <LogoWrapper>TravelApp</LogoWrapper>
      <SearchIcon onClick={onSearchClick}/>
      <LocateMeIcon onClick={handleLocateMe}/>
      <Dropdown overlay={dropdownMenu} trigger={['click']}>
        <MenuIcon/>
      </Dropdown>
    </NavbarWrapper>
  )
}
