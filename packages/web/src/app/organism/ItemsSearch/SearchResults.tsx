import React from 'react'
import styled from 'styled-components'
import { Item } from '@md/common'
import { ItemCard } from '../../molecules/ItemCard/ItemCard'

type Props = {
  results: Item[]
  onItemCardClicked: (string) => void
}

const Wrapper = styled.div`
  overflow-y: scroll;
  height: 85vh;
`

const ItemWrapper = styled.div`
  background-color: #fff;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #efefef;
  border-radius: 5px;
`

export const SearchResults = ({ onItemCardClicked, results }: Props) => (
  <Wrapper>
    {results.map(relatedItem => (
      <ItemWrapper key={relatedItem._id} onClick={() => {onItemCardClicked(relatedItem._id)}}>
        <ItemCard item={relatedItem}/>
      </ItemWrapper>
    ))}
  </Wrapper>
)
