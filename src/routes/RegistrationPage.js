import React from 'react';
import Context from '../Context';
import RegistrationForm from '../Components/RegistrationForm/RegistrationForm';

class RegistrationPage extends React.Component {
  static defaultProps = {
    history: {
      push: () => {},
    },
  }

  static contextType = Context;

  handleRegistrationSuccess = () => {
    const { history } = this.props;
    history.push('/');
    const { handleToken } = this.context;
    handleToken();
  }

  render() {
    return (
      <section className="registrationPage">
        <h2>Welcome</h2>
        <RegistrationForm onRegistrationSuccess={this.handleRegistrationSuccess} />
      </section>
    );
  }
}

export default RegistrationPage;
