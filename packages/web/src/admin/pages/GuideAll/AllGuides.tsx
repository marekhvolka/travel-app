import { useMutation, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import React from 'react'
import { Link } from 'react-router-dom'
import { FlashMessageType, showFlashMessage } from '../../../common/atoms/FlashMessage/FlashMessage'
import { ColumnTypes, DataTable } from '../../organism/DataTable/DataTable'
import { getGuideUrl } from '../../urlMaker'

const QUERY = gql`
  {
    guides {
      _id
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
        <Link style={{ float: 'right' }} to={'/guides/edit'}>
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
            link: getGuideUrl(item._id),
          },
          {
            label: 'Routes',
            link: `/routes/${item._id}`,
          },
          {
            label: 'Delete',
            action: (item) => {
              console.log('Deleting guide' + item._id)
              showFlashMessage('Guide ' + item.name + ' successfully removed', FlashMessageType.SUCCESS)
              deleteGuide({
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
