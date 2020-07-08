import { useQuery } from '@apollo/react-hooks'
import { Field } from 'formik'
import gql from 'graphql-tag'
import React from 'react'
import { Box } from '../../../common/atoms/Box/Box'
import { Button } from '../../../common/atoms/Button/Button'
import { Flex } from '../../../common/atoms/Flex/Flex'
import { ImageInput } from '../../../common/atoms/ImageInput/ImageInput'
import { Input } from '../../../common/atoms/Input/Input'
import { LocationInput } from '../../../common/atoms/LocationInput/LocationInput'
import { Select } from '../../../common/atoms/Select/Select'
import { Spinner } from '../../../common/atoms/Spinner/Spinner'
import { Toggle } from '../../../common/atoms/Toggle/Toggle'
import { WysiwygInput } from '../../../common/atoms/WysiwygInput/WysiwygInput'
import { AssignForm } from '../../../common/organism/AssignForm/AssignForm'
import { Tabs } from '../../../common/organism/Tabs/Tabs'
import { EditViewProps, makeEditView } from '../../organism/EditView/makeEditView'

const FETCH_ADDITIONAL_DATA_QUERY = gql`
  {
    cities {
      _id
      name
    }
    items {
      _id
      name
    }
  }
`

const Edit = ({ model }: EditViewProps) => {
  const { loading, data: data } = useQuery(FETCH_ADDITIONAL_DATA_QUERY)

  if (loading) {
    return <Spinner/>
  }

  return (
    <Flex>
      <Box flex={7}>
        <h1>
          {model._id ? `Edit guide ${model.name}` : 'Add guide'}
          <Button type="submit" float={'right'}>Save</Button>
        </h1>
        <Tabs defaultActiveIndex={0}>
          <div title="Basic settings">
            <Field
              name="name"
              label="Guide name"
              component={Input}
            />
            <Field
              name="url"
              label="Guide url"
              component={Input}
            />
            <Field
              name="description"
              label="Description"
              component={WysiwygInput}
            />
            <Field
              name="price"
              type="number"
              label="Price"
              component={Input}
            />
            <Field
              name="currency"
              label="Currency"
              component={Input}
            />
            <Field
              name="previewImageUrl"
              label="Preview Image"
              component={ImageInput}
            />
            <Field
              name="published"
              label="Published"
              component={Toggle}
            />
            <Field
              name="location"
              component={LocationInput}
            />
            <Field
              label="City"
              name="cityId"
              options={data.cities}
              component={Select}
            />
          </div>
          <div title="Items">
            <h1>Items</h1>
            <AssignForm
              items={data.items}
              model={model}
              itemIdsArrayName={'itemIds'}
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
      _id
      name
      cityId
      url
      description
      location {
        latitude
        longitude
        zoomLevel
      }
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
      _id
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
