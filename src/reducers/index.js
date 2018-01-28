import { combineReducers } from 'redux'
import { LOAD_LIGHT_MARKERS, ADD_LIGHT_MARKER, AUTH } from '../constants/ActionTypes'

// Handle the action
const lightMarkers = (state = { data: [] }, action) => {
  switch (action.type) {
    case `${LOAD_LIGHT_MARKERS}_PENDING`:
      return {
        ...state,
        isLoading: true
      }

    case `${LOAD_LIGHT_MARKERS}_FULFILLED`:
      return {
        isFulfilled: true,
        isLoading: false,
        data: action.payload
      }

    case `${LOAD_LIGHT_MARKERS}_REJECTED`:
      return {
        isRejected: true,
        isLoading: false,
        data: [],
        error: action.payload
      }
    case `${ADD_LIGHT_MARKER}_PENDING`:
      return {
        ...state,
        isAdding: true
      }
    case `${ADD_LIGHT_MARKER}_FULFILLED`:
      return {
        ...state,
        isFulfilled: true,
        isAdding: false
      }
    case `${ADD_LIGHT_MARKER}_REJECTED`:
      return {
        isRejected: true,
        isAdding: false,
        data: [],
        error: action.payload
      }
    default:
      return state
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
