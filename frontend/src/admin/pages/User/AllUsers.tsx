import React from 'react'
import Link from 'react-router-dom/Link'
import gql from 'graphql-tag'
import { makeListView } from '../../organism/DataTable/makeListView'
import { DataTable } from '../../organism/DataTable/DataTable'

type Props = {
  items: any[]
}

const Component = ({ items }: Props) => (
  <div>
    <h1>
      List of all users
      <Link className={'float-right'} to={'/users/edit'}>+</Link>
    </h1>
    <DataTable
      fields={[
        {
          name: 'email',
          label: 'Email',
        },
        {
          name: 'role',
          label: 'Role',
        },
      ]}
      items={items}
      rowActions={user => [
        {
          label: 'Edit',
          link: `/users/edit/${user.id}`,
        },
        user.role === 'player'
          ? {
              label: 'Progress',
              link: `/users/progress/${user.id}`,
            }
          : null,
      ]}
    />
  </div>
)

const QUERY = gql`
  {
    users {
      id
      email
      role
    }
  }
`

export const AllUsers = makeListView(Component, {
  queryName: 'users',
  query: QUERY,
})
