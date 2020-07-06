import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import React from 'react'
import { Box } from '../../../common/atoms/Box/Box'
import { Button } from '../../../common/atoms/Button/Button'
import { Flex } from '../../../common/atoms/Flex/Flex'
import { Spinner } from '../../../common/atoms/Spinner/Spinner'
import { AssignForm } from '../../../common/organism/AssignForm/AssignForm'
import { Tabs } from '../../../common/organism/Tabs/Tabs'
import { EditViewProps, makeEditView } from '../../organism/EditView/makeEditView'
import { ItemForm } from '../../organism/ItemForm/ItemForm'
import { RestrictionsForm } from '../../organism/ItemForm/Restrictions/RestrictionsForm'

const CREATE_NEW_OBJECT_QUERY = gql`
  {
    returnNewItem
  }
`

const FETCH_QUERY = gql`
  fragment dayRestrictionFields on DayRestriction {
    state
    from
    to
  }
  query fetch($id: String!) {
    fetchItem(id: $id) {
      id
      name
      title
      type
      published
      showOnMap
      description
      location {
        latitude
        longitude
        zoomLevel
      }
      previewImageUrl
      tagIds
      relatedItemsIds
      restrictions {
        state
        dayRestrictions {
          mon {
            ...dayRestrictionFields
          }
          tue {
            ...dayRestrictionFields
          }
          wed {
            ...dayRestrictionFields
          }
          thu {
            ...dayRestrictionFields
          }
          fri {
            ...dayRestrictionFields
          }
          sat {
            ...dayRestrictionFields
          }
          sun {
            ...dayRestrictionFields
          }
        }
      }
    }
  }
`

const FETCH_TAGS_QUERY = gql`
  {
    tags {
      id
      name
    }
  }
`

const FETCH_ITEMS_QUERY = gql`
  {
    items {
      id
      name
    }
  }
`

const UPDATE_MUTATION = gql`
  mutation($data: ItemInput!) {
    updateItem(data: $data) {
      id
    }
  }
`

const initialModel = {
  model: {
    name: '',
    tags: [],
    tagIds: [],
    relatedItemsIds: [],
    relatedItems: []
  }
}

const Edit = ({ model }: EditViewProps) => {
  const { loading: loadingItems, data: itemsData } = useQuery(FETCH_ITEMS_QUERY)
  const { loading: loadingTags, data: tagsData } = useQuery(FETCH_TAGS_QUERY)

  if (loadingItems || loadingTags) {
    return <Spinner />
  }

  return (
    <Flex>
      <Box flex={1}>
        <h2>
          {model.id ? `Edit item ${model.name}` : 'Add item'}
          <Button type="submit" float={'right'}>
            Save
          </Button>
        </h2>
        <Tabs defaultActiveIndex={0}>
          <div title="Basic settings">
            <ItemForm model={model}/>
          </div>
          <div title="Tags">
            <h3>Tags settings</h3>
            <AssignForm
              model={model}
              items={tagsData.tags}
              itemIdsArrayName={'tagIds'}
            />
          </div>
          <div title="Related items">
            <h3>Related items settings</h3>
            <AssignForm
              items={itemsData.items}
              model={model}
              itemIdsArrayName={'relatedItemsIds'}
            />
          </div>
          <div title="Restrictions">
            <h3>Restrictions</h3>
            <RestrictionsForm model={model}/>
          </div>
        </Tabs>
      </Box>
      {/*<Box flex={3} />*/}
    </Flex>
  )
}

export default makeEditView(Edit, {
  mutation: UPDATE_MUTATION,
  mutationName: 'update',
  query: FETCH_QUERY,
  queryName: 'fetchItem',
  queryNewObject: CREATE_NEW_OBJECT_QUERY,
  queryNewObjectName: 'returnNewItem',
  slug: 'item',
  initialModel
})
