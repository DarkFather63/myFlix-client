import React from 'react';
import propTypes from 'prop-types';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birth, setBirth] = useState('');
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [birthErr, setBirthErr] = useState('');

  const validate = () => {
    let isReq = true;
    let mail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
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
      setPassword('Password must be 6 or more characters long');
      isReq = false;
    }
    if (!email) {
      setEmailErr('Please use a valid email');
      isReq = false;
    } else if (email.inputText.value !== (mail)) {
      setEmail('Please use a valid email');
      isReq = false;
    }
    if (!birth) {
      setBirthErr('DOB required');
      isReq = false;
    } else if (birth !== Date()) {
      setBirth('Please enter a date in MM/DD/YYYY format');
      isReq = false;
    }
    return isReq;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      axios.post('https://eryn-moviedb.herokuapp.com/register', {
        Username: username,
        Password: password,
        Email: email,
        Birth: birth
      })
        .then(response => {
          const data = response.data;
          props.onRegistration(data);
        })
        .catch(e => {
          console.log('something went wrong')
        });
    }
  }

  return (
    <Form>
      <Form.Group controlId="formUsername">
        <Form.Label>
          Username:
        </Form.Label>
        <Form.Control type="text" placeholder='Username' value={username} onChange={e => setUsername(e.target.value)} />
        {usernameErr && <p>{usernameErr}</p>}
      </Form.Group>
      <Form.Group>
        <Form.Label>
          Password:
        </Form.Label>
        <Form.Control type="password" placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
        {passwordErr && <p>{passwordErr}</p>}
      </Form.Group>
      <Form.Group>
        <Form.Label>
          Email:
        </Form.Label>
        <Form.Control type="email" placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
        {emailErr && <p>{emailErr}</p>}
      </Form.Group>
      <Form.Group>
        <Form.Label>
          Date of Birth:
        </Form.Label>
        <Form.Control type="date" placeholder='Date of Birth' value={date} onChange={e => setBirth(e.target.value)} />
        {birthErr && <p>{birthErr}</p>}
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleSubmit}>Register</Button>
    </Form>
  );
}

