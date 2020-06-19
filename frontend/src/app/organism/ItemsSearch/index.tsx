import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Guide } from '../../../models/Guide'
import { Item } from '../../../models/Item'
import { MapSelectItemAction } from '../../../store'
import { SearchForm } from './SearchForm'
import { SearchResults } from './SearchResults'


type Props = {
  guide: Guide
}

export const ItemsSearch = ({ guide }: Props) => {
  const [searchedTerm, setSearchedTerm] = useState('')
  const dispatch = useDispatch()

  const filteredItems = useMemo(() => {
    if (searchedTerm === '') {
      return []
    }

    return guide.items.filter((item: Item) => {
      if (item.name.toLowerCase().indexOf(searchedTerm.toLowerCase()) !== -1) {
        return true
      }

      if (item.title.toLowerCase().indexOf(searchedTerm.toLowerCase()) !== -1) {
        return true
      }

      if (item.description.toLowerCase().indexOf(searchedTerm.toLowerCase()) !== -1) {
        return true
      }

      return false
    })
  }, [searchedTerm])

  return (
    <>
      <SearchForm searchedTerm={searchedTerm} onChange={(value) => setSearchedTerm(value)}/>
      <SearchResults results={filteredItems} onItemCardClicked={(clickedItemId) => dispatch({...new MapSelectItemAction(guide.id, clickedItemId)})}/>
    </>
  )
}
