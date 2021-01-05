import config from '../config';

const TokenService = {
  saveAuthToken(token) {
    window.localStorage.setItem(config.TOKEN_KEY, token);
  },
  setHasVisited() {
    window.localStorage.setItem('hasVisited', true);
  },
  getHasVisited() {
    return window.localStorage.getItem('hasVisited');
  },
  saveUserName(user_name) {
    window.localStorage.setItem('user_name', user_name);
  },
  getUserName() {
    return window.localStorage.getItem('user_name');
  },
  saveUserId(userId) {
    window.localStorage.setItem('userId', userId);
  },
  getUserId() {
    return window.localStorage.getItem('userId');
  },
  clearAll() {
    const items = ['user_name', 'userId', config.TOKEN_KEY];
    items.forEach((item) => window.localStorage.removeItem(item));
  },
  getAuthToken() {
    return window.localStorage.getItem(config.TOKEN_KEY);
  },
  hasAuthToken() {
    return !!TokenService.getAuthToken();
  },
  makeBasicAuthToken(userName, password) {
    return window.btoa(`${userName}:${password}`);
  },
};

export default TokenService;
