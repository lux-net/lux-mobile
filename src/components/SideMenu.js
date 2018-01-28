import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { NavigationActions } from 'react-navigation'
import { ScrollView, Text, View, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicon from 'react-native-vector-icons/Ionicons'

const styles = {
  container: {
    paddingTop: 20,
    flex: 1
  },
  navItemStyle: {
    paddingVertical: 16
  },
  navSectionStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'lightgrey'
  },
  sectionHeadingStyle: {
    paddingVertical: 10,
    paddingHorizontal: 5
  },
  footerContainer: {
    paddingBottom: 16
  }
}

const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Login' })
  ]
})

class SideMenu extends Component {
  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    })
    this.props.navigation.dispatch(navigateAction)
  }

  navigateToLogin = () => () => {
    this.props.screenProps.rootNavigation.dispatch(resetAction)
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View>
            <Text style={styles.sectionHeadingStyle}>
              Nome do fulano
            </Text>
            <View style={styles.navSectionStyle}>
              <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Page1')}>
                Page1
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.sectionHeadingStyle}>
              Section 2
            </Text>
            <View style={styles.navSectionStyle}>
              <Ionicon style={{ marginLeft: 16, marginRight: 16 }} name="md-exit" size={20} color="#5C2D91" />
              <Text style={styles.navItemStyle} onPress={this.navigateToLogin()}>
                Logout
              </Text>
            </View>
          </View>
        </ScrollView>
        <View style={styles.footerContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Text>Feito com muito</Text>
            <Icon style={{ marginHorizontal: 4 }} name="sleep" size={20} color="#5C2D91" />
            <Text>pela AgzHack</Text>
          </View>
        </View>
      </View>
    )
  }
}

SideMenu.propTypes = {
  navigation: PropTypes.object
}

export default SideMenu
