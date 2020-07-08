import { useMutation, useQuery } from '@apollo/react-hooks'
import { Tag } from '@md/common'
import gql from 'graphql-tag'
import React from 'react'
import FaPencil from 'react-icons/lib/fa/pencil'
import FaTrash from 'react-icons/lib/fa/trash'
import { Link } from 'react-router-dom'
import { FlashMessageType, showFlashMessage } from '../../../common/atoms/FlashMessage/FlashMessage'
import { ColumnTypes, DataTable } from '../../organism/DataTable/DataTable'
import { getTagUrl } from '../../urlMaker'

const QUERY = gql`
  {
    tags {
      _id
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
            label: <FaPencil/>,
            link: getTagUrl(item._id),
          },
          {
            label: <FaTrash/>,
            action: (item: Tag) => {
              console.log('Deleting tag' + item._id)
              showFlashMessage('Tag ' + item.name + ' successfully removed', FlashMessageType.SUCCESS)
              deleteTag({
                variables: {
                  id: item._id
                }
              })
            }
          }
        ]}
      />
    </div>
  )
}
