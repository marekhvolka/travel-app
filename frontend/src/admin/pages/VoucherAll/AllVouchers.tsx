import React from 'react'
import Link from 'react-router-dom/Link'
import gql from 'graphql-tag'
import { makeListView } from '../../organism/DataTable/makeListView'
import { DataTable } from '../../organism/DataTable/DataTable'
import { MainHeading } from '../../../common/atoms/MainHeading/MainHeading'

type Props = {
  items: any[]
}

const Component = ({ items }: Props) => (
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
      items={items}
      rowActions={item => [
        {
          label: 'Edit',
          link: `/vouchers/edit/${item.id}`,
        },
      ]}
    />
  </div>
)

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

export const AllVouchers = makeListView(Component, {
  queryName: 'vouchers',
  query: QUERY,
})
