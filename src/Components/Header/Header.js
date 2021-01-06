/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import TokenService from '../../services/token-service';
import Context from '../../Context';

class Header extends React.Component {
  static contextType = Context;

  handleClick = () => {
    TokenService.clearAll();
    const { handleToken } = this.context;
    handleToken();
  }

  render() {
    const { loggedIn } = this.props;
    const userName = TokenService.getUserName();
    return (
      <header>
        <h1><Link className="link" to="/">It's What's For Dinner</Link></h1>
        {/* Need to conditionally render based on presence of a web browswer token */}
        {!loggedIn
          ? (
            <div className="login-container">
              <button type="button" className="header-button"><Link to="/login">Login</Link></button>
              <button type="button" className="header-button"><Link to="/register">Sign Up</Link></button>
            </div>
          )
          : (
            <div className="logged-in">
              <p>
                Hello,
                {' '}
                {userName}

              </p>
              <button type="button" className="header-button" onClick={() => this.handleClick()}><Link to="/">Logout</Link></button>
            </div>
          )}

      </header>
    );
  }
}

export default Header;
