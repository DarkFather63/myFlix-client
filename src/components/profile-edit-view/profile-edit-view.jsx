import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Row, Col, CardGroup, Card } from 'react-bootstrap';
import { CardGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export function UserUpdate(props) {

  const { user } = props;

  const [name, setName] = useState();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [values, setValues] = useState({
    usernameErr: '',
    passwordErr: '',
    emailErr: '',
    birthdayErr: ''
  })

  const validate = () => {
    let isReq = true;
    if (username.length < 2) {
      setValues({ ...values, usernameErr: 'Username must be 2 or more characters long' });
      isReq = false;
    }
    if (password.length < 6) {
      setValues({ ...values, passwordErr: 'Password must be 6 or more characters long' });
      isReq = false;
    }
    if (!email) {
      setValues({ ...values, emailErr: 'Please use a valid email' });
      isReq = false;
    } else if (email.indexOf('@') === -1) {
      setValues({ ...values, emailErr: 'Please use a valid email' });
      isReq = false;
    }
    return isReq;
  }

  return (
    <Row>
      <Col md={8}>
        <CardGroup>
          <Card>
            <Card.Title>Want to change some info?</Card.Title>
            <Form className='profile-form' onSubmit={(e) => handleSubmit(e)}>

              <p></p>

              <Form.Group controlId="formUsername" className='reg-form-inputs'>
                <Form.Label>
                  Username:
                </Form.Label>
                <Form.Control type="text" placeholder='Username' defaultValue={username} onChange={e => handleUpdate(e)} />
                {values.usernameErr && <p>{values.usernameErr}</p>}
              </Form.Group>

              <Form.Group controlId='formName' className='reg-form-inputs'>
                <Form.Label>
                  Name:
                </Form.Label>
                <Form.Control type="text" placeholder='Name' defaultValue={user} onChange={e => handleUpdate(e)} />
                {values.nameErr && <p>{values.nameErr}</p>}
              </Form.Group>

              <Form.Group controlId='formPassword' className='reg-form-inputs'>
                <Form.Label>
                  Password:
                </Form.Label>
                <Form.Control type="password" placeholder='Password' defaultValue={password} onChange={e => handleUpdate(e)} />
                {values.passwordErr && <p>{values.passwordErr}</p>}
              </Form.Group>

              <Form.Group controlId='Email' className='reg-form-inputs'>
                <Form.Label>
                  Email:
                </Form.Label>
                <Form.Control type="email" placeholder='Email' defaultValue={email} onChange={e => handleUpdate(e)} />
                {values.emailErr && <p>{values.emailErr}</p>}
              </Form.Group>

              <Form.Group controlId='updateBirthday'>
                <Form.Label>
                  Birthday:
                </Form.Label>
                <Form.Control type="date" placeholder='Birthday' name='birthday' onChange={e => handleUpdate(e)} />
                {values.birthdayErr && <p>{values.birthdayErr}</p>}
              </Form.Group>

              <Link to={`/movies`}>
                <Button variant="link">Movies</Button>
              </Link>
              <button onClick={() => { onBackClick(); }}>Back</button>
            </Form>
          </Card>
        </CardGroup>
      </Col>
    </Row>
  )
}

/* UserUpdate.propTypes = {
  profile: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired
}; */