import React from 'react'
import { ApolloProvider } from 'react-apollo'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Admin } from './admin/Admin'
import { client } from './ApolloClient'
import { FlashMessage } from './common/atoms/FlashMessage/FlashMessage'
import { store } from './store'

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <FlashMessage/>
      <Admin/>
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
)
// registerServiceWorker();
