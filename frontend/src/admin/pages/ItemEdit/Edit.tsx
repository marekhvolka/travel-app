import React from 'react'
import gql from 'graphql-tag'
import { compose, graphql } from 'react-apollo'
import isNil from 'lodash/isNil'
import { Tabs } from '../../../common/organism/Tabs/Tabs'
import { Button } from '../../../common/atoms/Button/Button'
import { ItemForm } from '../../organism/ItemForm/ItemForm'
import { EditView } from '../../organism/EditView/EditView'
import { AssignForm } from '../../../common/organism/AssignForm/AssignForm'
import { Flex } from '../../../common/atoms/Flex/Flex'
import { Box } from '../../../common/atoms/Box/Box'
import {RouteComponentProps} from 'react-router-dom';
import {RestrictionsForm} from "../../organism/ItemForm/Restrictions/RestrictionsForm";

type Props = {
  fetchTags: any
  fetchItems: any
  fetch: any
}

type State = {
  model: {
    name: string
    tags: any[],
    tagIds: string[],
    relatedItemIds: string[],
    relatedItems: any[],
  }
}

class Edit extends EditView<Props, State> {
  state = {
    model: {
      name: '',
      tags: [],
      tagIds: [],
      relatedItemIds: [],
      relatedItems: [],
      restrictions: [],
    },
  }

  fetchQueryName = 'fetchItem'
  updateMutationName = 'updateItem'
  slug = 'items'

  render() {
    const { model } = this.state

    if (
      this.props.fetch &&
      (this.props.fetchTags.loading || this.props.fetch.loading || !model)
    ) {
      return <div>Loading</div>
    }

    if (
      (this.props.fetch && this.props.fetch.error) ||
      (this.props.fetchTags && this.props.fetchTags.error)
    ) {
      return <div>Error</div>
    }

    return (
      <Flex>
        <Box flex={1}>
          <h1>
            {this.props.match.params.id
              ? `Edit item ${model.name}`
              : 'Add item'}
            <Button style={{float: 'right'}} onClick={this.handleSubmit}>Save</Button>
          </h1>
          <Tabs defaultActiveIndex={3}>
            <div title="Basic settings">
              <ItemForm modelChanged={this.modelChanged} model={model} />
            </div>
            <div title="Tags">
              <h1>Tags settings</h1>
              <AssignForm
                model={model}
                modelChanged={this.modelChanged}
                items={this.props.fetchTags.tags}
                collectionName={'tags'}
                itemIdsArrayName={'tagIds'}
              />
            </div>
            <div title="Related items">
              <h1>Related items settings</h1>
              <AssignForm
                model={model}
                modelChanged={this.modelChanged}
                items={this.props.fetchItems.items}
                collectionName={'relatedItems'}
                itemIdsArrayName={'relatedItemIds'}
              />
            </div>
            <div title="Restrictions">
              <h1>Restrictions</h1>
              <RestrictionsForm
                model={model.restrictions}
                modelChanged={newData =>
                  this.modelChanged({
                    ...model,
                    restrictions: {
                      ...model.restrictions,
                      ...newData
                    },
                  })
                }
              />
            </div>
          </Tabs>
        </Box>
        {/*<Box flex={3} />*/}
      </Flex>
    )
  }
}

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
      description
      latitude
      longitude
      zoomLevel
      previewImageUrl
      tags {
        id
        name
      }
      tagIds
      relatedItemIds
      relatedItems {
        id
        name
      }
      restrictions {
        state
        dayRestrictions {
          mon { ...dayRestrictionFields }
          tue { ...dayRestrictionFields }
          wed { ...dayRestrictionFields }
          thu { ...dayRestrictionFields }
          fri { ...dayRestrictionFields }
          sat { ...dayRestrictionFields }
          sun { ...dayRestrictionFields }
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

type MatchParams = {
    id: string
}

export default compose(
  graphql(FETCH_QUERY, {
    name: 'fetch',
    skip: (props: RouteComponentProps<MatchParams>) => isNil(props.match.params.id),
    options: (props: RouteComponentProps<MatchParams>) => ({ variables: { id: props.match.params.id } }),
  }),
  graphql(FETCH_TAGS_QUERY, {
    name: 'fetchTags',
  }),
  graphql(FETCH_ITEMS_QUERY, {
    name: 'fetchItems',
  }),
  graphql(UPDATE_MUTATION, {
    name: 'update',
  })
)(Edit)
