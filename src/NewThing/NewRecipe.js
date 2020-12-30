import React from 'react';


class NewRecipe extends React.Component {

 

  render() {
    return (
      <>
        <div className='form-group'>
          <label htmlFor='title'>Recipe Name: <span>* required</span></label>
          <input type='text' id='title' name='title' required placeholder='e.g. Mac N Cheese' />        
        </div>
        <div onChange={event => this.props.handleChange(event)} className='form-group'>
          <label htmlFor='amount'>Amount <span>* required</span></label>
          <input type='number' id='amount' name='amount' title='amount' placeholder='2' /> 
          <label htmlFor='unit'>Unit <span>* required</span></label>
          <input type='text' id='unit' name='unit' placeholder='Cup' /> 
          <label htmlFor='ingredient'>Ingredient <span>* required</span></label>
          <input type='text' id='ingredient' name='ingredient' placeholder='Carrots' />
          <button type='button' onClick={() => this.props.handleRemoveIngredient()}>Remove previous ingredient</button> 
          <button type='button' onClick={() => this.props.handleAddIngredient()}>Add new ingrdient</button>
        </div>
        <div className='form-group'>
          <ul className='ingredients'>
            {this.props.ingredients.map(ingredient => <li key={ingredient.id}>{ingredient.amount} {ingredient.unit} {ingredient.ingredient}</li> )}
          </ul>
        </div>
        <div className='form-group'>
          <label htmlFor='content'>Steps: <span>* required</span></label>
          <textarea id='content' name='content' placeholder='Step 1: '  />        
        </div>

      </>
    )
  }
  
}

export default NewRecipe;