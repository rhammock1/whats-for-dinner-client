import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import TokenService from '../../services/token-service';
import Context from '../../Context';


class Header extends React.Component {
  static contextType = Context;

  handleClick = () => {
    TokenService.clearAll();
    this.context.handleToken();
  }

  render() {
    const userName = TokenService.getUserName();
    return (
    <header>
      <h1><Link className='link' to={'/'} >It's What's For Dinner</Link></h1>
      {/* Need to conditionally render based on presence of a web browswer token */}
      {!this.props.loggedIn
        ? <div className='login-container'>
            <Link to='/login'><button className='header-button'>Login</button></Link>
            <Link to='/register'><button className='header-button'>Sign Up</button></Link>
          </div>
        : <div className='logged-in'>
            <p>Hello, {userName} </p>
            <Link to='/'><button className='header-button' onClick={() => this.handleClick()}>Logout</button></Link>
          </div>}
      
      
    </header>
  )
  }
  
}

export default Header;