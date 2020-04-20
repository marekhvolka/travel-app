import React from 'react'
import gql from 'graphql-tag'
import { compose, graphql } from 'react-apollo'
import isNil from 'lodash/isNil'
import { GuideDetail } from './Detail'
import { RouteComponentProps } from 'react-router'
import { State } from '../../../store'
import { connect, ConnectedProps } from 'react-redux'

const GUIDE_QUERY = gql`
  query fetchGuide($id: String, $url: String) {
    fetchGuide(id: $id, url: $url) {
      id
      name
      url
      previewImageUrl
      description
      price
      currency
    }
  }
`

const mapState = (state: State) => ({
  userData: state.userData,
})

const connector = connect(mapState)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {
  fetch: any
}

const GuideDetailContainer = (props: Props) => {
  const buy = () => {
    alert('Not implemented')
  }

  if (props.fetch && props.fetch.loading) {
    return <div>Loading</div>
  }

  if (props.fetch && props.fetch.error) {
    return <div>Error</div>
  }

  const { fetchGuide: guide } = props.fetch

  if (!guide) {
    return <div>Loading</div>
  }

  return <GuideDetail guide={guide} isBought={true} onBuy={buy} />
}

type MatchParams = {
  url: string
}

export default connector(
  compose(
    graphql(GUIDE_QUERY, {
      name: 'fetch',
      skip: (props: RouteComponentProps<MatchParams>) => isNil(props.match.params.url),
      options: (props: RouteComponentProps<MatchParams>) => ({ variables: { url: props.match.params.url } }),
    })
  )(GuideDetailContainer)
)
