import { LoginManager, AccessToken } from 'react-native-fbsdk'
import PropTypes from 'prop-types'
import React from 'react'
import {
  View, StyleSheet, TouchableOpacity,
  Text, Button
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'
import { saveFacebookToken } from '../actions'

class LoginScreen extends React.PureComponent {

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired
    }),
    saveFacebookToken: PropTypes.func.isRequired
  }

  async doLogin() {
    try {
      const result = await LoginManager.logInWithReadPermissions(['public_profile', 'email'])
      if (result.isCancelled) return

      const { accessToken } = await AccessToken.getCurrentAccessToken()

      this.props.saveFacebookToken(accessToken.toString())
    } catch (error) {
      alert('Login fail with error: ' + error)
      return
    }
    this.props.navigation.navigate('Drawer')
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <View style={[StyleSheet.absoluteFillObject]}>
          <ActivityIndicator size="large" color="#5C2D91" />
          <ActivityIndicator size="small" color="#5C2D91" />
          <ActivityIndicator size="large" color="#5C2D91" />
          <ActivityIndicator size="small" color="#5C2D91" />
        </View> */}

        <View style={styles.containerWrapper}>
          <View style={styles.logoContainer}>
            <Text style={{ fontSize: 60 }}>LOGO</Text>
          </View>

          <TouchableOpacity style={{ backgroundColor: '#3b5998', flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 8 }} onPress={() => this.doLogin()}>
            <Icon style={{ marginRight: 16 }} name="logo-facebook" size={40} color="#FFF" />
            <Text style={{ color: '#FFF', fontWeight: '500', fontSize: 24 }}>Entrar com Facebook</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center' },
  logoContainer: { alignItems: 'center', backgroundColor: '#AEF', marginBottom: 60 },
  containerWrapper: { paddingHorizontal: 16 }
})

const mapStateToProps = () => ({})
const mapDispatchToProps = ({ saveFacebookToken })

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
