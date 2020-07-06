import gql from 'graphql-tag'
import React from 'react'
import { Field } from 'formik'
import { Button } from '../../../common/atoms/Button/Button'
import { Input } from '../../../common/atoms/Input/Input'
import { Select } from '../../../common/atoms/Select/Select'
import { Toggle } from '../../../common/atoms/Toggle/Toggle'
import { WysiwygInput } from '../../../common/atoms/WysiwygInput/WysiwygInput'
import { EditViewProps, makeEditView } from '../../organism/EditView/makeEditView'

const Edit = ({ model }: EditViewProps) => (
  <>
    <h1>
      {model.id ? `Edit tag ${model.name}` : 'Add tag'}
      <Button type="submit" float={'right'}>Save</Button>
    </h1>
    <Field
      name="name"
      label="Tag name"
      component={Input}
    />
    <Field
      name="description"
      label="Description"
      component={WysiwygInput}
    />
    <Field
      name="color"
      label="Color"
      options={[
        {
          id: '#28a745',
          name: 'Green',
        },
        {
          id: '#ffc107',
          name: 'Orange',
        },
        {
          id: '#dc3545',
          name: 'Red',
        },
      ]}
      component={Select}
    />
    <Field
      name="icon"
      label="Icon"
      options={[
        {
          id: 'FaUser',
          name: 'User',
        },
        {
          id: 'FaUser',
          name: 'Walk',
        },
      ]}
      component={Select}
    />
    <Field
      name="published"
      label="Published"
      component={Toggle}
    />
  </>
)

const CREATE_NEW_OBJECT_QUERY = gql`
  {
    returnNewTag
  }
`

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
  queryNewObject: CREATE_NEW_OBJECT_QUERY,
  queryNewObjectName: 'returnNewTag',
  mutation: UPDATE_MUTATION,
  mutationName: 'updateTag',
  slug: 'tags',
})
