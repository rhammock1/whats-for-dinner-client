/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import Context from '../../Context';
import './Filter.css';

class Filter extends React.Component {
  static contextType = Context;

  render() {
    const { handleWheelOptions, inOrOut } = this.context;
    const { handleChange } = this.props;
    return (
      <form onSubmit={(e) => handleWheelOptions(e)} onChange={handleChange} className="filters">
        <fieldset>
          <legend><h2>What are you looking for?</h2></legend>
          <div className="form-group">
            <label htmlFor="inOrOut">Restaurants or Recipes?</label>
            <select id="inOrOut" name="inOrOut" required>
              <option value="">Choose One:</option>
              <option value="restaurants">Restaurants</option>
              <option value="recipes">Recipes</option>
              <option value="both">Either</option>
            </select>
          </div>
          {(inOrOut === 'restaurants' || inOrOut === 'both')
            ? (
              <div className="form-group">
                <label htmlFor="style">Style: </label>
                {' '}
                <select id="style" name="style" required>
                  <option value="" />
                  <option value="chain">Chain</option>
                  <option value="local">Local</option>
                </select>
                {' '}

              </div>
            )
            : ''}
          <button className="filter-button" type="submit">Submit</button>

        </fieldset>
      </form>
    );
  }
}

export default Filter;
