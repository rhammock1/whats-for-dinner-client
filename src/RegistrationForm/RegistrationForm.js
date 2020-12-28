import React from 'react';
import AuthApiService from '../services/auth-api-service';

class RegistrationForm extends React.Component {
  state = { error: null }

  handleSubmit = event => {
    event.preventDefault();
    const { user_name, first_name, password } = event.target;

    this.setState({ error: null })
    AuthApiService.postUser( {
      user_name: user_name.value,
      first_name: first_name.value,
      password: password.value,
    })
      .then(user => {
        user_name.value = ''
        first_name.value = ''
        password.value = ''
        this.props.onRegistrationSuccess()
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  render() {
    const { error } = this.state;
    return (
      <form className='registration-form' onSubmit={this.handleSubmit} >
        <div role='alert'>{error && <p className='red'>{error}</p>}</div>
        <div className='form-group'>
          <label htmlFor='user_name'>Username: </label>
          <input required type='text' id='user_name' name='user_name' />
        </div>
        <div className='form-group'>
          <label htmlFor='first_name'>First Name: </label>
          <input required type='text' id='first_name' name='first_name' />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password: </label>
          <input required type='password' id='password' name='password' />
        </div>
        <button type='submit'>Register</button>
      </form>
    )
  }
}

export default RegistrationForm;