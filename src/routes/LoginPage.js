import React from 'react';
import LoginForm from '../LoginForm/LoginForm';

class LoginPage extends React.Component {
  static defaultProps = {
    location: {},
    history : {
      push: () => {},
    },
  }

  handleLoginSuccess = () => {
    const { location, history } = this.props;
    const destination = (location.state || {}).from || '/'
    history.push(destination)
  }

  render() {
    return (
      <section className='login-page'>
        <h2>Login</h2>
        <LoginForm
       onLoginSuccess={this.handleLoginSuccess} />
      </section>
    )
  }
}

export default LoginPage;