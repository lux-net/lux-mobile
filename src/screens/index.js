import React from 'react'
import { DrawerNavigator, StackNavigator } from 'react-navigation'
import { View, Text, Button } from 'react-native'
import HomeScreen from './HomeScreen'
import LoginScreen from './LoginScreen'
import SideMenu from '../components/SideMenu'

const ProfileScreen = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Profile Screen</Text>
  </View>
)
// const LoginScreen = ({ navigation }) => (
//   <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//     <Text>Home Screen</Text>
//     <Button
//       onPress={() => navigation.navigate('Drawer')}
//       title="Go to details"
//     />
//   </View>
// );

const RootDrawer = DrawerNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    Profile: {
      screen: ProfileScreen
    }
  },
  {
    contentComponent: SideMenu
  }
)

const AppNavigator = StackNavigator(
  {
    Login: { screen: LoginScreen },
    Drawer: { screen: ({ navigation }) => <RootDrawer screenProps={{ rootNavigation: navigation }} /> }
  },
  {
    index: 0,
    initialRouteName: 'Login',
    headerMode: 'none'
  }
)
export default AppNavigator
