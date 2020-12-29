import React from 'react';
import apiService from '../services/api-service';


class Favorites extends React.Component {

  state = {
    favorites: [],

  }


  componentDidMount() {
    const {userId} = this.props.match.params
    apiService.getUsersThings(userId, 'favorites')
      .then(favorites => this.setState({favorites}))
      .catch(error => console.error(error))
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