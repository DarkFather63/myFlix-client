import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap';
import Link from 'react-bootstrap';

export class MovieView extends React.Component {

  render() {
    const { movie } = this.props;
    return (
      <Container fluid style={{ paddingTop: '0.75rem' }}>
        <div className='movie-view'>
          <div className='movie-poster'>
            <img src={movie.ImagePath} />
          </div>
          <div className='movie-title'>
            <span className='label'>Title:</span>
            <span className='value'>{movie.Title}</span>
          </div>
          <div className='movie-description'>
            <span className='label'>Description:</span>
            <span className='value'>{movie.Description}</span>
          </div>
          <Link to={`/directors/${movie.Director.Name}`}>
            <Button variant="link">Director</Button>
          </Link>

          <Link to={`/genres/${movie.Genre.Name}`}>
            <Button variant="link">Genre</Button>
          </Link>
          <button onClick={() => { onBackClick(); }}>Back</button>
        </div>
      </Container>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Genre: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired
};