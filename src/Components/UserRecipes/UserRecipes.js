import React from 'react';
import { Link } from 'react-router-dom';
import apiService from '../../services/api-service';


class UserRecipes extends React.Component {
  static defaultProps = {
    match: {
      params: {
        userId: 0,
      },
    },
  }
  state = {
    recipes: [],
    favorites: [],
    added: false,
    deleted: false,
    splicedRecipes: [],
    favoritedRecipes: [],
  }


  componentDidMount() {
    const {userId} = this.props.match.params
    apiService.getUsersThings(userId, 'recipes')
      .then(recipes => this.setState({recipes}))
      .catch(error => console.error(error))
    apiService.getUsersThings(userId, 'favorites')
      .then(favorites => this.setState({favorites}))
      .then(() => this.handleFavorites())
      .catch(error => console.error(error))
}
 handleFavorites = () => {
    const favorites = this.state.favorites
    const favoritedRecipes = favorites.filter(favorite => {
      return favorite.what_it_is === 'recipe'
    })
    let removedDoubles = [];
    for(let i = 0; i < favoritedRecipes.length; i++) {
      
      removedDoubles.push(favoritedRecipes.filter(favorite => {
        if (favorite.item_id === favoritedRecipes[i].item_id) {
          return favorite
      } 
      }))
    }
    console.log(removedDoubles)
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
    console.log(singleDouble)
    const set = new Set(singleDouble)
    let iterator = set.entries()
    console.log(set.size)
    for(let i = 0; i < set.size; i++) {
      doubleFree.push(iterator.next().value[0])
    }
    
    console.log(doubleFree)
    const recipesInState = [...this.state.recipes];
   
    let filtered = [];
    let newArray;
    for(let i = 0; i < doubleFree.length; i++) {
      
      filtered.push(recipesInState.filter(recipe => {

        if(recipe.id === doubleFree[i].item_id) {
        
          return recipe;
        }
        }))
     
      let itemIds = doubleFree.map(each => each.item_id)
      newArray = recipesInState.filter(recipe => !itemIds.includes(recipe.id))
    }
    console.log(filtered)
    let recipes=[];
    filtered.map(array => 
 
      array.map(recipe => 
        
        recipes.push(recipe)
      )
    )
    console.log(recipes)
    
  this.setState({ favoritedRecipes: recipes })
  this.setState({ splicedRecipes: newArray })

  }

  handleAddToFavorites = event => {
  event.preventDefault();
  const recipeId = event.target.id;

  const {userId} = this.props.match.params
  const newFavorite = {
    what_it_is: 'recipe',
    user_id: userId,
    item_id: recipeId
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
  const favoritedRecipes = this.state.favorites.filter(favorite => {
      return favorite.what_it_is === 'recipe'
    })
  
  let recipeId = event.target.id;
  
  let favoriteToDelete = favoritedRecipes.filter(favorite => {
  
    return favorite.item_id === parseFloat(recipeId)
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
    const recipes = this.state.favoritedRecipes;
    const recipesInState = this.state.splicedRecipes || [{}];
    const {userId} = this.props.match.params;

    return (
      <section className='user-recipes'>
        <h2>My Recipes</h2>
        <Link to={`/${userId}/newThing`}><button>Add new recipe </button></Link>
        <div className='recipe-container'>
          {recipes.map(recipe => {
            return (
              <div key={recipe.id}>
                <Link to={`/recipes/${recipe.id}`}><p>{recipe.title}</p></Link>
                <div className='favorite'>
                  <p>Remove from favorites</p>
                  <img alt='button-to-remove-from-favorite' id={recipe.id} onClick={event => this.handleRemoveFromFavorites(event)} src="https://img.icons8.com/office/16/000000/add-to-favorites--v2.png"/>
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
          {recipesInState.map(recipe => {
            return (
              <div key={recipe.id}>
                <Link to={`/restaurants/${recipe.id}`}><p>{recipe.title}</p></Link>
                {recipesInState.length < 1
                  ? <div className='favorite'>
                      <p>Add to favorites</p>
                      <img alt='button-to-add-to-favorite'id={recipe.id} onClick={event => this.handleAddToFavorites(event)}src="https://img.icons8.com/office/16/000000/add-to-favorites--v2.png"/>
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

export default UserRecipes;