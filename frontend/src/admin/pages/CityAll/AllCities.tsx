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
      List of all cities
      <Link className={'float-right'} to={'/cities/edit'}>
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
          name: 'published',
          label: 'Published',
          type: ColumnTypes.BOOLEAN,
        },
      ]}
      items={items}
      rowActions={item => [
        {
          label: 'Edit',
          link: `/cities/edit/${item.id}`,
        },
      ]}
    />
  </div>
)

const QUERY = gql`
  {
    cities {
      id
      name
    }
  }
`

export const AllCities = makeListView(Component, {
  queryName: 'cities',
  query: QUERY,
})
