import React from 'react'
import ReactDOM from 'react-dom'
import {ApolloProvider} from 'react-apollo'
import {Provider} from 'react-redux'
import App from './app/App'
import client from './ApolloClient'
import {store} from "./store";

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App/>
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
)
// registerServiceWorker();
