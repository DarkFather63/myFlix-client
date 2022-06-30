import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card, Col, Row, Container } from 'react-bootstrap';

import { UserInfo } from './user-info';
import FavoriteMovies from './favorite-movies';
import UserUpdate from '../profile-edit-view/profile-edit-view';

import './profile-view.scss';

export function ProfileView(props) {

  const [user, setUser] = useState(props.user);

  const token = localStorage.getItem('token');


  const getUser = () => {
    axios.get(`https://eryn-moviedb.herokuapp.com/users/${props.user}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        setUser(response.data);
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
          console.log(response);
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

      <Row >
        <Card.Title>Favorite Movies:</Card.Title><br></br>
        <Col lg={4}>
          <FavoriteMovies />
        </Col>
      </Row>

      <Button className='delete-button' onClick={() => deleteUser()}>Delete Profile</Button>



    </Container>
  );
}
