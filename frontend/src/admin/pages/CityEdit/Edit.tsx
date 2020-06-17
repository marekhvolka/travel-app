import React from 'react'
import gql from 'graphql-tag'
import { Button } from '../../../common/atoms/Button/Button'
import { CityForm } from '../../organism/CityForm/CityForm'
import { EditViewProps, makeEditView } from '../../organism/EditView/makeEditView'

const Edit = ({ model, modelChanged, handleSubmit }: EditViewProps) => (
  <div>
    <h1>
      {model.id ? `Edit city ${model.name}` : 'Add city'}
      <Button float={'right'} onClick={handleSubmit}>Save</Button>
    </h1>
    <CityForm modelChanged={modelChanged} model={model} />
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
