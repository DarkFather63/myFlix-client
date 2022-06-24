import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Figure, Row, Col, Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import axios from 'axios';
import './profile-view.scss';

function FavoriteMovies(props) {
  const { movie, favoriteMovies, currentUser, token } = props;

  const favoriteMoviesId = favoriteMovies.map(m => m._id)

  const favoriteMovieList = favoriteMovies.filter(m => {
    return favoriteMoviesId.includes(m._id)
  })

  const removeFav = (_id) => {
    let token = localStorage.getItem('token');
    let url = `https//eryn-moviedb.herokuapp.com/users/${currentUser}/movies/${_id}`;
    axios.delete(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => {
        alert('Movie successfully deleted.')
        window.open(`/users/${user}`, '_self');
      })
      .catch(error => console.error(error))
  }

  return (
    <Fragment>
      {favoriteMovieList.length === 0
        ? (<p>You have no favorite movies yet.</p>)
        : favoriteMovieList.map((movie) => {
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
                    <Col xs={12} md={6} lg={3} key={_id} className='fav-movie'>
                      <Figure>
                        <Link to={`/movies/${_id}`}>
                          <Figure.Image
                            src={ImagePath}
                            alt={Title} />

                          <Figure.Caption>
                            {Title}
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

export default FavoriteMovies