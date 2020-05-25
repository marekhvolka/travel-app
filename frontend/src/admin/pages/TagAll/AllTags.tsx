import { useMutation, useQuery } from '@apollo/react-hooks'
import React from 'react'
import { Link } from 'react-router-dom'
import gql from 'graphql-tag'
import { FlashMessageType, showFlashMessage } from '../../../common/atoms/FlashMessage/FlashMessage'
import { DataTable, ColumnTypes } from '../../organism/DataTable/DataTable'

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

const DELETE_MUTATION = gql`
  mutation($id: String!) {
    deleteTag(id: $id)
  }
`

export const AllTags = () => {
  const { loading, error, data } = useQuery(QUERY)
  const [deleteTag] = useMutation(DELETE_MUTATION)

  if (loading) {
    return <div>Loading</div>
  }

  if (error) {
    return <div>Error</div>
  }

  return (
    <div>
      <h1>
        List of all tags
        <Link style={{ float: 'right' }} to={'/tags/edit'}>
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
        items={data.tags}
        rowActions={item => [
          {
            label: 'Edit',
            link: `/tags/edit/${item.id}`,
          },
          {
            label: 'Delete',
            action: (item) => {
              console.log('Deleting tag' + item.id)
              showFlashMessage('Tag ' + item.name + ' successfully removed', FlashMessageType.SUCCESS)
              deleteTag({
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
