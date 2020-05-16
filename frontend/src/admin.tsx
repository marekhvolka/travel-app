import React from 'react'
import ReactDOM from 'react-dom'
import { Admin } from './admin/Admin'
import { AppWrapper } from './AppWrapper'

ReactDOM.render(
  <AppWrapper>
    <Admin/>
  </AppWrapper>,
  document.getElementById('root')
)
// registerServiceWorker();
