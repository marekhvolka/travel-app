import React from 'react'
import gql from 'graphql-tag'
import { TagForm } from '../../organism/TagForm/TagForm'
import { makeEditView } from '../../organism/EditView/makeEditView'
import { Button } from '../../../common/atoms/Button/Button'
import { Flex } from '../../../common/atoms/Flex/Flex'
import { Box } from '../../../common/atoms/Box/Box'

const Edit = ({ model, modelChanged, handleSubmit }) => (
  <Flex>
    <Box flex={7}>
      <h1>
        {model.id ? `Edit tag ${model.name}` : 'Add tag'}
        <Button onClick={handleSubmit}>Save</Button>
      </h1>
      <TagForm modelChanged={modelChanged} model={model} />
    </Box>
    <Box flex={3} />
  </Flex>
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
  mutation($data: TagData!) {
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
