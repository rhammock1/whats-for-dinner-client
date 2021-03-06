/* eslint-disable react/destructuring-assignment */
import React from 'react';

import Context from '../../Context';
import './RecipeDetailView.css';

const Ingredient = (props) => {
  const { ing } = props;
  const rounded = Math.round(ing.amount * 100) / 100;
  if (rounded === 0) {
    return (
      <li className="recipe-ing">
        {ing.unit}
        {' '}
        <span className="ingredient">{ing.ingredient}</span>
      </li>
    );
  }
  return (
    <li className="recipe-ing">
      <span className="amount">{rounded}</span>
      {' '}
      <span className="unit">{ing.unit}</span>
      {' '}
      <span className="ingredient">{ing.ingredient}</span>
    </li>
  );
};

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
    recipeId: this.props.match.params.recipeId,
  }

  componentDidMount() {
    const { findRecipe } = this.context;
    const { recipeId } = this.state;
    findRecipe(recipeId);
  }

  handleBack = () => {
    this.props.history.goBack();
  }

  render() {
    const { recipe } = this.context;
    const ingredients = recipe.ingredients || [];

    return (
      <section>
        <div className="recipe-container">
          <h2>{recipe.title}</h2>
          <div className="ingredients-container">
            <h3>Ingredients</h3>
            <ul className="ingredients-list">
              {ingredients.map((ingredient) => <Ingredient key={ingredient.id} ing={ingredient} />)}
            </ul>
          </div>
          <div className="content-container">
            <h3>Steps</h3>
            <p>{recipe.content}</p>
          </div>
          <button type="button" className="back-button" onClick={this.handleBack}>Back</button>
        </div>
      </section>
    );
  }
}

export default RecipeDetailView;
