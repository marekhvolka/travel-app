import { InMemoryCache } from 'apollo-cache-inmemory'
import ApolloClient from 'apollo-client'
import { HttpLink } from 'apollo-link-http'

import config from './config'

const cache = new InMemoryCache()

export const client = new ApolloClient({
  link: new HttpLink({
    uri: config.backendUrl + config.graphqlEndPoint,
  }),
  cache,
})
