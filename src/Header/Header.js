import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header>
      <h1><Link className='link' to={'/'}>It's What's For Dinner</Link></h1>
      {/* Need to conditionally render based on presence of a web browswer token */}
      <div className='login-container'>
        <button>Login</button>
        <Link to='/register'><button>Sign Up</button></Link>
      </div>
      
    </header>
  )
}

export default Header;