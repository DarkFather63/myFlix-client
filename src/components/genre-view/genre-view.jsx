import React from 'react';
import PropTypes from 'prop-types';
import { Button, Row, Col, Card, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export class GenreView extends React.Component {

  render() {
    const { movie, onBackClick } = this.props;
    console.log(movie)
    return (
      <Container>
        <Button variant='secondary' onClick={() => { onBackClick(null); }}>Back</Button>
        <Row>
          <Col>
            <Card className='genre-view' style={{ marginTop: 50, marginBottom: 30, padding: 10 }}>

              <Card.Img variant="top" src={movie.ImagePath} style={{ padding: 10 }} crossOrigin='anonymous' />

              <Card.Title className='value'>{movie.Genre.Name}</Card.Title>

              <div className='genre-definition'>
                <span className='label'>Definition:</span>
                <br></br>
                <span className='value'>{movie.Genre.Description}</span>
              </div>

            </Card>
          </Col>
        </Row>

        <Row>
          <Link to={`/directors/${movie.Director.Name}`}>
            <Button variant="secondary" style={{ margin: 10 }}>Director</Button>
          </Link>

          <Link to={`/movies/${movie._id}`}>
            <Button variant="secondary" style={{ margin: 10 }}>Movies</Button>
          </Link>
        </Row>

      </Container >
    );
  }
}

GenreView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired
    }),
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};