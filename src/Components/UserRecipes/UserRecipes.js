/* eslint-disable max-len */
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
    error: null,
    recipes: [],
    favorites: [],
    added: false,
    deleted: false,
    splicedRecipes: [],
    favoritedRecipes: [],
    recipeId: 0,
  }

  componentDidMount() {
    const { userId } = this.props.match.params;
    apiService.getUsersThings(userId, 'recipes')
      .then((recipes) => this.setState({ recipes }))
      .catch((error) => this.setState({ error }));
    apiService.getUsersThings(userId, 'favorites')
      .then((favorites) => this.setState({ favorites }))
      .then(() => this.handleFavorites())
      .catch((error) => this.setState({ error }));
  }

 handleFavorites = () => {
   const { favorites } = this.state;
   const favoritedRecipes = favorites.filter((favorite) => favorite.what_it_is === 'recipe');
   let removedDoubles = [];
   for (let i = 0; i < favoritedRecipes.length; i++) {
     removedDoubles.push(favoritedRecipes.filter((favorite) => favorite.item_id === favoritedRecipes[i].item_id));
   }

   const doubleFree = [];
   removedDoubles = removedDoubles.filter((array) => ((array.length < 2)
     ? doubleFree.push(array[0])
     : null));

   removedDoubles = removedDoubles.filter((array) => ((array.length >= 2)
     ? array
     : null));

   let singleDouble;
   singleDouble = removedDoubles.map((double) => double[0]);

   const set = new Set(singleDouble);
   const iterator = set.entries();

   if (set.size > 0) {
     for (let i = 0; i < set.size; i++) {
       doubleFree.push(iterator.next().value[0]);
     }
   }
    const { recipes } = this.state;
   const recipesInState = [...recipes];

   const filtered = [];
   let newArray;
   if (doubleFree.length > 0) {
     for (let i = 0; i < doubleFree.length; i++) {
       filtered.push(recipesInState.filter((recipe) => (recipe.id === doubleFree[i].item_id)));

       const itemIds = doubleFree.map((each) => each.item_id);
       newArray = recipesInState.filter((recipe) => !itemIds.includes(recipe.id));
     }
   } else {
     newArray = recipesInState;
   }

   const favRecipes = [];
   filtered.map((array) => array.map((recipe) => favRecipes.push(recipe)));

   this.setState({ favoritedRecipes: favRecipes });
   this.setState({ splicedRecipes: newArray });
 }

  handleAddToFavorites = (event) => {
    event.preventDefault();
    const recipeId = event.target.id;

    const { userId } = this.props.match.params;
    const newFavorite = {
      what_it_is: 'recipe',
      user_id: userId,
      item_id: recipeId,
    };

    apiService.postNewFavorite(userId, newFavorite)
      .then(() => { this.setState({ added: true, recipeId: parseFloat(recipeId) }); })
      .then(() => {
        apiService.getUsersThings(userId, 'favorites')
          .then((favorites) => {
            this.setState({ favorites });
          })
          .then(async () => this.handleFavorites())
          .catch((error) => this.setState({ error }));
      })
      .then(() => {
        setTimeout(
          () => { this.setState({ added: false }); },
          5000,
        );
      })
      .catch((error) => this.setState({ error }));
  }

handleRemoveFromFavorites = (event) => {
  event.preventDefault();

  const { userId } = this.props.match.params;
  const { favorites } = this.state;
  const favoritedRecipes = favorites.filter((favorite) => favorite.what_it_is === 'recipe');

  const recipeId = event.target.id;

  const favoriteToDelete = favoritedRecipes.filter((favorite) => favorite.item_id === parseFloat(recipeId));

  const favoriteId = favoriteToDelete[0].id;

  apiService.deleteFavorite(userId, favoriteId)
    .then(() => { this.setState({ deleted: true }); })
    .then(() => {
      apiService.getUsersThings(userId, 'favorites')
        .then((favorites) => this.setState({ favorites }))
        .then(async () => this.handleFavorites())
        .catch((error) => this.setState({ error }));
    })
    .then(() => {
      setTimeout(
        () => { this.setState({ deleted: false }); },
        5000,
      );
    })
    .catch((error) => this.setState({ error }));
}

handleDelete = (event) => {
  event.preventDefault();
  const id = parseFloat(event.target.id);
  const { userId } = this.props.match.params;
  const { favorites, favoritedRecipes, splicedRecipes } = this.state;
  const favorite = favorites.filter((each) => each.item_id === id && favorite.what_it_is === 'recipe') || [];

  const restOfTheFavoriteRecipes = favoritedRecipes.filter((recipe) => recipe.id !== id);

  let allButDeleted;
  if (favorite.length > 0) {
    const favoriteId = favorite[0].id;
    allButDeleted = [...splicedRecipes].filter((recipe) => recipe.id !== id);

    apiService.deleteFavorite(userId, favoriteId)
      .then(() => {
        apiService.deleteAllIngredientsAndRecipe(id)
          .then(() => {
            apiService.deleteThing(id, 'recipes')
              .then(() => {
                this.setState({ splicedRecipes: allButDeleted });
              })
              .catch((error) => this.setState({ error }));
          });
      })
      .then(() => {
        this.setState({ favoritedRecipes: restOfTheFavoriteRecipes });
      })
      .catch((error) => this.setState({ error }));
  } else {
    allButDeleted = [...splicedRecipes].filter((recipe) => recipe.id !== id);

    apiService.deleteThing(id, 'recipes')
      .then(() => {
        this.setState({ splicedRecipes: allButDeleted });
      });
  }
}

render() {
  const {
    recipes, recipesInState, error, added, recipeId,
  } = this.state;
  const { userId } = this.props.match.params;

  return (
    <section className="user-recipes">
      <h2>My Recipes</h2>
      <div role="alert">{error && <p className="red">{error}</p>}</div>
      <div className="recipe-container">
        {recipes.map((recipe) => (
          <div className="detail" key={recipe.id}>
            <p><Link className="detail-link" to={`/recipes/${recipe.id}`}>{recipe.title}</Link></p>
            <div className="favorite">
              <label htmlFor="remove-favorite" className="label">Remove from favorites</label>
              <input id="remove-favorite" type="image" alt="button-to-remove-from-favorite" id={recipe.id} onClick={(event) => this.handleRemoveFromFavorites(event)} src="https://img.icons8.com/office/16/000000/add-to-favorites--v2.png" />
            </div>

            {(added && recipeId === recipe.id)
              ? (
                <div className="added">
                  <p>Successfully added to favorites</p>
                </div>
              )
              : null}
            <button type="button" className="delete" id={recipe.id} onClick={this.handleDelete}>Delete recipe</button>
          </div>

        ))}
        {recipesInState.map((recipe, index) => (
          <div className="detail" key={index}>
            <p><Link className="detail-link" to={`/recipes/${recipe.id}`}>{recipe.title}</Link></p>
            {(recipesInState.length > 0)
              ? (
                <div className="favorite">
                  <label htmlFor="favorite-icon" className="label">Add to favorites</label>
                  <input id="favorite-icon" type="image" alt="button-to-add-to-favorite" id={recipe.id} onClick={(event) => this.handleAddToFavorites(event)} src="https://img.icons8.com/office/16/000000/add-to-favorites--v2.png" />
                </div>
              )
              : null}
            <button type="button" className="delete" id={recipe.id} onClick={this.handleDelete}>Delete recipe</button>
          </div>
        ))}
        <button type="button" className="add"><Link to={`/${userId}/newThing`}>Add new recipe</Link></button>
      </div>
    </section>

  );
}
}

export default UserRecipes;
