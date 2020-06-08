import { useLazyQuery } from '@apollo/react-hooks'
import { Input } from 'antd'
import gql from 'graphql-tag'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { getUrl } from '../../urlMaker'

const GET_SEARCH_RESULTS = gql`
  query($searchTerm: String!) {
    search(searchTerm: $searchTerm) {
      id
      name
      type
    }
  }
`

const MainWrapper = styled.div`
  display: inline-block
  margin-left: 20px
  width: 250px
`

const ListWrapper = styled.ul`
  position: absolute
  z-index: 1000
  background: #fff
  border: 1px solid #ddd
  padding: 10px 20px
  list-style: none
  line-height: 35px
`

export const GlobalSearch = () => {
  const [searchTerm, setSearchedTerm] = useState('')
  const [loadSearchResults, { loading, data }] = useLazyQuery(
    GET_SEARCH_RESULTS,
    { variables: { searchTerm } }
  );

  const onSearch = (value: string) => {
    setSearchedTerm(value)
    loadSearchResults()
  }

  return (
    <MainWrapper>
      <Input
        type="text"
        value={searchTerm}
        placeholder={'Type to search'}
        onChange={event =>
          onSearch(event.target.value)
        }
      />
      {searchTerm !== '' && !loading && data && data.search.length !== 0 && (
        <ListWrapper>
          {data.search && data.search.map((item) => (
            <li><Link onClick={() => setSearchedTerm('')} to={getUrl(item.id, item.type)}>{item.name}</Link></li>
          ))}
        </ListWrapper>
      )}
    </MainWrapper>
  )
}
