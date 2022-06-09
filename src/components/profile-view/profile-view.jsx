import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap';
import Link from 'react-bootstrap';

export class ProfileView extends React.Component {

  render() {
    const { user, onBackClick } = this.props;
    return (
      <div className='profile-view'>
        <div>
          <p>User: (user.Username)</p>
          <p>Email: (user.Email)</p>
        </div>
        <h2>Favorite Movies:</h2>
        {favoriteMovieList.map((movies) => {
          return (
            <div key={movies._id}>
              <img src={movies.ImagePath} />
              <Link to={`/movies/${movies._id}`}>
                <h4>{movies.Title}</h4>
              </Link>
              <button variant="secondary" onClick={() => removeFav(movies._id)}>Remove</button>
            </div>
          )
        })}

        <form className='profile-form' onSubmit={(e) => handleSubmit(e)}>
          <h2>Want to change some info?</h2>
          <label>Username:</label>
          <input type='text' name='Username' defaultValue={user.Username} onChange={e => handleUpdate(e)} />
          <label>Password</label>
          <input type='password' name='Password' defaultValue={user.Password} onChange={e => handleUpdate(e)} />
        </form>

        <Link to={`/movies/${movie._id}`}>
          <Button variant="link">Movies</Button>
        </Link>
        <button onClick={() => { onBackClick(); }}>Back</button>
      </div>
    );
  }
}

ProfileView.propTypes = {
  profile: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired
};