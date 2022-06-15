import React, { useState } from 'react';
import axios from 'axios';
//NOTE: when importing bootstrap functions/components, it works like the 'default' on your components - no curly braces needed
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Row, Col, Container, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';


export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');

  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr('Username Required');
      isReq = false;
    } else if (username.length < 2) {
      setUsernameErr('Username must be 2 or more characters long');
      isReq = false;
    }
    if (!password) {
      setPasswordErr('Password is required.');
      isReq = false;
    } else if (password.length < 6) {
      setPasswordErr('Password must be 6 or more characters long');
      isReq = false;
    }
    return isReq;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      axios.post('https://eryn-moviedb.herokuapp.com/login', {
        Username: username,
        Password: password
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
      <Col>
        <Card style={{ marginTop: 100, marginBottom: 50 }}>
          <Card.Body>
            <Card.Title style={{ textAlign: 'center', fontSize: '2rem' }}>Welcome to MyFlix!</Card.Title>
            <Form className='login-border'>

              <Form.Group controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
                {usernameErr && <p>{usernameErr}</p>}
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                {passwordErr && <p>{passwordErr}</p>}
              </Form.Group>

              <Button variant="primary" type="submit" onClick={handleSubmit}>
                Login
              </Button>

              <Link to={`/register`}>
                <Button variant="link">Register</Button>
              </Link>

            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
