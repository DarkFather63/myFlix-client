import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

export class ProfileEditView extends React.Component {

  render() {
    const { profileEdit, onBackClick
    } = this.props;
    return (
      <div className='profile-view'>
        <div className='profile-image'>
          <img src={user.ImagePath} />
        </div>
        <div className='username'>
          <span className='value'>{username}</span>
        </div>
        <div className='personal-bio'>
          <span className='label'>Bio:</span>
          <span className='value'>{user}</span>
        </div>
        <Link to={`/movies/${movie._id}`}>
          <Button variant="link">Movies</Button>
        </Link>
        <button onClick={() => { onBackClick(); }}>Back</button>
      </div>
    );
  }
}

ProfileEditView.propTypes = {
  profile: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired
};