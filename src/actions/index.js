import axios from 'axios'
import { LOAD_LIGHT_MARKERS, ADD_LIGHT_MARKER } from '../constants/ActionTypes'

export const loadLightMarkers = () => ({
  type: LOAD_LIGHT_MARKERS,
  payload: async () => {
    try {
      const { data } = await axios.get('http://lux.rodolfosilva.com:1003/light-markers')
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

      console.log(data)
      return data
    } catch (error) {
      console.log(error)
      return []
    }
  }
})
