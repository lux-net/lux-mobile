/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  TouchableOpacity,
  Text,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Map from './Map'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component<{}> {

  renderBackButton() {
    return (
      <TouchableOpacity
        style={styles.back}
        onPress={() => this.setState({ Component: null })}
      >
        <Icon style={styles.backIcon} name="ios-menu" size={30} color="#000" />
      </TouchableOpacity>
    );
  }

  renderLocateButton() {
    return (
      <TouchableOpacity
        style={styles.locate}
        onPress={() => this.setState({ Component: null })}
      >
        <Icon style={styles.backIcon} name="md-locate" size={30} color="#000" />
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Map />
        {this.renderBackButton()}
        {this.renderLocateButton()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  scrollview: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  button: {
    flex: 1,
    marginTop: 10,
    backgroundColor: 'rgba(220,220,220,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  back: {
    position: 'absolute',
    top: 16,
    left: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  locate: {
    position: 'absolute',
    bottom: 16,
    right: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    textShadowColor: 'white',
    elevation: 1,
    shadowOpacity: 0.5,
    textShadowRadius: 5,
    textShadowOffset: { width: 0, height: 1 }
  }
});
