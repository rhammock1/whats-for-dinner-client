import React from 'react';
import { Link } from 'react-router-dom';
import apiService from '../services/api-service';


class UserRecipes extends React.Component {

  state = {
    recipes: [],

  }


  componentDidMount() {
    const {userId} = this.props.match.params
    apiService.getUsersThings(userId, 'recipes')
      .then(recipes => this.setState({recipes}))
      .catch(error => console.error(error))
}
  render() {
    
    return (
      <section className='user-recipes'>
        <h2>My Recipes</h2>
        <div className='recipe-container'>
          {this.state.recipes.map(recipe => {
            return (
              <div key={recipe.id}>
                <Link to={`/recipes/${recipe.id}`}><p>{recipe.title}</p></Link>
              </div>)
          })}
        </div>
      </section>

      )
  }
}

export default UserRecipes;