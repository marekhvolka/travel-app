import { Field } from 'formik'
import React from 'react'
import gql from 'graphql-tag'
import { Button } from '../../../common/atoms/Button/Button'
import { Input } from '../../../common/atoms/Input/Input'
import { EditViewProps, makeEditView } from '../../organism/EditView/makeEditView'

const Edit = ({ model }: EditViewProps) => (
  <div>
    <h1>
      {model.id ? `Edit city ${model.name}` : 'Add city'}
      <Button type="submit" float={'right'}>Save</Button>
    </h1>
    <Field
      name="name"
      label="City name"
      component={Input}
    />
  </div>
)

const CREATE_NEW_OBJECT_QUERY = gql`
  {
    returnNewCity
  }
`

const FETCH_QUERY = gql`
  query fetch($id: String!) {
    fetchCity(id: $id) {
      id
      name
    }
  }
`

const UPDATE_MUTATION = gql`
  mutation($data: CityInput!) {
    updateCity(data: $data) {
      id
    }
  }
`

export default makeEditView(Edit, {
  query: FETCH_QUERY,
  queryName: 'fetchCity',
  mutation: UPDATE_MUTATION,
  mutationName: 'updateCity',
  queryNewObject: CREATE_NEW_OBJECT_QUERY,
  queryNewObjectName: 'returnNewCity',
  slug: 'cities',
})
