import React from 'react';
import Context from '../Context';
import LoginForm from '../Components/LoginForm/LoginForm';

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
    const { location, history } = this.props;
    const destination = (location.state || {}).from || '/';
    history.push(destination);
  }

  render() {
    return (
      <section className="login-page">
        <h2>It is nice to see you!</h2>
        <LoginForm
          onLoginSuccess={this.handleLoginSuccess}
        />
      </section>
    );
  }
}

export default LoginPage;
