import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-end'
  },
  findMe: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  findMeIcon: {
    textShadowColor: 'white',
    elevation: 1,
    shadowOpacity: 0.5,
    textShadowRadius: 5,
    textShadowOffset: { width: 0, height: 1 }
  }
})
