import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import React from 'react'
import Link from 'react-router-dom/Link'
import { DataTable } from '../../organism/DataTable/DataTable'

const QUERY = gql`
  {
    users {
      id
      email
      role
    }
  }
`

export const AllUsers = () => {
  const { loading, error, data } = useQuery(QUERY)

  if (loading) {
    return <div>Loading</div>
  }

  if (error) {
    return <div>Error</div>
  }

  return (
    <div>
      <h1>
        List of all users
        <Link className={'float-right'} to={'/users/edit'}>
          +
        </Link>
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
        items={data.users}
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
}
