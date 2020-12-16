
export function findRestaurant(restaurants, restaurantId) {
  
  let restaurant = restaurants.filter(restaurant =>
    restaurant.id === parseFloat(restaurantId))
  
  return restaurant[0];
};



