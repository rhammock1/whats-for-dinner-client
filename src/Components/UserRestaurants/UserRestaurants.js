import React from 'react';
import { Link } from 'react-router-dom';
import apiService from '../../services/api-service';

// TODO:
//  Favorites becomes undefined on login, need to assign a default value to prevent that
//  Need to add validation so there wont be duplicates in this.state.favorites
//  Remove Console.log()
//  Needs to be refactored to move some things to helper functions or the like. This file is too large

class UserRestaurants extends React.Component {

  static defaultProps = {
    match: {
      params: {
        userId: 0,
      },
    },
  }

  state = {
    restaurants: [],
    splicedRestaurants: [],
    added: false,
    favorites: [],
    deleted: false,
    favoriteRestaurants: [],
  }


  componentDidMount() {
    // Makes API calls to get restaurants and favoritees
    // Should prolly be refactored so it uses context from the APP component instead of making it's own api request?
    const {userId} = this.props.match.params
    apiService.getUsersThings(userId, 'restaurants')
      .then(restaurants => this.setState({restaurants}))
      .catch(error => console.error(error))
    apiService.getUsersThings(userId, 'favorites')
      .then(favorites => this.setState({favorites}))
      .then(() => this.handleFavorites())
      .catch(error => console.error(error))
    
    }

  
// Removes duplicates from favoritedRestaurants array
// Compares favorited restaurants with state.restaurants to prevent duplicate rendering
// 
  handleFavorites = () => {
    const favorites = this.state.favorites
    const favoritedRestaurants = favorites.filter(favorite => {
      return favorite.what_it_is === 'restaurant'
    })
    let removedDoubles = [];
    for(let i = 0; i < favoritedRestaurants.length; i++) {
      
      removedDoubles.push(favoritedRestaurants.filter(favorite => {
        if (favorite.item_id === favoritedRestaurants[i].item_id) {
          return favorite
      } 
      }))
    }
  
    let doubleFree = []
    removedDoubles.filter(array => {
      if(array.length < 2) {
        
        return doubleFree.push(array[0])
      }
    })
    
    removedDoubles = removedDoubles.filter(array => {
      if(array.length >= 2) {
        return array
      }
    })
  
    let singleDouble;
    singleDouble = removedDoubles.map(double => double[0])
    
    const set = new Set(singleDouble)
    let iterator = set.entries()
    
    for(let i = 0; i < set.size; i++) {
      doubleFree.push(iterator.next().value[0])
    }
    
  
    const restaurantsInState = [...this.state.restaurants];
   
    let filtered = [];
    let newArray;
    for(let i = 0; i < doubleFree.length; i++) {
      
      filtered.push(restaurantsInState.filter(restaurant => {

        if(restaurant.id === doubleFree[i].item_id) {
        
          return restaurant;
        }
        }))
     
      let itemIds = doubleFree.map(each => each.item_id)
      
      newArray = restaurantsInState.filter(restaurant => !itemIds.includes(restaurant.id))
    


    }


    let restaurants=[];
    filtered.map(array => 
 
      array.map(restaurant => 
        
        restaurants.push(restaurant)
      )
    )
    
    
  this.setState({ favoriteRestaurants: restaurants })
  this.setState({ splicedRestaurants: newArray })

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
  

  apiService.postNewFavorite(userId, newFavorite)
    .then(() => {this.setState({ added: true })})
    .then(() => {
      apiService.getUsersThings(userId, 'favorites')
      .then(favorites => {
         this.setState({favorites})})
      .then(async () => await this.handleFavorites())
      .catch(error => console.error(error))
    })
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
      apiService.getUsersThings(userId, 'favorites')
      .then(favorites => this.setState({favorites}))
      .then(async () => await this.handleFavorites())
      .catch(error => console.error(error)) 
    })
    .then(() => {
      setTimeout(
        () => {this.setState({ deleted: false})},
        5000
      )
    })
    .catch(error => console.error(error))
  

}
  render() {
    const restaurants = this.state.favoriteRestaurants;
    const restaurantsInState = this.state.splicedRestaurants || [{}];
    const {userId} = this.props.match.params;
   
    
    return (
      <section className='user-restaurants'>
        <h2>My Restaurants</h2>
        <Link to={`/${userId}/newThing`}><button>Add new restaurant </button></Link>
        <div className='restaurant-container'>
          {restaurants.map(restaurant => {
              
            return (
              <div key={restaurant.id}>
                <Link to={`/restaurants/${restaurant.id}`}><p>{restaurant.title} <span id='style'>{restaurant.style}</span></p></Link>
                <div className='favorite'>
                  <p>Remove from favorites</p>
                  <img alt='button-to-remove-from-favorite' id={restaurant.id} onClick={event => this.handleRemoveFromFavorites(event)}src="https://img.icons8.com/office/16/000000/add-to-favorites--v2.png"/>
                </div>
                {this.state.deleted
                  ? <div className='added'>
                      <p>Successfully removed from favorites</p>
                    </div>
                  : null
                }
              </div>
            )
          })}
          {restaurantsInState.map((restaurant, index) => {
            return (
              <div key={index}>
                <Link to={`/restaurants/${restaurant.id}`}><p>{restaurant.title} <span id='style'>{restaurant.style}</span></p></Link>
                {(restaurantsInState.length < 1)
                  ? <div className='favorite'>
                      <p>Add to favorites</p>
                      <img alt='button-to-add-to-favorite'id={restaurant.id} onClick={event => this.handleAddToFavorites(event)}src="https://img.icons8.com/office/16/000000/add-to-favorites--v2.png"/>
                    </div>
                  : null
                  }
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