let API_ENDPOINT;

if (process.env.NODE_ENV === 'development') {
  API_ENDPOINT = 'http://localhost:8080/api'
} else if (process.env.NODE_ENV === 'production') {
  API_ENDPOINT = 'https://gentle-woodland-76876.herokuapp.com/api'
}

//eslint-disable-next-line
export default { API_ENDPOINT, TOKEN_KEY: 'dinner-client-auth-token' };
