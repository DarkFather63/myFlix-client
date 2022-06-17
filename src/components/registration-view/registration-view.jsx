import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Row, Col, CardGroup, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export function RegistrationView(props) {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [values, setValues] = useState({
    nameErr: '',
    usernameErr: '',
    passwordErr: '',
    emailErr: '',
    birthdayErr: ''
  })


  const validate = () => {
    let isReq = true;
    if (!name) {
      setValues({ ...values, nameErr: 'Name is required' });
      isReq = false;
    }
    if (!username) {
      setValues({ ...values, usernameErr: 'Username Required' });
      isReq = false;
    } else if (username.length < 2) {
      setValues({ ...values, usernameErr: 'Username must be 2 or more characters long' });
      isReq = false;
    }
    if (!password) {
      setValues({ ...values, passwordErr: 'Password is required.' });
      isReq = false;
    } else if (password.length < 6) {
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
    if (!birthday) {
      setValues({ ...values, birthdayErr: 'DOB required' });
      isReq = false;
    }
    return isReq;
  }

  const handleRegister = (e) => {
    e.preventDefault();
    const isReq = validate()
    if (isReq) {
      axios.post('https://eryn-moviedb.herokuapp.com/users', {
        Name: name,
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      })
        .then(response => {
          const data = response.data;
          console.log(data);
          alert('Registration successful, please login!')
          window.open('/', '_self');
        })
        .catch(response => {
          console.error(response);
          alert('unable to register');
        });
    }
  };

  return (
    <Row className='mt-5'>
      <Col md={8}>
        <CardGroup>
          <Card>
            <Card.Body>
              <Card.Title>Register Here:</Card.Title>
              <Form>
                <p></p>
                <Form.Group controlId="formUsername" className='reg-form-inputs'>
                  <Form.Label>
                    Username:
                  </Form.Label>
                  <Form.Control type="text" placeholder='Username' value={username} onChange={e => setUsername(e.target.value)} />
                  {values.usernameErr && <p>{values.usernameErr}</p>}
                </Form.Group>

                <Form.Group controlId='formName' className='reg-form-inputs'>
                  <Form.Label>
                    Name:
                  </Form.Label>
                  <Form.Control type="text" placeholder='Name' value={name} onChange={e => setName(e.target.value)} />
                  {values.nameErr && <p>{values.nameErr}</p>}
                </Form.Group>

                <Form.Group controlId='formPassword' className='reg-form-inputs'>
                  <Form.Label>
                    Password:
                  </Form.Label>
                  <Form.Control type="password" placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
                  {values.passwordErr && <p>{values.passwordErr}</p>}
                </Form.Group>

                <Form.Group controlId='Email' className='reg-form-inputs'>
                  <Form.Label>
                    Email:
                  </Form.Label>
                  <Form.Control type="email" placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
                  {values.emailErr && <p>{values.emailErr}</p>}
                </Form.Group>

                <Form.Group controlId='updateBirthday'>
                  <Form.Label>
                    Birthday:
                  </Form.Label>
                  <Form.Control type="date" placeholder='Birthday' name='birthday' onChange={e => setBirthday(e.target.value)}></Form.Control>
                  {values.birthdayErr && <p>{values.birthdayErr}</p>}
                </Form.Group>

                <Button variant="primary" type="submit" onClick={handleRegister}>Register</Button>
                <p></p>
                <p>Already registered? <Link to={'/'}>Sign in here</Link></p>

              </Form>
            </Card.Body>
          </Card>
        </CardGroup>
      </Col>
    </Row>
  );
}

RegistrationView.propTypes = {
  register: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired
  }),
};
