import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Link from 'react-bootstrap';

export class GenreView extends React.Component {

  render() {
    const { genre, onBackClick } = this.props;
    return (
      <div className='genre-view'>
        <div className='genre-image'>
          <img src={genre.ImagePath} />
        </div>
        <div className='genre-name'>
          <span className='value'>{genre.Name}</span>
        </div>
        <div className='genre-definition'>
          <span className='label'>Definition:</span>
          <span className='value'>{genre.Definition}</span>
        </div>
        <Link to={`/directors/${movie.Director.Name}`}>
          <Button variant="link">Director</Button>
        </Link>

        <Link to={`/movies/${movie._id}`}>
          <Button variant="link">Movies</Button>
        </Link>
        <button onClick={() => { onBackClick(); }}>Back</button>
      </div>
    );
  }
}

GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired
};