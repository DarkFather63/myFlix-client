import React from 'react';
import PropTypes from 'prop-types';
import { Button, Row, Col, Card, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export class DirectorView extends React.Component {

  render() {
    const { movie, onBackClick } = this.props;
    return (
      <Container className='director-view'>
        <Button variant='secondary' style={{ marginTop: 10, marginBottom: 10 }} onClick={() => { onBackClick(null); }}>Back</Button>
        <Row>
          <Col>
            <Card style={{ marginTop: 50, marginBottom: 30, padding: 10 }}>
              <div className='headshot'>
                <img src={movie.ImagePath} />
              </div>
              <Card.Title className='director-name'>
                <span className='value'>{movie.Director.Name}</span>
              </Card.Title>

              <div className='director-bio'>
                <span className='label'>Bio:</span>
                <br></br>
                <span className='value'>{movie.Director.Bio}</span>
              </div>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col>
            <Link to={`/`}>
              <Button variant="secondary">Movies</Button>
            </Link>
          </Col>
        </Row>

        <Link to={`/genres/${movie.Genre.Name}`}>
          <Button variant="secondary">Genre</Button>
        </Link>

      </Container>
    );
  }
}

DirectorView.propTypes = {
  director: PropTypes.shape({
    Bio: PropTypes.string.isRequired,
    Birth: PropTypes.string.isRequired,
  }).isRequired
};