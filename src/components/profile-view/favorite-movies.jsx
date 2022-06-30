import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Figure, Row, Col, Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import axios from 'axios';

import './profile-view.scss';
import { useSelector } from 'react-redux';

function FavoriteMovies(props) {
  /* const { movie, favoriteMovies, currentUser, token } = props;

  const favoriteMoviesId = favoriteMovies.map(movie => movie._id)

  const favoriteMoviesList = favoriteMovies.filter(m => {
    return favoriteMoviesId.includes(movie._id)
  }) */

  const movies = useSelector((state) => state.movies);
  const favoriteMovies = useSelector((state) => state.user.FavoriteMovies) || [];


  const finalFavorites = favoriteMovies.map(function (movie) {
    return movie._id;
  })
  console.log(finalFavorites);

  const result = movies.filter(({ _id }) => finalFavorites.includes(_id));

  const removeFav = (_id) => {
    let token = localStorage.getItem('token');
    let currentUser = localStorage.getItem('user._id');
    let url = `https//eryn-moviedb.herokuapp.com/users/${currentUser}/movies/${_id}`;
    axios.delete(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => {
        alert('Movie successfully removed from favorites.')
        window.open(`/users/${user}`, '_self');
      })
      .catch(error => console.error(error))
  }


  if (favoriteMovies.length === 0 || !favoriteMovies) {
    return (<p>You have no favorite movies yet.</p>)
  }
  else if (favoriteMovies.length > 0) {
    return result.map((movie) => (
      <Card>
        <Card.Body>
          <Row>
            <Col xs={12} md={6} lg={3} key={movie._id} className='fav-movie'>

              <Link to={`/movies/${_id}`}>
                <Card.Img
                  src={movie.ImagePath}
                  alt={movie.Title} />

                <Card.Subtitle>
                  {movie.Title}
                </Card.Subtitle>
              </Link>


              <Button variant="secondary" onClick={() => removeFav(_id)}>Remove</Button>
            </Col>

          </Row>
        </Card.Body>
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