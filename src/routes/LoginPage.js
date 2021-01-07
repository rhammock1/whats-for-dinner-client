import React from 'react';
import Context from '../Context';
import LoginForm from '../Components/LoginForm/LoginForm';
import TokenService from '../services/token-service';

class LoginPage extends React.Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  }

  static contextType = Context;

  componentWillUnmount() {
    const { handleToken } = this.context;
    handleToken();
  }

  handleLoginSuccess = () => {
    const userId = TokenService.getUserId();
    const { handleUpdateUserThings } = this.context;
    handleUpdateUserThings(userId);
    const { location, history } = this.props;
    const destination = (location.state || {}).from || '/';
    history.push(destination);
  }

  render() {
    return (
      <section className="login-page">
        <h2 className="login-heading">It is nice to see you!</h2>
        <LoginForm
          onLoginSuccess={this.handleLoginSuccess}
        />
      </section>
    );
  }
}

export default LoginPage;
