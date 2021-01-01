import React from 'react';
import { Link } from 'react-router-dom';
import apiService from '../../services/api-service';
import './UserRecipes.css';

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
    recipeId: 0,
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
      
      removedDoubles.push(favoritedRecipes.filter(favorite => 
        favorite.item_id === favoritedRecipes[i].item_id
      ))
    }
 
    let doubleFree = []
    removedDoubles = removedDoubles.filter(array => {
      return (array.length < 2)
        ? doubleFree.push(array[0])
        : null
 })
    
    removedDoubles = removedDoubles.filter(array => {
      return (array.length >= 2) 
        ? array
        : null
      
    })
  
    let singleDouble;
    singleDouble = removedDoubles.map(double => double[0])
    
    const set = new Set(singleDouble)
    let iterator = set.entries()
    
    if(set.size > 0) {
      for(let i = 0; i < set.size; i++) {
      doubleFree.push(iterator.next().value[0])
    }
    }
    
    const recipesInState = [...this.state.recipes];
   
    let filtered = [];
    let newArray;
    if(doubleFree.length > 0) {
      for(let i = 0; i < doubleFree.length; i++) {
      
      filtered.push(recipesInState.filter(recipe => (recipe.id === doubleFree[i].item_id)
        ))
     
      let itemIds = doubleFree.map(each => each.item_id)
      newArray = recipesInState.filter(recipe => !itemIds.includes(recipe.id))
    }
    } else {
      newArray = recipesInState
    }
    
  
    let recipes=[];
    filtered.map(array => 
 
      array.map(recipe => 
        
        recipes.push(recipe)
      )
    )
    
    
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
    .then(() => {this.setState({ added: true, recipeId: parseFloat(recipeId) })})
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
handleDelete = event => {
  event.preventDefault();
  const id = parseFloat(event.target.id);
  const {userId} = this.props.match.params; 
  const favorite = this.state.favorites.filter(favorite => {
    return favorite.item_id === id && favorite.what_it_is === 'recipe'
    }) || []


  const restOfTheFavoriteRecipes = this.state.favoritedRecipes.filter(recipe => recipe.id !== id)

  let allButDeleted;
  if(favorite.length > 0 ) {

  const favoriteId = favorite[0].id
 
  allButDeleted = [...this.state.splicedRecipes].filter(recipe => recipe.id !== id)
  

  
  apiService.deleteFavorite(userId, favoriteId)
    .then(() => {
      apiService.deleteAllIngredientsAndRecipe(id)
        .then(() => {
          apiService.deleteThing(id, 'recipes')
          .then(() => {
            this.setState({ splicedRecipes: allButDeleted })
          })
          .catch(error => console.error(error))
        })
    })
      .then(() => {
        this.setState({favoritedRecipes: restOfTheFavoriteRecipes})
      })
      .catch(error => console.error(error))
  } else {
    allButDeleted = [...this.state.splicedRecipes].filter(recipe => recipe.id !== id)
    
      apiService.deleteThing(id, 'recipes')
        .then(() => {
         
          this.setState({ splicedRecipes: allButDeleted })
  })
    
}
}
  render() {
    const recipes = this.state.favoritedRecipes;
    const recipesInState = this.state.splicedRecipes || [{}];
    const {userId} = this.props.match.params;

    return (
      <section className='user-recipes'>
        <h2>My Recipes</h2>
        
        <div className='recipe-container'>
          {recipes.map(recipe => {
            return (
              <div className='detail' key={recipe.id}>
                <p><Link className='detail-link' to={`/recipes/${recipe.id}`}>{recipe.title}</Link></p>
                <div className='favorite'>
                  <label className='label'>Remove from favorites</label>
                  <input type='image' alt='button-to-remove-from-favorite' id={recipe.id} onClick={event => this.handleRemoveFromFavorites(event)} src="https://img.icons8.com/office/16/000000/add-to-favorites--v2.png"/>
                </div>
      
                {(this.state.added && this.state.recipeId === recipe.id)
                  ? <div className='added'>
                      <p>Successfully added to favorites</p>
                    </div>
                  : null
                }
                <button className='delete' id={recipe.id} onClick={this.handleDelete}>Delete recipe</button>
              </div>
              
              )
          })}
          {recipesInState.map((recipe, index) => {
            return (
              <div className='detail' key={index}>
                <p><Link className='detail-link' to={`/recipes/${recipe.id}`}>{recipe.title}</Link></p>
                {(recipesInState.length > 0)
                  ? <div className='favorite'>
                      <label className='label'>Add to favorites</label>
                      <input type='image' alt='button-to-add-to-favorite'id={recipe.id} onClick={event => this.handleAddToFavorites(event)}src="https://img.icons8.com/office/16/000000/add-to-favorites--v2.png"/>
                    </div>
                  : null
                }
                <button className='delete' id={recipe.id} onClick={this.handleDelete}>Delete recipe</button>
              </div>
                )
                })}
                <button className='add' ><Link to={`/${userId}/newThing`}>Add new recipe</Link></button>
        </div>
      </section>

      )
  }
}

export default UserRecipes;