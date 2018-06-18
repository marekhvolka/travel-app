import React from 'react'
import {compose, graphql} from 'react-apollo'

type Props = {
  fetch: any
}

export const makeListView = (WrappedComponent, options) => {
  const FinalComponent = ({fetch}: Props) => {
    if (fetch && fetch.loading) {
      return <div>Loading</div>
    }

    if (fetch && fetch.error) {
      return <div>Error</div>
    }

    return <WrappedComponent items={fetch[options.queryName]} />
  }

  return compose(
    graphql(options.query, {
      name: 'fetch',
    })
  )(FinalComponent)
}
