import React, { Fragment } from 'react'

type Props = {
  tags: any[]
}

export const TagsFilter = ({ tags }: Props) => (
  <Fragment>
    {tags.map(tag => (
      <div key={tag.id}>{tag.name}</div>
    ))}
  </Fragment>
)
