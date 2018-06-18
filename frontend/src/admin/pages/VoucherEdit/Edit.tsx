import React from 'react'
import gql from 'graphql-tag'
import { VoucherForm } from '../../organism/VoucherForm/VoucherForm'
import { makeEditView } from '../../organism/EditView/makeEditView'
import { Button } from '../../../common/atoms/Button/Button'

const Edit = ({ model, modelChanged, handleSubmit }) => (
  <div>
    <h1>
      {model.id ? `Edit voucher ${model.code}` : 'Add voucher'}
      <Button onClick={handleSubmit}>Save</Button>
    </h1>
    <VoucherForm modelChanged={modelChanged} model={model} />
  </div>
)

const FETCH_QUERY = gql`
  query fetch($id: String!) {
    fetchVoucher(id: $id) {
      id
      code
      price
      description
    }
  }
`

const UPDATE_MUTATION = gql`
  mutation($data: VoucherInput!) {
    updateVoucher(data: $data) {
      id
    }
  }
`

export default makeEditView(Edit, {
  query: FETCH_QUERY,
  queryName: 'fetchVoucher',
  mutation: UPDATE_MUTATION,
  mutationName: 'updateVoucher',
  slug: 'vouchers',
})
