import React from 'react';

class Filter extends React.Component {
  state = {
    inOrOut: '',
    style: '',
  }
  handleChange = (ev) => {
    console.log(ev.target.id);
    let filterOption = ev.target.id;
    (filterOption === 'inOrOut')
      ? this.setState({ inOrOut: ev.target.value })
      : this.setState({ style: ev.target.value })
  }
  render() {
    return (
      <form onChange={this.handleChange}className='filters'>
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
        {(this.state.inOrOut === 'restaurants' || this.state.inOrOut === 'both')
          ? <div className='form-group'><label htmlFor='style'>Style: </label> <select id='style' name='style'>
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