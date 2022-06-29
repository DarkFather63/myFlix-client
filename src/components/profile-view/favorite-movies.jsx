import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Figure, Row, Col, Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import axios from 'axios';

import './profile-view.scss';

function FavoriteMovies(props) {
  const { movie, favoriteMovies, currentUser, token } = props;

  const favoriteMoviesId = favoriteMovies.map(movie => movie._id)

  const favoriteMoviesList = favoriteMovies.filter(m => {
    return favoriteMoviesId.includes(movie._id)
  })

  const removeFav = (_id) => {
    let token = localStorage.getItem('token');
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

  return (
    <Fragment>
      {favoriteMoviesList.length === 0
        ? (<p>You have no favorite movies yet.</p>)
        : favoriteMoviesList.map((movie) => {
          return (

            <Card>
              <Card.Body>
                <Row>
                  <Col xs={12}>
                    <h2>Favorite Movies:</h2>
                  </Col>
                </Row>

                <Row> {favoriteMovieList.map((ImagePath, Title, _id) => {
                  return (
                    <Col xs={12} md={6} lg={3} key={movie._id} className='fav-movie'>
                      <Figure>
                        <Link to={`/movies/${movie._id}`}>
                          <Figure.Image
                            src={ImagePath}
                            alt={Title} />

                          <Figure.Caption>
                            {movie.Title}
                          </Figure.Caption>
                        </Link>
                      </Figure>


                      <Button variant="secondary" onClick={() => removeFav(_id)}>Remove</Button>
                    </Col>
                  )
                })
                }
                </Row>
              </Card.Body>
            </Card>)
        })}
    </Fragment>
  )
}

FavoriteMovies.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired
};

export default FavoriteMovies