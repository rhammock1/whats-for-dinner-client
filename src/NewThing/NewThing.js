import React from 'react';

class NewThing extends React.Component {

  state = {
    thing: '',
    error: null,
  }

  handleChange = (event) => {
    console.log(event.target.value)
    this.setState({ thing: event.target.value })
  }

  render() {
    return (
      <div className='form-container'>
        <form className='new-thing-form'>
          <fieldset>
            <legend>
              Add New:
            </legend>
            <div className='form-group'>
              <label htmlFor='new-type'>Restaurant or Recipe? </label>
              <select onChange={event => this.handleChange(event)} id='new-type' name='new-type'>
                <option value={null}>Please Choose one:</option>
                <option value='restaurant'>Restaurant</option>
                <option value='recipe'>Recipe</option>
              </select>
            </div>
          {/* {this.state.thing === restaurant
                ? <div className='form-group'><NewRestaurant /></div>
                : this.state.thing === recipe ? <div className='form-group'><NewRecipe /></div>} */}
          </fieldset>
        </form>
      </div>
        )
  }
}

export default NewThing;