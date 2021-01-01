import React from 'react';
import AuthApiService from '../../services/auth-api-service';
import TokenService from '../../services/token-service';
import './RegistrationForm.css';

class RegistrationForm extends React.Component {
  state = { error: null }

 
  handleSubmit(event) {
    event.preventDefault();
    const { user_name, first_name, password } = event.target;

    this.setState({ error: null })
    AuthApiService.postUser( {
      user_name: user_name.value,
      first_name: first_name.value,
      password: password.value,
    })
      .then(async user => {
        
        await AuthApiService.postLogin({
          user_name: user_name.value,
          password: password.value,
        })
          .then(res => {
            TokenService.saveAuthToken(res.authToken)
            TokenService.saveUserName(res.user_name)
            TokenService.saveUserId(res.id);
          })
          .catch(res => {
            this.setState({ error: res.error })
          })
        this.props.onRegistrationSuccess(user)
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  render() {
    const { error } = this.state;
    return (
      <form className='registration-form' onSubmit={event => this.handleSubmit(event)} >
        <fieldset>
          <legend><h3>Sign Up</h3></legend>
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
        </fieldset>
        
      </form>
    )
  }
}

export default RegistrationForm;