import React from 'react';
import TokenService from '../services/token-service';
import AuthApiService from '../services/auth-api-service';

class LoginForm extends React.Component {
  static defaultProps = {
    onLoginSuccess: () => {}
  }

  state = { error: null }

  handleSubmitJWTAuth = event => {
    event.preventDefault();
    this.setState({ error: null })
    const { user_name, password } = event.target;

    AuthApiService.postLogin({
      user_name: user_name.value,
      password: password.value,
    })
      .then(res => {
        user_name.value = '';
        password.value = '';
        TokenService.saveAuthToken(res.authToken)
        TokenService.saveFirstName(res.first_name)
        this.props.onLoginSuccess();
        
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }
  render() {
    const { error } = this.state;
    return (
      <form className='login-form' onSubmit={this.handleSubmitJWTAuth}>
        <fieldset>
          <legend>Form</legend>
          <div role='alert'>{error && <p className='red'>{error}</p>}</div>
          <div className='form-group'>
            <label htmlFor='user_name'>Username: </label>
            <input type='text' required id='user_name' name='user_name' />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password: </label>
            <input type='password' required id='password' name='password' />
          </div>
          <button type='submit'>Login</button>
        </fieldset>
      </form>
    )
  }
}

export default LoginForm;