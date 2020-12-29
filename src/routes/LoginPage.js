import React from 'react';
import Context from '../Context';
import LoginForm from '../LoginForm/LoginForm';
import TokenService from '../services/token-service';


class LoginPage extends React.Component {
  static defaultProps = {
    location: {},
    history : {
      push: () => {},
    },
  }

  static contextType = Context;

  componentWillUnmount() {
    this.context.handleToken();
  }
  handleLoginSuccess = () => {
    
    const { location, history } = this.props;
    const destination = (location.state || {}).from || '/'
    history.push(destination)
    // this.context.handleToken();
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