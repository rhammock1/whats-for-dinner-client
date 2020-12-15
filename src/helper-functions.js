export function findRestaurant(restaurants, restaurantId) {
  
  let restaurant = restaurants.filter(restaurant =>
    restaurant.id == restaurantId)
  
  return restaurant[0];
};



