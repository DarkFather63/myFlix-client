import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

export class GenreView extends React.Component {

  render() {
    const { movie, onBackClick } = this.props;
    console.log(movie)
    return (
      <div className='genre-view'>
        <div className='genre-image'>
          <img src={movie.ImagePath} />
        </div>
        <div className='genre-name'>
          <span className='value'>{movie.Genre.Name}</span>
        </div>
        <div className='genre-definition'>
          <span className='label'>Definition:</span>
          <span className='value'>{movie.Genre.Description}</span>
        </div>
        <Link to={`/directors/${movie.Director.Name}`}>
          <Button variant="link">Director</Button>
        </Link>

        <Link to={`/movies/${movie._id}`}>
          <Button variant="link">Movies</Button>
        </Link>
        <button onClick={() => { onBackClick(null); }}>Back</button>
      </div>
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