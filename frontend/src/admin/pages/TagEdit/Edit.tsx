import gql from 'graphql-tag'
import React from 'react'
import { Button } from '../../../common/atoms/Button/Button'
import { EditViewProps, makeEditView } from '../../organism/EditView/makeEditView'
import { TagForm } from '../../organism/TagForm/TagForm'

const Edit = ({ model, modelChanged, handleSubmit }: EditViewProps) => (
  <>
    <h1>
      {model.id ? `Edit tag ${model.name}` : 'Add tag'}
      <Button float={'right'} onClick={handleSubmit}>Save</Button>
    </h1>
    <TagForm modelChanged={modelChanged} model={model} />
  </>
)

const FETCH_QUERY = gql`
  query fetch($id: String!) {
    fetchTag(id: $id) {
      id
      name
      published
      description
      color
      icon
    }
  }
`

const UPDATE_MUTATION = gql`
  mutation($data: TagInput!) {
    updateTag(data: $data) {
      id
    }
  }
`

export default makeEditView(Edit, {
  query: FETCH_QUERY,
  queryName: 'fetchTag',
  mutation: UPDATE_MUTATION,
  mutationName: 'updateTag',
  slug: 'tags',
})
