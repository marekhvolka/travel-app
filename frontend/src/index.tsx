import React from 'react'
import ReactDOM from 'react-dom'
import ApolloProvider from 'react-apollo/ApolloProvider'
import Switch from 'react-router-dom/Switch'
import Route from 'react-router-dom/Route'
import BrowserRouter from 'react-router-dom/BrowserRouter'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { Admin } from './admin/Admin'
import { App } from './app/App'
import { client } from './ApolloClient'
import { FlashMessage } from './common/atoms/FlashMessage/FlashMessage'
import { store, persistor } from './store'
import { registerServiceWorker } from './serviceWorker'

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <FlashMessage/>
      <PersistGate loading={null} persistor={persistor} />
      <BrowserRouter>
        <Switch>
          <Route path={'/admin'} component={Admin} />
          <Route path={'/'} component={App} />
        </Switch>
      </BrowserRouter>
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
)

registerServiceWorker()
