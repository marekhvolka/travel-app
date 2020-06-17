import { useQuery } from '@apollo/react-hooks'
import React from 'react'
import gql from 'graphql-tag'
import { Spinner } from '../../../common/atoms/Spinner/Spinner'
import { Tabs } from '../../../common/organism/Tabs/Tabs'
import { Button } from '../../../common/atoms/Button/Button'
import { GuideForm } from '../../organism/GuideForm/GuideForm'
import { EditViewProps, makeEditView } from '../../organism/EditView/makeEditView'
import { AssignForm } from '../../../common/organism/AssignForm/AssignForm'
import { Flex } from '../../../common/atoms/Flex/Flex'
import { Box } from '../../../common/atoms/Box/Box'

const FETCH_ADDITIONAL_DATA_QUERY = gql`
  {
    cities {
      id
      name
    }
    items {
      id
      name
    }
  }
`

const Edit = ({ model, modelChanged, handleSubmit }: EditViewProps) => {
  const { loading: loadingData, data: data } = useQuery(FETCH_ADDITIONAL_DATA_QUERY)

  if (loadingData) {
    return <Spinner />
  }

  return (
    <Flex>
      <Box flex={7}>
        <h1>
          {model.id ? `Edit guide ${model.name}` : 'Add guide'}
          <Button float={'right'} onClick={handleSubmit}>Save</Button>
        </h1>
        <Tabs defaultActiveIndex={0}>
          <div title="Basic settings">
            <GuideForm modelChanged={modelChanged} model={model} cities={data.cities}/>
          </div>
          <div title="Items">
            <h1>Items</h1>
            <AssignForm
              items={data.items}
              model={model}
              itemIdsArrayName={'itemIds'}
              modelChanged={modelChanged}
            />
          </div>
        </Tabs>
      </Box>
    </Flex>
  )
}

const CREATE_NEW_OBJECT_QUERY = gql`
  {
    returnNewGuide
  }
`

const FETCH_QUERY = gql`
  query fetch($id: String!) {
    fetchGuide(id: $id) {
      id
      name
      cityId
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
  queryNewObject: CREATE_NEW_OBJECT_QUERY,
  queryNewObjectName: 'returnNewGuide',
  mutation: UPDATE_MUTATION,
  mutationName: 'updateGuide',
  slug: 'guides',
})
