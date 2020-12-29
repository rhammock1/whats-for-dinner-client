import config from '../config';
import TokenService from './token-service';

const apiService = {
  getUsersThings(userId, thing) {

    return fetch(`${config.API_ENDPOINT}/dinner/${userId}/${thing}`, {
      headers: {
        'Authorization': `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then(res => {
        if(!res.ok) {
          return res.json().then(e => Promise.reject(e))
        }
        return res.json()
      })
      .then(things => {
        
          return things
      })
      .catch(error => {
      console.error({ error })
    })
  },

}

export default apiService;