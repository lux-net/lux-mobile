import Screens from './screens'
import React from 'react'
import store from './store'
import { Provider } from 'react-redux'

export default () => (
  <Provider store={store}>
    <Screens />
  </Provider>
)
