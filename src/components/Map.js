import React from 'react'
import PropType from 'prop-types'
import { StyleSheet, View, Dimensions } from 'react-native'

import { Marker } from 'react-native-maps'
import MapView from 'react-native-map-clustering'

const screen = Dimensions.get('window')

const ASPECT_RATIO = screen.width / screen.height
const LATITUDE = -12.9774804
const LONGITUDE = -38.4595979
const LATITUDE_DELTA = 0.00222
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO
const iluminadoNaoConfirmadoIco = require('../assets/iluminado-nao-confirmado.png')
const escuroNaoConfirmadoIco = require('../assets/escuro-nao-confirmado.png')
const iluminadoIco = require('../assets/iluminado.png')
const escuroIco = require('../assets/escuro.png')

class Map extends React.Component {
  animateToRegion({ latitude, longitude }) {
    this.mapview._root.animateToRegion({
      latitude,
      longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    })
  }

  shouldComponentUpdate(prevStatus) {
    return !this.moving
  }

  onRegionChange() {
    this.moving = true
  }

  _onChange({ latitude, longitude, latitudeDelta, longitudeDelta }) {
    this.moving = false
    if (!this.props.onChange) return

    const baseLatitudeDelta = latitudeDelta / 2
    const baseLongitudeDelta = longitudeDelta / 2

    const southWest = {
      latitude: latitude + baseLatitudeDelta,
      longitude: longitude + baseLongitudeDelta
    }

    const northEast = {
      latitude: latitude - baseLatitudeDelta,
      longitude: longitude - baseLongitudeDelta
    }

    this.props.onChange({ latitude, longitude, latitudeDelta, longitudeDelta, northEast, southWest })
  }

  renderMarker(marker) {
    let image

    if (marker.confirmedAt) {
      if (marker.iluminated) image = iluminadoNaoConfirmadoIco
      image = escuroNaoConfirmadoIco
    } else {
      image = escuroIco
      if (marker.iluminated) image = iluminadoIco
    }

    return (<Marker key={marker.__identity} coordinate={marker.coordinate} image={image} />)
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          onRegionChangeComplete={(position) => this._onChange(position)}
          onRegionChange={(position) => this.onRegionChange(position)}
          ref={mapview => { this.mapview = mapview }}
          region={{
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
          }}
        >
          {this.props.markers.map((marker) => this.renderMarker(marker))}
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
