import React, { Fragment } from 'react'
import gql from 'graphql-tag'
import { compose, graphql } from 'react-apollo'
import isNil from 'lodash/isNil'
import GuideViewer from '../../organism/GuideViewer/GuideViewer'
import CheckUser from '../../organism/CheckUser/CheckUser'
import {RouteComponentProps} from "react-router";
import {State} from "../../../store";
import { connect, ConnectedProps } from 'react-redux'
import {Spinner} from "../../../common/atoms/Spinner/Spinner";

const GUIDE_QUERY = gql`
  fragment itemBaseFields on Item {
    id
    name
    title
    description
    previewImageUrl
    type
    tags {
      id
      name
      color
      icon
    }
  }

  query fetch($id: String, $url: String) {
    fetchGuide(id: $id, url: $url) {
      id
      name
      url
      description
      latitude
      longitude
      zoomLevel
      items {
        ...itemBaseFields
        latitude
        longitude
        relatedItems {
          ...itemBaseFields
        }
      }
    }
  }
`

const mapState = (state: State) => ({
  userData: state.userData
})

const connector = connect(
  mapState
)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {
  fetch: any
}

const GuideExplore = (props: Props) => {
  if (props.fetch && props.fetch.loading) {
    return <Spinner />
  }

  if (props.fetch && props.fetch.error) {
    return <div>Error</div>
  }

  const { fetchGuide: guide } = props.fetch

  return (
    <Fragment>
      <GuideViewer model={guide} />
      {!props.userData && <CheckUser />}
    </Fragment>
  )
}

type MatchParams = {
  url: string
}

export default connector(compose(
  graphql(GUIDE_QUERY, {
    name: 'fetch',
    skip: (props: RouteComponentProps<MatchParams>) => isNil(props.match.params.url),
    options: (props: RouteComponentProps<MatchParams>) => ({ variables: { url: props.match.params.url } }),
  }),
)(GuideExplore))
