import React from 'react';
import { Link } from 'react-router-dom';
import Context from '../../Context';
import './RecipeDetailView.css';



const Ingredient = function(props) {
  const rounded = Math.round(props.ing.amount * 100)/100;
  if (rounded === 0) {
    return (
    <li className='recipe-ing'>{props.ing.unit} <span className='ingredient'>{props.ing.ingredient}</span></li>
    )
  } else {
    return (
    <li className='recipe-ing'><span className='amount'>{rounded}</span> <span className='unit'>{props.ing.unit}</span> <span className='ingredient'>{props.ing.ingredient}</span></li>
    )
  }
}


class RecipeDetailView extends React.Component {
  static contextType = Context;

  static defaultProps = {
    match: {
      params: {
        recipeId: 0,
      },
    },
  }
  state = {
    recipe: {
      ingredients: [],
      title: '',
      content: '',
    },
    recipeId: this.props.match.params.recipeId
  }
  componentDidMount() {
    
    this.context.findRecipe(this.state.recipeId);
    
  }
 
  render() {
    const recipe = this.context.recipe
    const ingredients = this.context.recipe.ingredients || []
    
    return (
      <section>
      <div className='recipe-container'>
        <h3>{recipe.title}</h3>
        <div className='ingredients-container'>
          <ul className='ingredients-list'>
            {ingredients.map(ingredient => { return <Ingredient key={ingredient.id} ing={ingredient} />})}
          </ul>
        </div>
        <div className='content-container'>
          <p>{recipe.content}</p>
        </div>
        <Link className='back' to={'/'}><button >Back</button></Link>
      </div>
      </section>
      )
    
  }
}

export default RecipeDetailView;