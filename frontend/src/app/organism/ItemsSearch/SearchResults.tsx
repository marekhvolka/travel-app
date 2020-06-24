import React from 'react'
import styled from 'styled-components'
import { Item } from '../../../models/Item'
import { ItemCard } from '../../molecules/ItemCard/ItemCard'

type Props = {
  results: Item[]
  onItemCardClicked: (string) => void
}

const Wrapper = styled.div`
  overflow-y: scroll
  height: á5vh
`

const ItemWrapper = styled.div`
  background-color: #fff
  padding: 10px
  margin-bottom: 10px
  border: 1px solid #efefef
  border-radius: 5px
`

export const SearchResults = ({ onItemCardClicked, results }: Props) => (
  <Wrapper>
    {results.map(relatedItem => (
      <ItemWrapper key={relatedItem.id} onClick={() => {onItemCardClicked(relatedItem.id)}}>
        <ItemCard item={relatedItem}/>
      </ItemWrapper>
    ))}
  </Wrapper>
)