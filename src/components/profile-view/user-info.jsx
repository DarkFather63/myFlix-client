import React from "react";
import { Col, Row, Card } from 'react-bootstrap';


export function UserInfo({ email, name }) {

  return (
    <>
      <Row>
        <Col>

          <Card.Title>Your Info:</Card.Title>
          <p>Username: {name}</p>
          <p>Email: {email}</p>

        </Col>
      </Row>
    </>

  )
}

