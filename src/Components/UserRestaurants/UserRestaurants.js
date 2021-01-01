import React from 'react';
import { Link } from 'react-router-dom';
import apiService from '../../services/api-service';
import './UserRestaurants.css';
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
    restaurantId: 0,
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
      
      removedDoubles.push(favoritedRestaurants.filter(favorite => (favorite.item_id === favoritedRestaurants[i].item_id)
        ))
    }
  
    let doubleFree = []
    removedDoubles.filter(array => {
      return (array.length < 2) 
        ? doubleFree.push(array[0])
        : null
      
    })
    
    removedDoubles = removedDoubles.filter(array => (array.length >= 2))
  
    let singleDouble;
    singleDouble = removedDoubles.map(double => double[0])
    
    const set = new Set(singleDouble)
    let iterator = set.entries()
    
    if(set.size > 0) {
      for(let i = 0; i < set.size; i++) {
      doubleFree.push(iterator.next().value[0])
    }
    } 
  
    const restaurantsInState = [...this.state.restaurants];
   
    let filtered = [];
    let newArray;
    if(doubleFree.length > 0) {
      for(let i = 0; i < doubleFree.length; i++) {
      
      filtered.push(restaurantsInState.filter(restaurant => (restaurant.id === doubleFree[i].item_id)))
    
      let itemIds = doubleFree.map(each => each.item_id)
      
      newArray = restaurantsInState.filter(restaurant => !itemIds.includes(restaurant.id))
  
      }

    } else {
      newArray = restaurantsInState
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
    .then(() => {this.setState({ added: true, restaurantId: parseFloat(restaurantId) })})
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
handleDelete = event => {
  event.preventDefault();
  const id = parseFloat(event.target.id);
  const {userId} = this.props.match.params; 
  const favorite = this.state.favorites.filter(favorite => {
    return favorite.item_id === id && favorite.what_it_is === 'restaurant'
    }) || []
 

  const restOfTheFavoriteRestaurants = this.state.favoriteRestaurants.filter(restaurant => restaurant.id !== id)

  let allButDeleted;
  if(favorite.length > 0 ) {

  const favoriteId = favorite[0].id
  
  allButDeleted = [...this.state.splicedRestaurants].filter(restaurant => restaurant.id !== id)
  

  
  apiService.deleteFavorite(userId, favoriteId)
    .then(() => {
      apiService.deleteThing(id, 'restaurants')
        .then(() => {
          this.setState({ splicedRestaurants: allButDeleted })
        })
        .catch(error => console.error(error))
      })
      .then(() => {
        this.setState({favoriteRestaurants: restOfTheFavoriteRestaurants})
      })
      .catch(error => console.error(error))
  } else {
    allButDeleted = [...this.state.splicedRestaurants].filter(restaurant => restaurant.id !== id)

      apiService.deleteThing(id, 'restaurants')
        .then(() => {
          this.setState({ splicedRestaurants: allButDeleted })
  })
    
}
}

  render() {
    const restaurants = this.state.favoriteRestaurants;
    const restaurantsInState = this.state.splicedRestaurants || [{}];
    const {userId} = this.props.match.params;
   
    
    return (
      <section className='user-restaurants'>
        <h2>My Restaurants</h2>
        
        <div className='restaurant-container'>
          {restaurants.map(restaurant => {
              
            return (
              <div className='detail' key={restaurant.id}>
                <p><Link className='detail-link' to={`/restaurants/${restaurant.id}`}>{restaurant.title} </Link><span id='style'>{restaurant.style}</span></p>
                {(this.state.added && this.state.restaurantId === restaurant.id)
                  ? <div className='added'>
                      <p>Successfully added to favorites</p>
                    </div>
                  : null
                }
                <div className='favorite'>
                  <label className='label'>Remove from favorites</label>
                  <input type='image' alt='button-to-remove-from-favorite' id={restaurant.id} onClick={event => this.handleRemoveFromFavorites(event)}src="https://img.icons8.com/office/16/000000/add-to-favorites--v2.png"/>
                </div>
                {/* {this.state.deleted
                  ? <div className='added'>
                      <p>Successfully removed from favorites</p>
                    </div>
                  : null
                } */}
                <button className='delete' id={restaurant.id} onClick={this.handleDelete}>Delete restaurant</button>
              </div>
            )
          })}
          {restaurantsInState.map((restaurant, index) => {
            return (
              <div className='detail' key={index}>
                <p><Link className='detail-link' to={`/restaurants/${restaurant.id}`}>{restaurant.title} </Link><span id='style'>{restaurant.style}</span></p>
                {(restaurantsInState.length > 0)
                  ? <div className='favorite'>
                      <label className='label'>Add to favorites</label>
                      <input type='image' alt='button-to-add-to-favorite'id={restaurant.id} onClick={event => this.handleAddToFavorites(event)}src="https://img.icons8.com/office/16/000000/add-to-favorites--v2.png"/>
                    </div>
                  : null
                  }
               <button className='delete' id={restaurant.id} onClick={this.handleDelete}>Delete restaurant</button>
              </div>
                )
          })}
          <button className='add'><Link to={`/${userId}/newThing`}>Add new restaurant </Link></button>
        </div>
      </section>

      )
  }
}

export default UserRestaurants;