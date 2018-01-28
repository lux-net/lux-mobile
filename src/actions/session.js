import { AccessToken } from 'react-native-fbsdk'

let token = null

export const getAccessToken = async () => {
  if (token) return Promise.resolve(token)

  const { accessToken } = await AccessToken.getCurrentAccessToken()

  token = accessToken.toString()

  return token
}

let currentUser = null

export const setCurrentUser = (user) => { currentUser = user }
export const getCurrentUser = () => currentUser
