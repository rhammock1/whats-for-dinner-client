export function findRestaurant(restaurants, restaurantId) {
  console.log(restaurants)
  let restaurant = restaurants.filter(restaurant => {
    if(restaurant.id == restaurantId) {
      
      return restaurant
    }} )
  if (restaurant.length === 0) {
    console.log(restaurants)
    restaurant = restaurants.filter(restaurant => restaurant.id == restaurantId)
  }
  console.log(restaurant)
  return restaurant[0];
}

