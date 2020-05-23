import { useMutation, useQuery } from '@apollo/react-hooks'
import React from 'react'
import { Link } from 'react-router-dom'
import gql from 'graphql-tag'
import { FlashMessageType, showFlashMessage } from '../../../common/atoms/FlashMessage/FlashMessage'
import { DataTable } from '../../organism/DataTable/DataTable'
import { MainHeading } from '../../../common/atoms/MainHeading/MainHeading'
import FaPencil from 'react-icons/lib/fa/pencil'
import FaTrash from 'react-icons/lib/fa/trash'


const QUERY = gql`
  {
    vouchers {
      id
      code
      price
      description
      guide {
        name
      }
    }
  }
`

const DELETE_MUTATION = gql`
  mutation($id: String!) {
    deleteVoucher(id: $id)
  }
`

export const AllVouchers = () => {
  const { loading, error, data } = useQuery(QUERY)
  const [deleteVoucher] = useMutation(DELETE_MUTATION)

  if (loading) {
    return <div>Loading</div>
  }

  if (error) {
    return <div>Error</div>
  }

  return (
    <div>
      <MainHeading>
        List of all vouchers
        <Link className={'float-right'} to={'/vouchers/edit'}>
          +
        </Link>
      </MainHeading>
      <DataTable
        fields={[
          {
            name: 'code',
            label: 'Code',
          },
          {
            name: 'price',
            label: 'Price',
          },
          {
            name: 'guide.name',
            label: 'Guide'
          },
          {
            name: 'description',
            label: 'Description',
          },
        ]}
        items={data.vouchers}
        rowActions={item => [
          {
            label: <FaPencil />,
            link: `/vouchers/edit/${item.id}`,
          },
          {
            label: <FaTrash />,
            action: (item) => {
              console.log('Deleting voucher' + item.id)
              showFlashMessage('Voucher ' + item.code + ' successfully removed', FlashMessageType.SUCCESS)
              deleteVoucher({
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
