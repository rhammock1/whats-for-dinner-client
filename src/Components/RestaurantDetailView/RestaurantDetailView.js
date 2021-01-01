import React from 'react';
import { Link } from 'react-router-dom';
import Context from '../../Context';
import { findRestaurant } from '../../helper-functions';
import './RestaurantDetailView.css';

class RestaurantDetailView extends React.Component {
  static contextType = Context;
  static defaultProps = {
    match: {
      params: {
        restaurantId: 0
      },
    },
  }
  handleBack = () => {
    this.props.history.goBack()
  }
  render() {
    
    const restaurants = [...this.context.restaurants,...this.context.userRestaurants];

    const { restaurantId } = this.props.match.params;
    const restaurant = findRestaurant(restaurants, restaurantId) || {}
    
    return (
      <section>
      <div className='details-container'>
    <a rel="noreferrer"target='_blank' href={restaurant.web_url}><h3>{restaurant.title}</h3></a>
    <div className='details-container'>
      <p>{restaurant.phone_number}</p>
      <p>{restaurant.restaurant_address}</p>
    </div>
    <button onClick={this.handleBack} className='back'>Back</button>
    </div>
    </section>
      )
    
  }
}

export default RestaurantDetailView;