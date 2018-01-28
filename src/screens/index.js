import React from 'react'
import { DrawerNavigator } from 'react-navigation'
import { View, Text } from 'react-native'
import HomeScreen from './HomeScreen'
import SideMenu from '../components/SideMenu'

const ProfileScreen = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Profile Screen</Text>
  </View>
)

const RootDrawer = DrawerNavigator({
  Home: {
    screen: HomeScreen
  },
  Profile: {
    screen: ProfileScreen
  }
}, {
  contentComponent: SideMenu
})

export default RootDrawer
