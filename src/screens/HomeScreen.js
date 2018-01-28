import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Image, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'
import Map from '../components/Map'
import FooterButtons from '../components/FooterButtons'
import { loadLightMarkers, addLightMarker } from '../actions/index'

class App extends Component {
  constructor(props) {
    super(props)
    this.openMenu = this.openMenu.bind(this)
    this.findMe = this.findMe.bind(this)

    this.state = {
      currentCoordinate: {}
    }
  }

  openMenu() {
    this.props.navigation.navigate('DrawerToggle')
  }

  goToCurrentLocation() {
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        this.map.animateToRegion(coords)
        this.setState({ currentCoordinate: coords })
        resolve(coords)
      })
    })
  }

  async findMe() {
    await this.goToCurrentLocation()
    this.loadCurrentCoordinateLightMarkers()
  }

  componentDidMount() {
    setTimeout(() => { this.findMe() }, 1500)
  }

  onMapChange(coordinate) {
    this.setState({ currentCoordinate: coordinate })
    this.loadCurrentCoordinateLightMarkers()
    console.log(`http://maps.google.com/maps?q=${coordinate.latitude.toFixed(7)},${coordinate.longitude.toFixed(7)}&z=21`)
  }

  loadCurrentCoordinateLightMarkers() {
    this.props.loadLightMarkers(this.state.currentCoordinate)
  }

  async onPressPower(iluminated) {
    await this.props.addLightMarker({ ...this.state.currentCoordinate, iluminated })
    this.loadCurrentCoordinateLightMarkers()
  }

  render() {
    return (
      <View style={styles.container}>
        <Map
          ref={map => { this.map = map }}
          markers={this.props.lightMarkers.data}
          onChange={(position) => { this.onMapChange(position) }} />

        <View pointerEvents="none" style={styles.currentLocationMarker}>
          <Image pointerEvents="none"
            style={{ width: 51, height: 51 }}
            source={require('../assets/mark.png')} />
        </View>

        <TouchableOpacity style={styles.back} onPress={this.openMenu}>
          <Icon style={styles.backIcon} name="ios-menu" size={30} color="#000" />
        </TouchableOpacity>

        <FooterButtons
          onPressFindMe={this.findMe}
          onPressOn={() => this.onPressPower(true)}
          onPressOff={() => this.onPressPower(false)}
          style={{ position: 'absolute', bottom: 16, left: 0, right: 0 }} />
      </View>
    )
  }
}

App.propTypes = {
  navigation: PropTypes.any,
  lightMarkers: PropTypes.shape({
    data: PropTypes.array
  }).isRequired,
  addLightMarker: PropTypes.func,
  loadLightMarkers: PropTypes.func
}

const mapStateToProps = ({ lightMarkers }) => ({ lightMarkers })
const mapDispatchToProps = ({ loadLightMarkers, addLightMarker })

export default connect(mapStateToProps, mapDispatchToProps)(App)

const styles = StyleSheet.create({
  currentLocationMarker: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  scrollview: {
    alignItems: 'center',
    paddingVertical: 40
  },
  button: {
    flex: 1,
    marginTop: 10,
    backgroundColor: 'rgba(220,220,220,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20
  },
  back: {
    position: 'absolute',
    top: 16,
    left: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  backIcon: {
    textShadowColor: 'white',
    elevation: 1,
    shadowOpacity: 0.5,
    textShadowRadius: 5,
    textShadowOffset: { width: 0, height: 1 }
  }
})
