import React from 'react';
import propTypes from 'prop-types';
import { useState } from 'react';
import { Form } from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap/Button';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birth, setBirth] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birth);
  }

  return (
    <Form>
      <Form.Group controlId="formUsername">
        <Form.Label>
          Username:
        </Form.Label>
        <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </Form.Group>
      <Form.Group>
        <Form.Label>
          Password:
        </Form.Label>
        <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </Form.Group>
      <Form.Group>
        <Form.Label>
          Email:
        </Form.Label>
        <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} />
      </Form.Group>
      <Form.Group>
        <Form.Label>
          Date of Birth:
        </Form.Label>
        <Form.Control type="date" value={date} onChange={e => setBirth(e.target.value)} />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleSubmit}>Register</Button>
    </Form>
  );
}

