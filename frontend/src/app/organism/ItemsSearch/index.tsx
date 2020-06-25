import React, { useCallback, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Guide } from '../../../models/Guide'
import { Item } from '../../../models/Item'
import { Tag } from '../../../models/Tag'
import { MapSelectItemAction } from '../../../store'
import { SearchForm } from './SearchForm'
import { SearchResults } from './SearchResults'


type Props = {
  guide: Guide
  tags: Tag[]
}

export const ItemsSearch = React.memo(({ guide, tags }: Props) => {
  const [searchedTerm, setSearchedTerm] = useState('')
  const dispatch = useDispatch()

  const filteredItems = useMemo(() => {
    if (searchedTerm === '') {
      return guide.items
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
  }, [guide.items, searchedTerm])

  const onSearchedTermChanged = useCallback((value: string) => {
    setSearchedTerm(value)
  }, [setSearchedTerm])

  const onItemCardClicked = useCallback((itemId: string) => {
    dispatch({...new MapSelectItemAction(guide.id, itemId)})
  }, [guide, dispatch])

  return (
    <>
      <SearchForm
        searchedTerm={searchedTerm}
        tags={tags}
        onChange={onSearchedTermChanged}
      />
      <SearchResults
        results={filteredItems}
        onItemCardClicked={onItemCardClicked}
      />
    </>
  )
})
