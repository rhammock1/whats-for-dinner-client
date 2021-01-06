export default function findRestaurant(restaurants, restaurantId) {
  console.log(restaurants);
  const restaurant = restaurants.filter((each) => each.id === parseFloat(restaurantId));
  console.log(restaurant);
  return restaurant[0];
}
