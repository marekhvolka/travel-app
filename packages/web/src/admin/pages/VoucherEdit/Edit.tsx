import { useQuery } from '@apollo/react-hooks'
import React from 'react'
import gql from 'graphql-tag'
import { VoucherForm } from '../../organism/VoucherForm/VoucherForm'
import { EditViewProps, makeEditView } from '../../organism/EditView/makeEditView'
import { Button } from '../../../common/atoms/Button/Button'

const GUIDES_QUERY = gql`
  {
    guides {
      id
      name
    }
  } 
`

const Edit = ({ model, modelChanged, handleSubmit }: EditViewProps) => {
  const { error, loading, data } = useQuery(GUIDES_QUERY)

  if (error || loading) {
    return <></>
  }

  return (
    <div>
      <h1>
        {model.id ? `Edit voucher ${model.code}` : 'Add voucher'}
        <Button float={'right'} onClick={handleSubmit}>Save</Button>
      </h1>
      <VoucherForm modelChanged={modelChanged} model={model} guides={data.guides} />
    </div>
  )
}

const CREATE_NEW_OBJECT_QUERY = gql`
  {
    returnNewVoucher
  }
`

const FETCH_QUERY = gql`
  query fetch($id: String!) {
    fetchVoucher(id: $id) {
      id
      code
      price
      description
      guideId
      partnerId
      maxUsageCount
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
  queryNewObject: CREATE_NEW_OBJECT_QUERY,
  queryNewObjectName: 'returnNewVoucher',
  mutation: UPDATE_MUTATION,
  mutationName: 'updateVoucher',
  slug: 'vouchers',
})
