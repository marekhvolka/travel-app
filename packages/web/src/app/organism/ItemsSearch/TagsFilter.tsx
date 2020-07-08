import React  from 'react'

type Props = {
  tags: any[]
}

export const TagsFilter = ({ tags }: Props) => (
  <>
    {tags.map(tag => (
      <div key={tag._id}>{tag.name}</div>
    ))}
  </>
)
