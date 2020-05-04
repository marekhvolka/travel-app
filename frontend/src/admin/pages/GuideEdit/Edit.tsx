import React from 'react'
import gql from 'graphql-tag'
import { Tabs } from '../../../common/organism/Tabs/Tabs'
import { Button } from '../../../common/atoms/Button/Button'
import { GuideForm } from '../../organism/GuideForm/GuideForm'
import { makeEditView } from '../../organism/EditView/makeEditView'
import { AssignForm } from '../../../common/organism/AssignForm/AssignForm'
import { Flex } from '../../../common/atoms/Flex/Flex'
import { Box } from '../../../common/atoms/Box/Box'

const Edit = ({ model, modelChanged, handleSubmit }) => (
  <Flex>
    <Box flex={7}>
      <h1>
        {model.id ? `Edit guide ${model.name}` : 'Add guide'}
        <Button float={'right'} onClick={handleSubmit}>Save</Button>
      </h1>
      <Tabs defaultActiveIndex={0}>
        <div title="Basic settings">
          <GuideForm modelChanged={modelChanged} model={model} />
        </div>
        <div title="Items">
          <h1>Items</h1>
          <AssignForm
            // items={this.props.fetch.items}
            model={model}
            collectionName={'items'}
            itemIdsArrayName={'itemIds'}
            modelChanged={modelChanged}
          />
        </div>
      </Tabs>
    </Box>
  </Flex>
)

const FETCH_QUERY = gql`
  fragment itemFields on Item {
    id
    name
    type
    title
    description
    latitude
    longitude
    previewImageUrl
    tags {
      id
      color
      name
    }
  }

  query fetch($id: String!) {
    fetchGuide(id: $id) {
      id
      name
      url
      description
      latitude
      longitude
      zoomLevel
      previewImageUrl
      published
      price
      currency
      itemIds
      items {
        ...itemFields
        relatedItems {
          ...itemFields
        }
      }
    }
    items {
      id
      name
      type
      description
    }
  }
`

const UPDATE_MUTATION = gql`
  mutation($data: GuideInput!) {
    updateGuide(data: $data) {
      id
    }
  }
`

export default makeEditView(Edit, {
  query: FETCH_QUERY,
  queryName: 'fetchGuide',
  mutation: UPDATE_MUTATION,
  mutationName: 'updateGuide',
  slug: 'guides',
})
