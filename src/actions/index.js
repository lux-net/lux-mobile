import axios from 'axios'
import { LOAD_LIGHT_MARKERS, ADD_LIGHT_MARKER, AUTH } from '../constants/ActionTypes'

export const saveFacebookToken = (token) => ({
  type: AUTH,
  payload: async () => {
    try {
      console.log(`http://lux.rodolfosilva.com:1003/login`, { token })
      const { data } = await axios.post(`http://lux.rodolfosilva.com:1003/login`, { token })
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
      console.log(`http://lux.rodolfosilva.com:1003/light-markers?northEast[latitude]=${northEast.latitude}&northEast[longitude]=${northEast.longitude}&southWest[latitude]=${southWest.latitude}&southWest[longitude]=${southWest.longitude}`)
      const { data } = await axios.get(`http://lux.rodolfosilva.com:1003/light-markers?northEast[latitude]=${northEast.latitude}&northEast[longitude]=${northEast.longitude}&southWest[latitude]=${southWest.latitude}&southWest[longitude]=${southWest.longitude}`)
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
      const { data } = await axios.post('http://lux.rodolfosilva.com:1003/light-markers', {
        lightMarker: {
          coordinate: { latitude, longitude }
        },
        iluminated
      })
      return data
    } catch (error) {
      console.log('ERROR', error)
      return []
    }
  }
})
