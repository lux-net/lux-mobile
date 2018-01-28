import axios from 'axios'
import { LOAD_LIGHT_MARKERS, ADD_LIGHT_MARKER, AUTH } from '../constants/ActionTypes'
import { getAccessToken, setCurrentUser, getCurrentUser } from './session'

export const saveFacebookToken = (token) => ({
  type: AUTH,
  payload: async () => {
    const token = await getAccessToken()

    try {
      const { data } = await axios.post(`http://lux.rodolfosilva.com:1003/login`, { token })
      setCurrentUser(data)
      return data
    } catch (error) {
      return []
    }
  }
})

export const loadLightMarkers = ({ latitude, longitude, latitudeDelta, longitudeDelta, northEast, southWest }) => ({
  type: LOAD_LIGHT_MARKERS,
  payload: async () => {
    try {
      const currentUser = getCurrentUser()
      const { data } = await axios.get(`http://lux.rodolfosilva.com:1003/light-markers?northEast[latitude]=${northEast.latitude}&northEast[longitude]=${northEast.longitude}&southWest[latitude]=${southWest.latitude}&southWest[longitude]=${southWest.longitude}`, {
        headers: {
          Key: currentUser.facebookId
        }
      })
      return data
    } catch (error) {
      return []
    }
  }
})

export const addLightMarker = ({ latitude, longitude, iluminated }) => ({
  type: ADD_LIGHT_MARKER,
  payload: async () => {
    try {
      const currentUser = getCurrentUser()
      const { data } = await axios.post(
        'http://lux.rodolfosilva.com:1003/light-markers',
        {
          lightMarker: {
            iluminated,
            coordinate: { latitude, longitude }
          }
        },
        {
          headers: {
            Key: currentUser.facebookId
          }
        }
      )
      return data
    } catch (error) {
      return []
    }
  }
})
