import { InMemoryCache } from 'apollo-cache-inmemory'
import ApolloClient from 'apollo-client'
import { setContext } from 'apollo-link-context';
import { HttpLink } from 'apollo-link-http'

import config from './config'
import { AUTH_TOKEN } from './constants'
// import { store } from './store'

const cache = new InMemoryCache({ addTypename: false })

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem(AUTH_TOKEN)

  // const token = store.getState().userData.token;
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token
    }
  }
});

const httpLink = new HttpLink({
  uri: config.backendUrl + config.graphqlEndPoint,
})

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
})
