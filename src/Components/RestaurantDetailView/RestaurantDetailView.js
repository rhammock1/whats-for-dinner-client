/* eslint-disable react/destructuring-assignment */
import React from 'react';

import Context from '../../Context';
import findRestaurant from '../../helper-functions';
import './RestaurantDetailView.css';

class RestaurantDetailView extends React.Component {
  static contextType = Context;

  static defaultProps = {
    match: {
      params: {
        restaurantId: 0,
      },
    },
  }

  state = {
    error: null,
  }

  handleBack = () => {
    this.props.history.goBack();
  }

  render() {
    const { restaurantId } = this.props.match.params;
    const { restaurants, userRestaurants } = this.context;
    const allRestaurants = [...restaurants, ...userRestaurants];
    const restaurant = findRestaurant(allRestaurants, restaurantId) || {};
    const { error } = this.state;
    return (
      <section>
        <div className="details-container">
          <div role="alert">
            {error && <p className="red">{error.message}</p>}
          </div>
          <h3>
            <a rel="noreferrer" target="_blank" href={restaurant.web_url}>
              {restaurant.title}
              <br />
              {' '}
              <span className="visit">Click to visit restaurant website</span>
            </a>
          </h3>

          <div className="details-container">
            <p>
              Phone Number:
              {restaurant.phone_number}
            </p>
            <p>
              Street Address:
              {restaurant.restaurant_address}
            </p>
          </div>
          <button type="button" onClick={this.handleBack} className="back-button">Back</button>
        </div>
      </section>
    );
  }
}

export default RestaurantDetailView;
