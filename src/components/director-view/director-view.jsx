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
              <Card.Img variant="top" src={movie.ImagePath} style={{ padding: 10 }} crossOrigin='anonymous' />
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

          <Link to={`/`}>
            <Button variant="secondary" style={{ margin: 10 }}>Movies</Button>
          </Link>



          <Link to={`/genres/${movie.Genre.Name}`}>
            <Button variant="secondary" style={{ margin: 10 }}>Genre</Button>
          </Link>
        </Row>
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