import ApolloClient from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import config from './config'

const cache = new InMemoryCache()

const client = new ApolloClient({
  link: new HttpLink({
    uri: config.backendUrl + config.graphqlEndPoint,
  }),
  cache,
})

export default client
