import React from 'react';
import { Link } from 'react-router-dom';
import Context from '../Context';
import { findRestaurant } from '../helper-functions';

class RestaurantDetailView extends React.Component {
  static contextType = Context;
  state = {
    restaurant: {},
  }
  componentDidMount() {
    
    
  }

  render() {
    
    const restaurants = this.props.restaurants;
    
    const { restaurantId } = this.props.match.params;
    const restaurant = findRestaurant(restaurants, restaurantId) || {}
    console.log(restaurant);
    return (
      <div className='details-container'>
    <a rel="noreferrer"target='_blank' href={restaurant.web_url}><h3>{restaurant.title}</h3></a>
    <div className='details-container'>
      <p>{restaurant.phone_number}</p>
      <p>{restaurant.restaurant_address}</p>
    </div>
    <Link to={'/'}><button>Back</button></Link>
    </div>
    
      )
    
  }
}

export default RestaurantDetailView;