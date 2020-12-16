import config from './config';

export function findRestaurant(restaurants, restaurantId) {
  
  let restaurant = restaurants.filter(restaurant =>
    restaurant.id == restaurantId)
  
  return restaurant[0];
};

//  export function findRecipe(recipeId) {
    
//     return fetch(`${config.API_ENDPOINT}/recipes/${recipeId}`)
//       .then(res => {
//         if(!res.ok) {
//           return res.json().then(e => Promise.reject(e))
//         }
//         return res.json()
//       })
//       .then(recipe => {
//         console.log(recipe)
//          return recipe
//       })
//       .catch(error => {
//       console.error({ error })
//     })
//   }

