import React from 'react'
import { Input } from '../../../common/atoms/Input/Input'

type Props = {
  searchedTerm: string
  onChange: (string) => void
}

export const SearchForm = ({searchedTerm, onChange}: Props) => (
  <div>
    <Input placeholder={'Search'} value={searchedTerm} name="searchedTerm" onChange={(data) => {onChange(data.searchedTerm)}} />
  </div>
)
