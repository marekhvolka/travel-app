import { Tag } from '@md/common'
import { Input, Select } from 'antd'
import React, { useState } from 'react'
import FaSlidersH from 'react-icons/lib/fa/sliders'
import styled from 'styled-components'

const FilterButton = styled(FaSlidersH)`
  font-size: 25px;
  margin-top: 3px;
  margin-left: 10px;
  
  :hover {
    color: #000;
  }
`

const TagsFilterWrapper = styled.div`
  margin-top: 10px;
`

type Props = {
  tags: Tag[]
  searchedTerm: string
  onChange: (string) => void
}

export const SearchForm = ({ tags, searchedTerm, onChange }: Props) => {
  const [selectedTags, setSelectedTags] = useState([])
  const [isTagsFilterVisible, setIsTagsFilterVisible] = useState(false)

  return (
    <div style={{ marginBottom: '10px' }}>
      <div style={{ display: 'flex' }}>
        <div style={{ flexGrow: 1 }}>
          <Input
            placeholder={'Search'}
            value={searchedTerm}
            onChange={(event) => onChange(event.target.value)}
          />
        </div>
        <FilterButton onClick={() => setIsTagsFilterVisible(!isTagsFilterVisible)}/>
      </div>
      {isTagsFilterVisible && (
        <TagsFilterWrapper>
          <h4>Filter items with selected tags</h4>
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="Please select tags"
            onChange={setSelectedTags}
            value={selectedTags}
          >
            {tags.map((tag: Tag) => (
              <Select.Option
                key={tag._id}
              >
                {tag.name}
              </Select.Option>
            ))}
          </Select>
        </TagsFilterWrapper>
      )}
    </div>
  )
}
