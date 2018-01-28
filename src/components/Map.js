import React from 'react'
import PropType from 'prop-types'
import { StyleSheet, View, Dimensions } from 'react-native'

import MapView from 'react-native-maps'

const screen = Dimensions.get('window')

const ASPECT_RATIO = screen.width / screen.height
const LATITUDE = -12.9774804
const LONGITUDE = -38.4595979
const LATITUDE_DELTA = 0.00222
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

class Map extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      coordinate: new MapView.AnimatedRegion({
        latitude: LATITUDE,
        longitude: LONGITUDE
      }),
      markers: []
    }
  }

  animateToRegion({ latitude, longitude }) {
    this.mapview.animateToRegion({
      latitude,
      longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    })
  }

  _onChange({ latitude, longitude, latitudeDelta, longitudeDelta }) {
    if (!this.props.onChange) return

    const northEast = {
      latitude: latitude + latitudeDelta / 2,
      longitude: longitude + longitudeDelta / 2
    }

    const southWest = {
      latitude: latitude - latitudeDelta / 2,
      longitude: longitude - longitudeDelta / 2
    }

    this.props.onChange({ latitude, longitude, latitudeDelta, longitudeDelta, northEast, southWest })
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          onRegionChangeComplete={(position) => this._onChange(position)}
          ref={mapview => { this.mapview = mapview }}
          initialRegion={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
          }}
        >

          {this.props.markers.map((marker) => (
            <MapView.Marker key={marker.__identity}
              coordinate={marker.coordinate}
            />
          ))}
        </MapView>
      </View>
    )
  }
}

Map.propTypes = {
  onChange: PropType.func,
  markers: PropType.array
}

Map.defaultProps = {
  markers: []
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  bubble: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20
  },
  latlng: {
    width: 200,
    alignItems: 'stretch'
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent'
  }
})

export default Map
