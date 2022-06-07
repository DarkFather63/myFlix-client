import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Link from 'react-bootstrap';

export class DirectorView extends React.Component {

  render() {
    const { movie, onBackClick } = this.props;
    return (
      <div className='director-view'>
        <div className='headshot'>
          <img src={director.ImagePath} />
        </div>
        <div className='director-name'>
          <span className='value'>{director.Name}</span>
        </div>
        <div className='director-bio'>
          <span className='label'>Biography:</span>
          <span className='value'>{director.Bio}</span>
        </div>
        <Link to={`/movies/:movieId`}>
          <Button variant="link">Movies</Button>
        </Link>

        <Link to={`/genres/${movie.Genre.Name}`}>
          <Button variant="link">Genre</Button>
        </Link>
        <button onClick={() => { onBackClick(); }}>Back</button>
      </div>
    );
  }
}

DirectorView.propTypes = {
  director: PropTypes.shape({
    Bio: PropTypes.string.isRequired,
    Birth: PropTypes.string.isRequired,
  }).isRequired
};