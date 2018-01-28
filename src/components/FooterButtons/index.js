import React from 'react'
import PropTypes from 'prop-types'
import {
  TouchableOpacity,
  Text,
  Image,
  View
} from 'react-native'
import styles from './styles'

const Button = ({ children, onPress, style, textStyle }) => {

  const Wrapper = (
    <View style={[{ backgroundColor: '#000', paddingVertical: 16, borderRadius: 50, borderWidth: 2, borderColor: '#FFF' }, style]}>
      <Text style={[{ textAlign: 'center', color: '#FFF' }, textStyle]}>{children}</Text>
    </View>
  )

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} style={{ flex: 1, paddingHorizontal: 8 }} children={Wrapper} />
    )
  }

  return (
    <View style={{ flex: 1, paddingHorizontal: 8 }} children={Wrapper} />
  )
}
Button.propTypes = {
  children: PropTypes.node,
  style: View.propTypes.style,
  textStyle: Text.propTypes.style,
  onPress: PropTypes.func
}

const FooterButtons = ({ style, onPressFindMe, onPressOn, onPressOff, loading }) => (
  <View style={[styles.container, style]}>
    <TouchableOpacity style={styles.findMe} onPress={onPressFindMe}>
      <Image pointerEvents="none"
        style={{ width: 41, height: 41 }}
        source={require('../../assets/radar.png')} />
    </TouchableOpacity>
    <View style={{ flex: 1, paddingHorizontal: 8, flexDirection: 'row', justifyContent: 'space-around' }}>
      {loading && <Button>Aguarde...</Button>}
      {!loading && <Button style={{ backgroundColor: '#212121' }} onPress={onPressOff}>Escuro</Button>}
      {!loading && <Button style={{ backgroundColor: '#ffce00' }} textStyle={{ color: '#212121' }} onPress={onPressOn}>Iluminado</Button>}
    </View>
  </View>
)

FooterButtons.propTypes = {
  style: View.propTypes.style,
  loading: PropTypes.bool,
  onPressFindMe: PropTypes.func,
  onPressOn: PropTypes.func,
  onPressOff: PropTypes.func
}

export default FooterButtons
