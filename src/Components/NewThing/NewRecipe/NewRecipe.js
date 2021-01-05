/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

const NewRecipe = function (props) {
  const { handleChange, handleRemoveIngredient, handleAddIngredient, ingredients } = props;
  return (
    <>
      <div className="form-group">
        <label htmlFor="title">
          Recipe Name:
          <span className="required">* </span>
        </label>
        <input type="text" id="title" name="title" required placeholder="e.g. Mac N Cheese" />
      </div>
      <div onChange={(event) => handleChange(event)} className="form-group">
        <label htmlFor="amount">
          Amount
          <span className="required">* </span>
        </label>
        <input type="number" id="amount" name="amount" title="amount" placeholder="2" />
        <label htmlFor="unit">
          Unit
          <span className="required">* </span>
        </label>
        <input type="text" id="unit" name="unit" placeholder="Cup" />
        <label htmlFor="ingredient">
          Ingredient
          <span className="required">* </span>
        </label>
        <input type="text" id="ingredient" name="ingredient" placeholder="Carrots" />
        <button type="button" onClick={() => handleRemoveIngredient()}>Remove previous ingredient</button>
        <button type="button" onClick={() => handleAddIngredient()}>Add new ingrdient</button>
      </div>
      <div className="form-group">
        <h3>Ingredients</h3>
        <ul className="ingredients">
          {ingredients.map((ingredient, index) => (
            <li key={index}>
              {ingredient.amount}
              {' '}
              {ingredient.unit}
              {' '}
              {ingredient.ingredient}
            </li>
          ))}
        </ul>
      </div>
      <div className="form-group">
        <label htmlFor="content">
          Steps:
          <span className="required">* </span>
        </label>
        <textarea id="content" name="content" placeholder="Step 1: " />
      </div>

    </>
  );
};

export default NewRecipe;
