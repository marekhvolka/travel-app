import 'antd/dist/antd.css'
import React, { useEffect, useState } from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { createGlobalStyle } from 'styled-components'
import { client } from './ApolloClient'
import { FlashMessage } from './common/atoms/FlashMessage/FlashMessage'
import { Spinner } from './common/atoms/Spinner/Spinner'
import { persistor, store } from './store'
import { PersistGate } from 'redux-persist/integration/react'
import { normalize } from 'styled-normalize'

export const GlobalStyle = createGlobalStyle`
 ${normalize}
 a {
  color: #000
 }
`

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
        <GlobalStyle />
        <FlashMessage/>
        <PersistGate loading={null} persistor={persistor}/>
        {props.children}
      </Provider>
    </ApolloProvider>
  )
}
