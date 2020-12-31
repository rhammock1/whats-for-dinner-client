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

  handleRegistrationSuccess = user => {
    const { history } = this.props;
    history.push(`/`)
    this.context.handleToken();
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