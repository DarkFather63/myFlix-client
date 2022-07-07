import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { Figure, Row, Col, Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import axios from 'axios';

import './profile-view.scss';
import { useSelector } from 'react-redux';

function FavoriteMovies(props) {

  const movies = useSelector((state) => state.movies);
  const favoriteMovies = useSelector((state) => state.user.FavoriteMovies) || [];


  const finalFavorites = favoriteMovies.map(function (obj) {
    return obj._id;
  })
  console.log(finalFavorites);


  const result = movies.filter(({ _id }) => favoriteMovies.includes(_id));
  console.log(result);


  const removeFav = (movie) => {

    let token = localStorage.getItem('token');
    let currentUser = localStorage.getItem('user');
    console.log(`remove fav auth: ${token}`);

    axios.delete(`https://eryn-moviedb.herokuapp.com/users/${currentUser}/movies/${movie._id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        console.log(response);
        alert(`Movie successfully removed from favorites.`)
        window.open(`/users/${currentUser}`, '_self');
      })
      .catch(error => console.error(error))
  }


  if (finalFavorites.length === 0 || !finalFavorites) {
    return (<p>You have no favorite movies yet.</p>)
  }
  else if (finalFavorites.length > -1) {
    return result.map((movie) => (
      <Card className='fav-movie'>
        <Card.Img variant='top' src={movie.ImagePath} alt={movie.Title} style={{ padding: 10 }} crossOrigin='anonymous' />
        <Figure>
          <Card.Body>
            <Card.Title>{movie.Title}</Card.Title>
            <Card.Subtitle>{movie.Genre.Name}</Card.Subtitle>
            <Link to={`/movies/${movie._id}`}>
              <Button variant="link">See more about this movie.</Button>
            </Link>
            <Button variant="secondary" onClick={() => removeFav(movie)}>Remove</Button>
          </Card.Body>
        </Figure>
      </Card>))
  }
}


/* FavoriteMovies.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired
}; */

export default FavoriteMovies