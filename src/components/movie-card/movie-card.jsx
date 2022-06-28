import './movie-card.scss';
import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import { Button, Figure } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

import './movie-card.scss';
import { Figure } from 'react-bootstrap';

export class MovieCard extends React.Component {
  render() {
    const { movie, currentUser } = this.props;

    //Need to add way to confirm user info to add movie to favorites.

    const addFavMovie = (_id) => {
      let token = localStorage.getItem('token');
      let url = `https//eryn-moviedb.herokuapp.com/users/${currentUser}/movies/${_id}`;
      axios.post(url, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(() => {
          alert('Movie successfully added to favorites.')
          window.open(`/users/${user}`, '_self');
        })
        .catch(error => console.error(error))
    }



    return (
      <Card className="movie-card" key={movie._id}>
        <Card.Img variant="top" src={movie.ImagePath} style={{ padding: 10 }} crossOrigin='anonymous' />
        <Figure>
          <Card.Body>
            <Card.Title>{movie.Title}</Card.Title>
            <Card.Subtitle>{movie.Genre.Name}</Card.Subtitle><br></br>
            <Link to={`/movies/${movie._id}`}>
              <Button variant="link">See more about this movie.</Button>
              <Button className='add-button' variant='secondary' onClick={() => addFavMovie()}>Add to Favorites</Button>
            </Link>
          </Card.Body>
        </Figure>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired
};
