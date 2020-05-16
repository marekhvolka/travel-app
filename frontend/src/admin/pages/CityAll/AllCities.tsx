import { useMutation, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import React from 'react'
import { Link } from 'react-router-dom'
import { FlashMessageType, showFlashMessage } from '../../../common/atoms/FlashMessage/FlashMessage'
import { ColumnTypes, DataTable } from '../../organism/DataTable/DataTable'

const QUERY = gql`
  {
    cities {
      id
      name
    }
  }
`

const DELETE_MUTATION = gql`
  mutation($id: String!) {
    deleteCity(id: $id)
  }
`

export const AllCities = () => {
  const { loading, error, data } = useQuery(QUERY)
  const [deleteCity] = useMutation(DELETE_MUTATION)

  if (loading) {
    return <div>Loading</div>
  }

  if (error) {
    return <div>Error</div>
  }

  return (
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
        items={data.cities}
        rowActions={item => [
          {
            label: 'Edit',
            link: `/cities/edit/${item.id}`,
          },
          {
            label: 'Delete',
            action: (item) => {
              console.log('Deleting item' + item.id)
              showFlashMessage('City ' + item.name + ' successfully removed', FlashMessageType.SUCCESS)
              deleteCity({
                variables: {
                  id: item.id
                }
              })
            }
          }
        ]}
      />
    </div>
  )
}
