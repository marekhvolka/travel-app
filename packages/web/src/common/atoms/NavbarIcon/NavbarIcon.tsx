import React from 'react'
import FaBars from 'react-icons/lib/fa/bars'
import FaMap from 'react-icons/lib/fa/map'
import FaSearch from 'react-icons/lib/fa/search'
import styled from 'styled-components'

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
  const NavbarIcon = styled(map[type])`
    margin: 10px;
    font-size: 35px;
    cursor: pointer;
    color: ${(props: Props) => (props.isActive ? '#ee5' : '#fff')};
  `

  return <NavbarIcon isActive={isActive} onClick={onClick} />
}
