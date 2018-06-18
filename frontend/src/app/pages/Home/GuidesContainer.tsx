import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Guides } from './Guides'

export const GuidesContainer = () => (
  <Query
    query={gql`
      {
        guides {
          id
          url
          name
          previewImageUrl
          description
          price
          currency
        }
        tags {
          name
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) {
        return 'Loading...'
      }
      if (error) {
        return `Error! ${error.message}`
      }

      return <Guides guides={data.guides} />
    }}
  </Query>
)
