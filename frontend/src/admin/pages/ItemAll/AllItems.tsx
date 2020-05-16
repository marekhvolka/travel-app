import { useMutation, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import React from 'react'
import { Link } from 'react-router-dom'
import { FlashMessageType, showFlashMessage } from '../../../common/atoms/FlashMessage/FlashMessage'
import { ColumnTypes, DataTable } from '../../organism/DataTable/DataTable'

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

const DELETE_MUTATION = gql`
  mutation($id: String!) {
    deleteItem(id: $id)
  }
`

export const AllItems = () => {
  const { loading, error, data } = useQuery(QUERY)
  const [deleteItem] = useMutation(DELETE_MUTATION)

  if (loading) {
    return <div>Loading</div>
  }

  if (error) {
    return <div>Error</div>
  }

  return (
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
        items={data.items}
        rowActions={item => [
          {
            label: 'Edit',
            link: `/items/edit/${item.id}`,
          },
          {
            label: 'Delete',
            action: (item) => {
              console.log('Deleting item' + item.id)
              showFlashMessage('Item ' + item.name + ' successfully removed', FlashMessageType.SUCCESS)
              deleteItem({
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
