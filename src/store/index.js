import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from '../reducers'
import promiseMiddleware from 'redux-promise-middleware'
const middlewares = [thunk, promiseMiddleware()]

// if (process.env.NODE_ENV === `development`) {
//   const { logger } = require(`redux-logger`)

//   middlewares.push(logger)
// }

// Connect our store to the reducers
export default createStore(reducers, applyMiddleware(...middlewares))
