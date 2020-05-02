import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import { Provider } from 'react-redux'
import { Admin } from './admin/Admin'
import { client } from './ApolloClient'
import { store } from './store'

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <Admin />
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
)
// registerServiceWorker();
