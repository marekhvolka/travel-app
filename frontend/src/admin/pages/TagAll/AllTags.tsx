import React from 'react'
import Link from 'react-router-dom/Link'
import gql from 'graphql-tag'
import { makeListView } from '../../organism/DataTable/makeListView'
import { DataTable, ColumnTypes } from '../../organism/DataTable/DataTable'

type Props = {
  items: any[]
}

const Component = ({ items }: Props) => (
  <div>
    <h1>
      List of all tags
      <Link className={'float-right'} to={'/tags/edit'}>+</Link>
    </h1>
    <DataTable
      fields={[
        {
          name: 'name',
          label: 'Name',
        },
        {
          name: 'description',
          label: 'Description',
        },
        {
          name: 'color',
          label: 'Color',
        },
        {
          name: 'icon',
          label: 'Icon',
        },
        {
          name: 'published',
          label: 'Published',
          type: ColumnTypes.BOOLEAN,
        },
      ]}
      items={items}
      rowActions={item => [
        {
          label: 'Edit',
          link: `/tags/edit/${item.id}`,
        },
      ]}
    />
  </div>
)

const QUERY = gql`
  {
    tags {
      id
      name
      description
      published
      color
      icon
    }
  }
`

export const AllTags = makeListView(Component, {
  queryName: 'tags',
  query: QUERY,
})
