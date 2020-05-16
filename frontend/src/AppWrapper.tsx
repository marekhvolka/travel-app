import React, { useEffect, useState } from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { client } from './ApolloClient'
import { FlashMessage } from './common/atoms/FlashMessage/FlashMessage'
import { Spinner } from './common/atoms/Spinner/Spinner'
import { persistor, store } from './store'
import { PersistGate } from 'redux-persist/integration/react'

export const AppWrapper = (props) => {
  const [rehydrated, setRehydrated] = useState(false)

  useEffect(() => {
    persistStore(store, {}, () => {
      setRehydrated(true)
    })
  }, [])

  if (!rehydrated) {
    return (
      <Spinner />
    )
  }

  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <FlashMessage/>
        <PersistGate loading={null} persistor={persistor}/>
        {props.children}
      </Provider>
    </ApolloProvider>
  )
}
