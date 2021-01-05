import config from '../config';
import TokenService from './token-service';

const apiService = {
  getUsersThings(userId, thing) {
    return fetch(`${config.API_ENDPOINT}/dinner/${userId}/${thing}`, {
      headers: {
        Authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((e) => Promise.reject(e));
        }
        return res.json();
      })
      .then((things) => things);
  },
  postNewThing(type, newThing) {
    return fetch(`${config.API_ENDPOINT}/${type}`, {
      method: 'POST',
      headers: {
        Authorization: `bearer ${TokenService.getAuthToken()}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify(newThing),
    })
      .then((res) => ((!res.ok)
        ? res.json().then((e) => Promise.reject(e))
        : res.json()));
  },

  postIngredients(recipeId, ingredients) {
    return fetch(`${config.API_ENDPOINT}/recipes/${recipeId}`, {
      method: 'POST',
      headers: {
        Authorization: `bearer ${TokenService.getAuthToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ingredients),
    });
  },
  postNewFavorite(userId, thing) {
    return fetch(`${config.API_ENDPOINT}/dinner/${userId}/favorites`, {
      method: 'POST',
      headers: {
        Authorization: `bearer ${TokenService.getAuthToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(thing),
    });
  },
  deleteFavorite(userId, favoriteId) {
    return fetch(`${config.API_ENDPOINT}/dinner/${userId}/favorites`, {
      method: 'DELETE',
      headers: {
        id: favoriteId,
        Authorization: `bearer ${TokenService.getAuthToken()}`,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((e) => Promise.reject(e));
        }
        return res;
      });
  },
  deleteThing(thingId, thing) {
    return fetch(`${config.API_ENDPOINT}/${thing}/${thingId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `bearer ${TokenService.getAuthToken()}`,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((e) => Promise.reject(e));
        }
        return res;
      });
  },
  deleteIngredient(ingredientId, recipeId) {
    return fetch(`${config.API_ENDPOINT}/recipes/${recipeId}`, {
      method: 'DELETE',
      headers: {
        ingredientId,
        Authorization: `bearer ${TokenService.getAuthToken()}`,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((e) => Promise.reject(e));
        }
        return res;
      });
  },
  deleteAllIngredientsAndRecipe(recipeId) {
    return fetch(`${config.API_ENDPOINT}/recipes/${recipeId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `bearer ${TokenService.getAuthToken()}`,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((e) => Promise.reject(e));
        }
        return res;
      });
  },
};

export default apiService;
