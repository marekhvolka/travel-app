import { useMutation, useQuery } from '@apollo/react-hooks'
import React from 'react'
import Link from 'react-router-dom/Link'
import gql from 'graphql-tag'
import { FlashMessageType, showFlashMessage } from '../../../common/atoms/FlashMessage/FlashMessage'
import { DataTable } from '../../organism/DataTable/DataTable'
import { MainHeading } from '../../../common/atoms/MainHeading/MainHeading'

const QUERY = gql`
  {
    vouchers {
      id
      code
      price
      description
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
            name: 'description',
            label: 'Description',
          },
        ]}
        items={data.vouchers}
        rowActions={item => [
          {
            label: 'Edit',
            link: `/vouchers/edit/${item.id}`,
          },
          {
            label: 'Delete',
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
