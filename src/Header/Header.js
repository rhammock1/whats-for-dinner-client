import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import TokenService from '../services/token-service';


class Header extends React.Component {


  render() {
    return (
    <header>
      <h1><Link className='link' to={'/'} >It's What's For Dinner</Link></h1>
      {/* Need to conditionally render based on presence of a web browswer token */}
      {!this.props.loggedIn
        ? <div className='login-container'>
            <Link to='/login'><button>Login</button></Link>
            <Link to='/register'><button>Sign Up</button></Link>
          </div>
        : <div className='logged-in'>
            <p>Hello</p>
            <Link to='/'><button onClick={() => TokenService.clearAuthToken()}>Logout</button></Link>
          </div>}
      
    </header>
  )
  }
  
}

export default Header;