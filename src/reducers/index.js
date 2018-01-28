import { combineReducers } from 'redux'
import { LOAD_LIGHT_MARKERS, ADD_LIGHT_MARKER } from '../constants/ActionTypes'

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

export default combineReducers({
  lightMarkers
})
