import React from 'react';
import { Link } from 'react-router-dom';
import apiService from '../services/api-service';


class UserRestaurants extends React.Component {

  state = {
    restaurants: [],

  }


  componentDidMount() {
    const {userId} = this.props.match.params
    apiService.getUsersThings(userId, 'restaurants')
      .then(restaurants => this.setState({restaurants}))
      .catch(error => console.error(error))
}
  render() {
    
    return (
      <section className='user-restaurants'>
        <h2>My Restaurants</h2>
        <div className='restaurant-container'>
          {this.state.restaurants.map(restaurant => {
            return (
              <div key={restaurant.id}>
                <Link to={`/restaurants/${restaurant.id}`}><p>{restaurant.title} <span id='style'>{restaurant.style}</span></p></Link>
              </div>)
          })}
        </div>
      </section>

      )
  }
}

export default UserRestaurants;