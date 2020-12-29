import React from 'react';
import NewRestaurant from './NewRestaurant';

class NewThing extends React.Component {

  state = {
    thing: '',
    error: null,
  }

  handleChange = (event) => {
    this.setState({ thing: event.target.value })
  }

  handleSubmitThing = event => {
    event.preventDefault();
    console.log('hello');
    // Needs to make a post request to save the new thing with their userId
  }

  render() {
    const thingCapitalized = this.state.thing.charAt(0).toUpperCase() + this.state.thing.slice(1)
    return (
      <>
      <h2>Add New {thingCapitalized}</h2>
      <div className='form-container'>
        <form className='new-thing-form' onSubmit={event => this.handleSubmitThing(event)}>
          <fieldset>
            <legend>
              Add New:
            </legend>
            <div className='form-group'>
              <label htmlFor='new-type'>Restaurant or Recipe? </label>
              <select onChange={event => this.handleChange(event)} id='new-type' name='new-type' required>
                <option value=''>Please Choose one:</option>
                <option value='restaurant'>Restaurant</option>
                <option value='recipe'>Recipe</option>
              </select>
            </div>
          {this.state.thing === 'restaurant'
                ? <div className='form-group'><NewRestaurant /></div>
                : null}
                {/*  : this.state.thing === 'recipe' ? <div className='form-group'><NewRecipe /></div>
                 : null} */}
            <button type='submit'>Add {this.state.thing}</button>
          </fieldset>
        </form>
      </div>
      </>
        )
  }
}

export default NewThing;