import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button, { Card, CardGroup, Col, Row } from 'react-bootstrap';
import { Link, BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import { UserInfo } from './user-info';
import { FavoriteMovies } from './favorite-movies';
import { UserUpdate } from '../profile-edit-view/profile-edit-view';

export function ProfileView(props) {

  const [user, setUser] = useState({});
  const [movie, setMovie] = useState('');
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  const favoriteMovieList = favoriteMovies.filter(m => {
    return favoriteMoviesId.includes(m._id)
  })

  const getUser = () => {
    axios.get(`https://eryn-moviedb.herokuapp.com/users/${currentUser}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        setUser(response.data);
        setFavoriteMovies(response.data.FavoriteMovies)
      })
      .catch(error => console.error(error))
  }

  useEffect(() => {
    getUser();
  }, [])

  const handleUpdate = (e) => {
    e.preventDefault();
    const isReq = validate()
    if (isReq) {
      axios.put('https://eryn-moviedb.herokuapp.com/users', {
        Name: name,
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      })
        .then(response => {
          const data = response.data;
          console.log(data);
          alert('Update successful!')
          window.open('/', '_self');
        })
        .catch(response => {
          console.error(response);
          alert('Unable to update');
        });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      axios.put('https://eryn-moviedb.herokuapp.com/users', {
        Username: username,
        Password: password,
        Email: email
      })
        .then(response => {
          const data = response.data;
          props.onLoggedIn(data);
        })
        .catch(e => {
          console.log('no such user')
        });
    }
  };

  return (
    <Row>
      <Card className='profile-view'>
        <CardGroup key={user}>
          <Col xs={12} sm={4}>
            <Card>
              <Card.Body>
                <UserInfo name={user.Username} email={user.Email} />
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} sm={8}>
            <Card>
              <Card.Body>
                <UserUpdate handleSubmit={handleSubmit} handleUpdate={handleUpdate} />
              </Card.Body>
            </Card>
          </Col>
        </CardGroup>

        <FavoriteMovies favoriteMovieList={favoriteMovieList} />


        <Link to={`/users-update/${user}`}>
          <Button variant="link">Update Profile</Button>
        </Link>

        <Link to={`/movies/${movie._id}`}>
          <Button variant="link">Movies Main page</Button>
        </Link>

        <button onBackClick={() => history.goBack()}>Back</button>
      </Card>

    </Row>
  );
}
