import { useMutation, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import React from 'react'
import { Link } from 'react-router-dom'
import { FlashMessageType, showFlashMessage } from '../../../common/atoms/FlashMessage/FlashMessage'
import { ColumnTypes, DataTable } from '../../organism/DataTable/DataTable'

const QUERY = gql`
  {
    guides {
      id
      name
      published
    }
  }
`

const DELETE_MUTATION = gql`
  mutation($id: String!) {
    deleteGuide(id: $id)
  }
`

export const AllGuides = () => {
  const { loading, error, data } = useQuery(QUERY)
  const [deleteGuide] = useMutation(DELETE_MUTATION)

  if (loading) {
    return <div>Loading</div>
  }

  if (error) {
    return <div>Error</div>
  }

  return (
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
        items={data.guides}
        rowActions={item => [
          {
            label: 'Edit',
            link: `/guides/edit/${item.id}`,
          },
          {
            label: 'Routes',
            link: `/routes/${item.id}`,
          },
          {
            label: 'Delete',
            action: (item) => {
              console.log('Deleting guide' + item.id)
              showFlashMessage('Guide ' + item.name + ' successfully removed', FlashMessageType.SUCCESS)
              deleteGuide({
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
