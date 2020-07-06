import { useQuery } from '@apollo/react-hooks'
import React from 'react'
import gql from 'graphql-tag'
import { Field } from 'formik'
import { Input } from '../../../common/atoms/Input/Input'
import { Select } from '../../../common/atoms/Select/Select'
import { TextArea } from '../../../common/atoms/TextArea/TextArea'
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

const Edit = ({ model }: EditViewProps) => {
  const { error, loading, data } = useQuery(GUIDES_QUERY)

  if (error || loading) {
    return <></>
  }

  return (
    <div>
      <h1>
        {model.id ? `Edit voucher ${model.code}` : 'Add voucher'}
        <Button type="submit" float={'right'} >Save</Button>
      </h1>
      <Field
        name="code"
        label="Voucher code"
        component={Input}
      />
      <Field
        name="price"
        type="number"
        label="Voucher price"
        component={Input}
      />
      <Field
        name="maxUsageCount"
        type="number"
        label="Maximum number of usage"
        component={Input}
      />
      <Field
        name="description"
        label="Description"
        component={TextArea}
      />
      <Field
        label="Guide"
        name="guideId"
        options={data.guides}
        component={Select}
      />
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

const validate = values => {
  const errors: any = {};
  if (!values.code) {
    errors.code = 'Required';
  }

  return errors;
};

export default makeEditView(Edit, {
  query: FETCH_QUERY,
  queryName: 'fetchVoucher',
  queryNewObject: CREATE_NEW_OBJECT_QUERY,
  queryNewObjectName: 'returnNewVoucher',
  mutation: UPDATE_MUTATION,
  mutationName: 'updateVoucher',
  slug: 'vouchers',
  validate
})
