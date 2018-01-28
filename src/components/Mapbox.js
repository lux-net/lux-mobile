import React, { Component } from 'react'
import PropType from 'prop-types'
import { StyleSheet, Image, View } from 'react-native'
import Mapbox from '@mapbox/react-native-mapbox-gl'

Mapbox.setAccessToken('pk.eyJ1Ijoicm9kb2xmb3NpbHZhIiwiYSI6ImNqY3l1bWE4MTBpbzgzM24yc202bndjOGsifQ.o1CIQc0bmzSgzrgNpXxBIQ')

class MyMapbox extends Component {
  constructor(props) {
    super(props)
    this._onChange = this._onChange.bind(this)
  }

  animateToRegion({ latitude, longitude }) {
    this.mapview.flyTo([longitude, latitude])
  }

  _onChange({ properties, geometry }) {
    const longitude = geometry.coordinates[0]
    const latitude = geometry.coordinates[1]
    const northEast = {
      longitude: properties.visibleBounds[0][0],
      latitude: properties.visibleBounds[0][1]
    }
    const southWest = {
      longitude: properties.visibleBounds[1][0],
      latitude: properties.visibleBounds[1][1]
    }

    this.props.onChange({ latitude, longitude, northEast, southWest })
  }
  // renderMarker(marker) {
  //   let image

  //   if (marker.confirmedAt) {
  //     if (marker.iluminated) image = require('../assets/iluminado-nao-confirmado.png')
  //     image = require('../assets/escuro-nao-confirmado.png')
  //   } else {
  //     image = require('../assets/escuro.png')
  //     if (marker.iluminated) image = require('../assets/iluminado.png')
  //   }

  //   return (<MapView.Marker key={marker.__identity} coordinate={marker.coordinate} image={image} />)
  // }

  renderMarker(marker) {
    let image

    if (marker.confirmedAt) {
      if (marker.iluminated) image = require('../assets/iluminado-nao-confirmado.png')
      image = require('../assets/escuro-nao-confirmado.png')
    } else {
      image = require('../assets/escuro.png')
      if (marker.iluminated) image = require('../assets/iluminado.png')
    }

    return (
      <Mapbox.PointAnnotation
        key={marker.__identity}
        id={marker.__identity}
        coordinate={[marker.coordinate.longitude, marker.coordinate.latitude]}>
        <Image source={image} width={10} height={10} />
      </Mapbox.PointAnnotation>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Mapbox.MapView
          onRegionDidChange={this._onChange}
          ref={mapview => { this.mapview = mapview }}
          styleURL={Mapbox.StyleURL.Street}
          zoomLevel={15}
          centerCoordinate={[11.256, 43.770]}
          style={styles.container}>

          {this.props.markers.map((marker) => this.renderMarker(marker))}

        </Mapbox.MapView>
      </View>
    )
  }
}

MyMapbox.propTypes = {
  onChange: PropType.func,
  markers: PropType.array
}

MyMapbox.defaultProps = {
  markers: []
}

export default MyMapbox

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
})
