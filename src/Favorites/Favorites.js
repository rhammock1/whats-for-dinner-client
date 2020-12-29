import React from 'react';
import TokenService from '../services/token-service';
import config from '../config';

class Favorites extends React.Component {

  state = {
    favorites: [],

  }
  getFavorites = (userId) => {
  
    return fetch(`${config.API_ENDPOINT}/dinner/${userId}/favorites`, {
      headers: {
        'Authorization': `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then(res => {
        if(!res.ok) {
          return res.json().then(e => Promise.reject(e))
        }
        return res.json()
      })
      .then(favorites => {
        
          this.setState({
            favorites: favorites
          })
          return favorites
      })
      .catch(error => {
      console.error({ error })
    })
  }

  componentDidMount() {
    const {userId} = this.props.match.params
    this.getFavorites(userId)
}
  render() {
    
    return (
      <section className='favorites'>
        <p>You made it</p>
      </section>

      )
  }
}

export default Favorites;