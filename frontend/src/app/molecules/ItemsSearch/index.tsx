import React from 'react'
import { makeModal } from '../ModalWindow/ModalWindow'
import { SearchForm } from './SearchForm'
import { SearchResults } from './SearchResults'

type Props = {
  items: any[]
}

const ItemsSearch = ({ items }: Props) => (
  <div>
    <h3>Search for specific items</h3>
    <SearchForm />
    <SearchResults results={items} />
  </div>
)

export default makeModal(ItemsSearch)
