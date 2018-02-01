import { createStore, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'
import reducers from '../reducers'
const middlewares = [thunk, promiseMiddleware()]

// if (process.env.NODE_ENV === `development`) {
//   const { logger } = require(`redux-logger`)

//   middlewares.push(logger)
// }

// Connect our store to the reducers
export default createStore(reducers, composeWithDevTools(
  applyMiddleware(...middlewares)
  // other store enhancers if any
))
