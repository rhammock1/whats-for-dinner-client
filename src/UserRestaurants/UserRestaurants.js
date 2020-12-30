import React from 'react';
import { Link } from 'react-router-dom';
import apiService from '../services/api-service';


class UserRestaurants extends React.Component {

  state = {
    restaurants: [],
    added: false,
    favorites: [],
    deleted: false,
  }


  componentDidMount() {
    const {userId} = this.props.match.params
    apiService.getUsersThings(userId, 'restaurants')
      .then(restaurants => this.setState({restaurants}))
      .catch(error => console.error(error))
    apiService.getUsersThings(userId, 'favorites')
      .then(favorites => this.setState({favorites}))
      .catch(error => console.error(error))
}

handleAddToFavorites = event => {
  event.preventDefault();
  const restaurantId = event.target.id;
  const {userId} = this.props.match.params
  const newFavorite = {
    what_it_is: 'restaurant',
    user_id: userId,
    item_id: restaurantId
  }
  
  console.log(newFavorite)
  apiService.postNewFavorite(userId, newFavorite)
    .then(() => {this.setState({ added: true })})
    .then(() => {
      setTimeout(
        () => {this.setState({ added: false})},
        5000
      )
    })
    .catch(error => console.error(error))
}

handleRemoveFromFavorites = event => {
  event.preventDefault();
  console.log('hello');
  const {userId} = this.props.match.params;
  const favoritedRestaurants = this.state.favorites.filter(favorite => {
      return favorite.what_it_is === 'restaurant'
    })
  
  let restaurantId = event.target.id;
  
  let favoriteToDelete = favoritedRestaurants.filter(favorite => {
  
    return favorite.item_id === parseFloat(restaurantId)
    })
  
  let favoriteId = favoriteToDelete[0].id
 
  apiService.deleteFavorite(userId, favoriteId)
    .then(() => {this.setState({ deleted: true })})
    .then(() => {
      setTimeout(
        () => {this.setState({ deleted: false})},
        5000
      )
    })
    .catch(error => console.error(error))

}
  render() {
    const favorites = this.state.favorites
    const favoritedRestaurants = favorites.filter(favorite => {
      return favorite.what_it_is === 'restaurant'
    })
    // favoritedRestaurants.sort((a, b) => {
    //   return a.item_id - b.item_id;
    // })
   

    const restaurantsInState = this.state.restaurants;

   
    let filtered = [];
 
    let restaurantIds = restaurantsInState.map(restaurant => {
        return restaurant.id
      })

    for(let i = 0; i < favoritedRestaurants.length; i++) {
      if (restaurantIds.includes(favoritedRestaurants[i].item_id)) {
        
        filtered.push(restaurantsInState.filter(restaurant => restaurant.id === favoritedRestaurants[i].item_id))
        let restaurantIndex = restaurantsInState.findIndex(restaurant => {
          return restaurant.id === favoritedRestaurants[i].item_id
        })
        restaurantsInState.splice(restaurantIndex, 1);
      }

    }
      console.log(filtered)


    let restaurants=[];
    filtered.map(array => {
 
      array.map(restaurant => {
        
        restaurants.push(restaurant)
      })
    })

    
    return (
      <section className='user-restaurants'>
        <h2>My Restaurants</h2>
        <div className='restaurant-container'>
          {restaurants.map(restaurant => {
              
            return (
              <div key={restaurant.id}>
                <Link to={`/restaurants/${restaurant.id}`}><p>{restaurant.title} <span id='style'>{restaurant.style}</span></p></Link>
                <div className='favorite'>
                  <p>Remove from favorites</p>
                  <img id={restaurant.id} onClick={event => this.handleRemoveFromFavorites(event)}src="https://img.icons8.com/office/16/000000/add-to-favorites--v2.png"/>
                </div>
                {/* {this.state.deleted
                  ? <div className='added'>
                      <p>Successfully deleted from favorites</p>
                    </div>
                  : null
                } */}
              </div>
            )
          })}
          {restaurantsInState.map(restaurant => {
            return (
              <div key={restaurant.id}>
                <Link to={`/restaurants/${restaurant.id}`}><p>{restaurant.title} <span id='style'>{restaurant.style}</span></p></Link>
                <div className='favorite'>
                  <p>Add to favorites</p>
                  <img id={restaurant.id} onClick={event => this.handleAddToFavorites(event)}src="https://img.icons8.com/office/16/000000/add-to-favorites--v2.png"/>
                </div>
                {this.state.added
                  ? <div className='added'>
                      <p>Successfully added to favorites</p>
                    </div>
                  : null
                }
              </div>
                )
          })}
        </div>
      </section>

      )
  }
}

export default UserRestaurants;