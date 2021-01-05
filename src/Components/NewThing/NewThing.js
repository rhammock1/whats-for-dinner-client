/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-nested-ternary */
import React from 'react';
import apiService from '../../services/api-service';
import NewRecipe from './NewRecipe/NewRecipe';
import NewRestaurant from './NewRestaurant/NewRestaurant';
import './NewThing.css';

class NewThing extends React.Component {
  static defaultProps = {
    match: {
      params: {
        userId: 0,
      },
    },

  }

  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  state = {
    thing: '',
    error: null,
    amount: 0,
    unit: '',
    ingredient: '',
    ingredients: [],
    added: false,
  }

  handleAddIngredient = () => {
    const {
      amount,
      unit,
      ingredient,
      ingredients,
    } = this.state;
    const newIngredient = { amount: parseFloat(amount), unit, ingredient };
    if (newIngredient.amount === 0 || newIngredient.unit === '' || newIngredient.ingredient === '') {
      this.setState({ error: 'Please fill out ingredient fields' });
      setTimeout(() => this.setState({ error: null }), 5000);
      return;
    }
    const newIngredients = [...ingredients];
    newIngredients.push(newIngredient);

    ['amount', 'unit', 'ingredient'].forEach((input) => {
      const element = document.getElementById(input);
      element.value = '';
    });
    this.setState({
      ingredients: newIngredients, amount: 0, unit: '', ingredient: '',
    });
  }

  handleIngredientChange = (event) => {
    const { name } = event.target;

    const { value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  handleChange = (event) => {
    this.setState({ thing: event.target.value });
  }

  handleRemoveIngredient = () => {
    const { ingredients } = this.state;
    ingredients.pop();
    this.setState({ ingredients });
  }

  handleSubmitThing = (event) => {
    event.preventDefault();
    const { userId } = this.props.match.params;

    let thing;
    if (this.state.thing === 'restaurant') {
      const {
        title, phone_number, web_url, restaurant_address, style,
      } = event.target;

      thing = {
        title: title.value,
        phone_number: phone_number.value,
        web_url: web_url.value,
        restaurant_address: restaurant_address.value,
        style: style.value,
        user_id: parseFloat(userId),
      };

      apiService.postNewThing('restaurants', thing)
        .then(() => this.setState({ added: true }))
        .catch((error) => this.setState({ error }));
    }
    if (this.state.thing === 'recipe') {
      const { title, content } = event.target;
      const { ingredients } = this.state;
      thing = {
        title: title.value,
        content: content.value,
        user_id: userId,
      };
      apiService.postNewThing('recipes', thing)
        .then((res) => {
          ingredients.forEach((ingredient) => ingredient.recipe_id === res.id);

          apiService.postIngredients(res.id, ingredients)
            .catch((error) => this.setState({ error }));
        })
        .then(() => {
          this.setState({ added: true });
        })
        .catch((error) => this.setState({ error }));
    }
  }

  handleSuccessClick = () => {
    this.setState({ added: false });
    const { userId } = this.props.match.params;
    this.props.history.push(`/${userId}/newThing`);
  }

  render() {
    const { error, thing, added } = this.state;
    const thingCapitalized = thing.charAt(0).toUpperCase() + thing.slice(1);
    return (
      <>
        <h2>
          Add New
          { thingCapitalized }
        </h2>
        <div role="alert">{error && <p className="red">{error}</p>}</div>
        <div className="form-container">
          <form className="new-thing-form" onSubmit={(event) => this.handleSubmitThing(event)}>
            <fieldset>
              <legend>
                Add New:
              </legend>
              <div className="form-group">
                <label htmlFor="new-type">Restaurant or Recipe? </label>
                <select onChange={(event) => this.handleChange(event)} id="new-type" name="new-type" required>
                  <option value="">Please Choose one:</option>
                  <option value="restaurant">Restaurant</option>
                  <option value="recipe">Recipe</option>
                </select>
              </div>
              {thing === 'restaurant'
                ? <div className="form-group"><NewRestaurant /></div>
                : thing === 'recipe' ? <div className="form-group"><NewRecipe refs={this.myRef} handleRemoveIngredient={this.handleRemoveIngredient} ingredients={this.state.ingredients} handleAddIngredient={this.handleAddIngredient} handleChange={this.handleIngredientChange} /></div>
                  : null}
              <button type="submit">
                Add
                {thing}
              </button>
              {thing ? <p className="required">* is required field</p> : null}
            </fieldset>
          </form>
          {added ? (
            <div className="added">
              <p>
                Successfully Added
                {thingCapitalized}
              </p>
              <button onClick={() => this.handleSuccessClick()} type="button">Back</button>
            </div>
          ) : null}
        </div>
      </>
    );
  }
}

export default NewThing;
