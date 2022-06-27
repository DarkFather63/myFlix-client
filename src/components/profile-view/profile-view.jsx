import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card, CardGroup, Col, Row, Container } from 'react-bootstrap';

import { UserInfo } from './user-info';
import FavoriteMovies from './favorite-movies';
import { UserUpdate } from '../profile-edit-view/profile-edit-view';
import PropTypes from 'prop-types';
import './profile-view.scss';

export function ProfileView(props) {

  const [user, setUser] = useState(props.user);
  const [movies, setMovies] = useState(props.movies);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const token = localStorage.getItem('token');
  const currentUser = localStorage.getItem('user');


  const getUser = () => {
    axios.get(`https://eryn-moviedb.herokuapp.com/users/${props.user}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        setUser(response.data);
        setFavoriteMovies(response.data.favoriteMovies || [])
      })
      .catch(function (err) {
        console.log(err);
        console.log('get user error');
        console.log(err.response.data);
      });
  }

  useEffect(() => {
    getUser();
  }, [])

  const deleteUser = () => {
    let isExecuted = confirm('Are you sure you want to delete your profile?')
    axios.delete(`https://eryn-moviedb.herokuapp.com/users/${props.user}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        console.log(response, isExecuted);
        if (isExecuted) {
          alert('Profile deleted');
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          window.open('/', '_self');
        }
      })
      .catch(function (error) {
        console.log(error);
        console.log('Unable to delete profile')
      });
  }

  /*  const handleUpdate = (e) => {
     e.preventDefault();
     const isReq = validate()
     if (isReq) {
       axios.put(`https://eryn-moviedb.herokuapp.com/users/${props.user}`, {
         Name: this.state.name,
         Username: this.state.username,
         Password: this.state.password,
         Email: this.state.email,
         Birthday: this.state.birthday
       },
         {
           headers: { Authorization: `Bearer ${token}` },
         }
       )
         .then((response) => {
           this.setState({
             username: response.data.Username,
             password: response.data.Password,
             email: response.data.Email,
             birthday: response.data.Birthday
           });
 
           localStorage.setItem('user', this.state.Username);
           alert('Profile updated.');
         })
         .catch(function (error) {
           console.log(error);
           alert('Unable to update.');
         });
     }
   }; */

  /* const handleSubmit = (e) => {
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
  }; */

  return (
    <Container>
      <Button variant='secondary' style={{ marginTop: 10, marginBottom: 10 }} onClick={() => { onBackClick(null); }}>Back</Button>

      <Row>
        <Card className='profile-view' style={{ marginTop: 10, marginBottom: 10, padding: 0 }}>
          <Col key={user}>
            <Card.Body>
              <UserInfo name={user.Username} email={user.Email} />
            </Card.Body>
          </Col>
        </Card>
      </Row>
      <Row>
        <Col>
          <Card.Body>
            <UserUpdate user={user} />
          </Card.Body>
        </Col>
      </Row>

      <Row>
        <FavoriteMovies movies={movies} favoriteMovies={favoriteMovies} currentUser={currentUser} token={token} />
      </Row>

      <Button className='delete-button' onClick={() => deleteUser()}>Delete Profile</Button>



    </Container>
  );
}
