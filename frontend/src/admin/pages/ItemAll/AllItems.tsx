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
      List of all items
      <Link className={'float-right'} to={'/items/edit'}>
        +
      </Link>
    </h1>
    <DataTable
      fields={[
        {
          name: 'name',
          label: 'Name',
        },
        {
          name: 'type',
          label: 'Type',
        },
        {
          label: 'Thumbnail',
          name: 'previewImageUrl',
          type: ColumnTypes.IMAGE,
        },
        {
          name: 'title',
          label: 'Title',
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
          link: `/items/edit/${item.id}`,
        },
      ]}
    />
  </div>
)

const QUERY = gql`
  {
    items {
      id
      name
      type
      title
      previewImageUrl
      published
    }
  }
`

export const AllItems = makeListView(Component, {
  queryName: 'items',
  query: QUERY,
})
