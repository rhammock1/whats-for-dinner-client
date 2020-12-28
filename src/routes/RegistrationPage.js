import React from 'react';
import RegistrationForm from '../RegistrationForm/RegistrationForm';

class RegistrationPage extends React.Component {
  static defaultProps = {
    history: {
      push: () => {},
    },
  }

  handleRegistrationSuccess = user => {
    const { history } = this.props;
    history.push(`/`)
  }
  render() {
    return (
      <section className='registrationPage'>
        <h2>Register</h2>
        <RegistrationForm onRegistrationSuccess={this.handleRegistrationSuccess} /> 
      </section>
      )
  }
}

export default RegistrationPage;