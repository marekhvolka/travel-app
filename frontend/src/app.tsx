import React from 'react'
import { ApolloProvider } from 'react-apollo'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { client } from './ApolloClient'
import { App } from './app/App'
import { FlashMessage } from './common/atoms/FlashMessage/FlashMessage'
import { store } from './store'

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <FlashMessage/>
      <App />
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
)
// registerServiceWorker();
