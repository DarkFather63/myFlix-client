import React from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Row, Card, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export class MovieView extends React.Component {

  render() {
    const { movie, onBackClick } = this.props;
    console.log(movie)
    return (
      <Container>
        <Button variant='secondary' style={{ marginTop: 10, marginBottom: 10 }} onClick={() => { onBackClick(null); }}>Back</Button>
        <Row>
          <Col>

            <Card className='movie-view' style={{ marginTop: 50, marginBottom: 30, padding: 10 }}>
              <Card.Img variant="top" src={movie.ImagePath} style={{ padding: 10 }} crossOrigin='anonymous' />
              <Card.Title className='movie-title'>
                <span className='value' style={{ textAlign: 'center', fontSize: '2rem' }}>{movie.Title}</span>
              </Card.Title>


              <Card.Text className='movie-description'>
                <span className='value'>{movie.Description}</span>
              </Card.Text>
            </Card>
          </Col>
        </Row>

        <Row>

          <Link to={`/directors/${movie.Director.Name}`}>
            <Button variant="secondary" style={{ margin: 10 }}>Director</Button>
          </Link>

          <Link to={`/genres/${movie.Genre.Name}`}>
            <Button variant="secondary" style={{ margin: 10 }}>Genre</Button>
          </Link>

        </Row>




      </Container >
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired
    }).isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }).isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }), onBackClick: PropTypes.func.isRequired
};