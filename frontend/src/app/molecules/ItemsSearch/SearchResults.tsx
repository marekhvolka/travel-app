import React from 'react'
import { ItemsList } from '../../organism/ItemsList/ItemsList'

type Props = {
  results: any[]
}

export const SearchResults = ({ results }: Props) => (
  <div>
    <ItemsList items={results} onRelatedItemClicked={() => {}} />
  </div>
)
