import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { NavigationActions } from 'react-navigation'
import { ScrollView, Text, Image, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicon from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'
import { auth } from '../actions/index'

const styles = {
  container: {
    paddingTop: 4,
    flex: 1
  },
  navItemStyle: {
    paddingVertical: 16
  },
  navSectionStyle: {
    flexDirection: 'row',
    alignItems: 'center'
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
          <View style={{ flexDirection: 'row', marginBottom: 16, alignItems: 'center' }}>
            <View style={{ width: 80, height: 80, marginRight: 14 }}>
              <Image source={{ uri: this.props.auth.data.avatar }} style={{ height: 80, width: 80, borderRadius: 80, resizeMode: 'stretch', margin: 5 }} />
            </View>
            <View>
              <Text style={{ fontWeight: '500', fontSize: 20, color: '#333' }}>
                {this.props.auth.data.name}
              </Text>
              <Text style={{ marginTop: 0, fontSize: 14, color: '#666' }}>
                {this.props.auth.data.email}
                {/* {this.props.auth.data.__identity} */}
              </Text>
            </View>
          </View>

          <View style={styles.navSectionStyle}>
            <Ionicon style={{ marginLeft: 16, marginRight: 16 }} name="md-exit" size={20} color="#5C2D91" />
            <Text style={styles.navItemStyle} onPress={this.navigateToLogin()}>
              Logout
            </Text>
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


const mapStateToProps = ({ auth }) => ({ auth })
const mapDispatchToProps = ({})

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu)
