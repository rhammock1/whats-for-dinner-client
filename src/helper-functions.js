export default function findRestaurant(restaurants, restaurantId) {
  const restaurant = restaurants.filter((each) => each.id === parseFloat(restaurantId));
  return restaurant[0];
}
