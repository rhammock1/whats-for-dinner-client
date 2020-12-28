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
    console.log('hello')
    history.push(`/user/${user.id}`)
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