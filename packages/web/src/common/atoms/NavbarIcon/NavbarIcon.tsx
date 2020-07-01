import React from 'react'
import styled from 'styled-components'
import FaMap from 'react-icons/lib/fa/map'
import FaBars from 'react-icons/lib/fa/bars'
import FaSearch from 'react-icons/lib/fa/search'

export enum NavbarIconTypes {
  MAP = 0,
  SEARCH = 3,
  ITEMS_LIST = 4,
}

type Props = {
  isActive: boolean
  onClick: any
  type: number
}

export const NavbarIcon = ({ type, isActive, onClick }: Props) => {
  const map = {
    [NavbarIconTypes.MAP]: FaMap,
    [NavbarIconTypes.SEARCH]: FaSearch,
    [NavbarIconTypes.ITEMS_LIST]: FaBars,
  }
  const NavbarIcon = styled(map[type])<Props>`
    margin: 10px;
    font-size: 35px;
    cursor: pointer;
    color: ${props => (props.isActive ? '#ee5' : '#fff')};
  `

  return <NavbarIcon isActive={isActive} onClick={onClick} />
}
