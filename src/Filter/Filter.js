import React from 'react';
import Context from '../Context';
import './Filter.css';

class Filter extends React.Component {
 
  static contextType = Context;

  render() {
    return (
      <form onSubmit={e => this.context.handleWheelOptions(e)}onChange={this.props.handleChange} className='filters'>
      <fieldset>
        <legend>What are you looking for?</legend>
        <div className='form-group'>
        <label htmlFor='inOrOut'>Restaurants or Recipes?</label>
        <select id='inOrOut' name='inOrOut'>
          <option value='null'>Choose One:</option>
          <option value='restaurants'>Restaurants</option>
          <option value='recipes'>Recipes</option>
          <option value='both'>Either</option>
        </select>
        </div>
        {(this.context.inOrOut === 'restaurants' || this.context.inOrOut === 'both')
          ? <div className='form-group'><label htmlFor='style'>Style: </label> <select id='style' name='style' required>
            <option value='null'></option>
            <option value='chain'>Chain</option>
            <option value='local'>Local</option>
          </select> </div>
          : ''
        }
        <button type='submit'>Submit</button>
        
      </fieldset>
    </form>
      )
    
  }
}

export default Filter;