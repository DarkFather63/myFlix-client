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
  constructor(props) {
    super(props);

    this.addFavMovie = this.addFavMovie.bind(this)
  }

  addFavMovie(movie) {
    console.log(movie);

    const userId = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios.post(`https//eryn-moviedb.herokuapp.com/users/${userId}/movies/${movie._id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        alert('Movie successfully added to favorites.')
        window.open(`/users/${user}`, '_self');
      })
      .catch(error => console.error(error))
  }

  render() {
    const { movie } = this.props;


    return (
      <Card className="movie-card" key={movie._id}>
        <Card.Img variant="top" src={movie.ImagePath} style={{ padding: 10 }} crossOrigin='anonymous' />
        <Figure>
          <Card.Body>
            <Card.Title>{movie.Title}</Card.Title>
            <Card.Subtitle>{movie.Genre.Name}</Card.Subtitle>
            <Link to={`/movies/${movie._id}`}>
              <Button variant="link">See more about this movie.</Button>
            </Link>
            <Button className='add-button' variant='secondary' onClick={() => this.addFavMovie(movie)}>Add to Favorites</Button>
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

