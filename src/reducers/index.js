import { combineReducers } from 'redux'
import { LOAD_LIGHT_MARKERS, ADD_LIGHT_MARKER, AUTH } from '../constants/ActionTypes'

// Handle the action
const lightMarkers = (state = { data: [] }, action) => {
  switch (action.type) {
    case `${LOAD_LIGHT_MARKERS}_PENDING`:
      return state

    case `${LOAD_LIGHT_MARKERS}_FULFILLED`:
      return {
        isFulfilled: true,
        data: action.payload
      }

    case `${LOAD_LIGHT_MARKERS}_REJECTED`:
      return {
        isRejected: true,
        data: [],
        error: action.payload
      }
    case `${ADD_LIGHT_MARKER}_PENDING`:
    case `${ADD_LIGHT_MARKER}_FULFILLED`:
    case `${ADD_LIGHT_MARKER}_REJECTED`:
      return state
    default: return state
  }
}

// Handle the action
const auth = (state = { data: [] }, action) => {
  switch (action.type) {
    case `${AUTH}_PENDING`:
      return state

    case `${AUTH}_FULFILLED`:
      return {
        isFulfilled: true,
        data: action.payload
      }

    case `${AUTH}_REJECTED`:
      return {
        isRejected: true,
        data: [],
        error: action.payload
      }
    default: return state
  }
}

export default combineReducers({
  lightMarkers, auth
})
