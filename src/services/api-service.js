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
  postNewThing(type, newThing) {
    
    return fetch(`${config.API_ENDPOINT}/${type}`, {
      method: 'POST',
      headers: {
        'Authorization': `bearer ${TokenService.getAuthToken()}`,
        'content-type': 'application/json'
      },
      body: JSON.stringify(newThing),
    })
      .then(res => 
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },

  postIngredients(recipeId, ingredients) {
    return fetch(`${config.API_ENDPOINT}/recipes/${recipeId}`, {
      method: 'POST',
      headers: {
        'Authorization': `bearer ${TokenService.getAuthToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ingredients)
    })
    
  },
  postNewFavorite(userId, thing) {
    return fetch(`${config.API_ENDPOINT}/dinner/${userId}/favorites`, {
      method: 'POST',
      headers: {
        'Authorization': `bearer ${TokenService.getAuthToken()}`,
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(thing)
    })
  }

}

export default apiService;