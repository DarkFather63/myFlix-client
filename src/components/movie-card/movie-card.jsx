import React from 'react';
import PropTypes from 'prop-types';
import { Row } from 'react-bootstrap/Row';
import { Col } from 'react-bootstrap/Col';

export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;

    return (
      <div className='movie-card' onClick={() => { onMovieClick(movie); }}>{movie.Title}</div>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Genre: PropTypes.object.isRequired,
    Director: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};