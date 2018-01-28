import React from 'react'
import PropTypes from 'prop-types'
import {
  TouchableOpacity,
  Text,
  View
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import styles from './styles'

const FooterButtons = ({ style, onPressFindMe, onPressOn, onPressOff }) => (
  <View style={[styles.container, style]}>
    <TouchableOpacity style={styles.findMe} onPress={onPressFindMe}>
      <Icon style={styles.findMeIcon} name="md-locate" size={30} color="#000" />
    </TouchableOpacity>
    <View style={{ flex: 1, paddingHorizontal: 8, flexDirection: 'row', justifyContent: 'space-around' }}>
      <View style={{ flex: 1, paddingHorizontal: 8 }}>
        <TouchableOpacity onPress={onPressOn} style={{ backgroundColor: '#000', paddingVertical: 16 }}>
          <Text style={{ textAlign: 'center', color: '#FFF' }}>Desligado</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, paddingHorizontal: 8 }}>
        <TouchableOpacity onPress={onPressOff} style={{ backgroundColor: '#000', paddingVertical: 16 }}>
          <Text style={{ textAlign: 'center', color: '#FFF' }}>Ligado</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
)

FooterButtons.propTypes = {
  style: View.propTypes.style,
  onPressFindMe: PropTypes.func,
  onPressOn: PropTypes.func,
  onPressOff: PropTypes.func
}

export default FooterButtons
