import { LoginManager, LoginButton, AccessToken } from 'react-native-fbsdk'
import React from 'react'
import { View, Button } from 'react-native'
import { connect } from 'react-redux'
import { saveFacebookToken } from '../actions'

const doLogin = async () => {
  try {
    const result = await LoginManager.logInWithReadPermissions(['public_profile'])
    if (result.isCancelled) return

    const { accessToken } = await AccessToken.getCurrentAccessToken()

    saveFacebookToken(accessToken.toString())
    console.log(accessToken.toString())
  } catch (error) {
    alert('Login fail with error: ' + error)
  }
}

const LoginScreen = ({ saveFacebookToken, navigation }) => (
  <View>
    <Button onPress={() => doLogin().then(() => navigation.navigate('Drawer'))} title="Fazer login" />
  </View>
)

const mapStateToProps = () => ({})
const mapDispatchToProps = ({ saveFacebookToken })

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
