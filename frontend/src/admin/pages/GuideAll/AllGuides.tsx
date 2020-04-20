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
      List of all guides
      <Link className={'float-right'} to={'/guides/edit'}>
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
          name: 'description',
          label: 'Description',
          type: ColumnTypes.HTML,
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
          link: `/guides/edit/${item.id}`,
        },
        {
          label: 'Routes',
          link: `/routes/${item.id}`,
        },
      ]}
    />
  </div>
)

const QUERY = gql`
  {
    guides {
      id
      name
      published
    }
  }
`

export const AllGuides = makeListView(Component, {
  queryName: 'guides',
  query: QUERY,
})
