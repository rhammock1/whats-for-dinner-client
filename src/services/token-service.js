import config from '../config';

const TokenService = {
  saveAuthToken(token) {
    window.localStorage.setItem(config.TOKEN_KEY, token)
  },
  saveUserName(user_name) {
    window.localStorage.setItem('user_name', user_name)
  },
  getUserName() {
    return window.localStorage.getItem('user_name')
  },
  clearUserName() {
    window.localStorage.removeItem('user_name')
  },
  getAuthToken() {
    return window.localStorage.getItem(config.TOKEN_KEY)
  },
  clearAuthToken() {
    window.localStorage.removeItem(config.TOKEN_KEY)
  },
  hasAuthToken() {
    return !!TokenService.getAuthToken()
  },
  makeBasicAuthToken(userName, password) {
    return window.btoa(`${userName}:${password}`)
  }
};

export default TokenService;