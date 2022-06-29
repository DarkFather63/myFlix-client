import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Row, Col, CardGroup, Card } from 'react-bootstrap';
import { CardGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { setUser } from '../../actions/actions';

class UserUpdate extends React.Component {
  constructor() {
    super()

    this.state = {
      Username: '',
      Email: '',
      Birthday: '',
      FavoriteMovies: []
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    this.getUser(accessToken);
  }


  //Added setUser action to retrieve user details for update form - added connect at end of code.

  getUser(token) {
    const Username = localStorage.getItem('user');

    axios.get(`https://eryn-moviedb.herokuapp.com/users/${Username}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.props.setUser({
          Username: response.data.Username,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
          FavoriteMovies: response.data.FavoriteMovies
        });
      })
      .catch(function (error) {
        console.log(error)
      });
  }


  handleUpdate = (e) => {
    e.preventDefault();

    const Username = localStorage.getItem('user');
    const token = localStorage.getItem('token');


    axios.put(`https://eryn-moviedb.herokuapp.com/users/${Username}`, {


      Username: this.state.Username,
      Email: this.state.Email,
      Birthday: this.state.Birthday

    },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => {
        this.props.setUser({
          username: response.data.Username,
          password: response.data.Password,
          email: response.data.Email,
          birthday: response.data.Birthday
        });

        localStorage.setItem('user', this.state.Username);
        alert('Profile updated.');
      })
      .catch(function (error) {
        console.log(error);
        alert('Unable to update.');
      });

  };

  setUsername(value) {
    this.setState({
      Username: ''
    });
  }

  setEmail(value) {
    this.setState({
      Email: ''
    });
  }

  setBirthday(value) {
    this.setState({
      Birthday: ''
    });
  }

  getBirthdayValue = () => {
    if (this.state.Birthday) return this.state.Birthday.split('T')[0]
    return ''
  };


  render() {

    const { Username, Email, Birthday } = this.props;

    return (
      <Row>
        <Col md={8}>
          <CardGroup>
            <Card style={{ marginTop: 10, marginBottom: 10, padding: 20 }}>
              <Card.Title>Want to change some info?</Card.Title>
              <Form className='profile-form' onSubmit={(e) => { this.handleUpdate(e) }}>

                <p></p>

                <Form.Group controlId='formUsername' className='reg-form-inputs'>
                  <Form.Label>
                    Username:
                  </Form.Label>
                  <Form.Control type="text" placeholder='Enter a new username' defaultValue={Username} onChange={(e) => this.setUsername(e.target.value || '')} />
                </Form.Group>


                {/* //The following is commented out for editing purposes - may bring back later */}

                {/* <Form.Group controlId='formName' className='reg-form-inputs'>
                <Form.Label>
                  Name:
                </Form.Label>
                <Form.Control type="text" placeholder='Name' defaultValue={Name} onChange={e => handleUpdate(e)} />
              </Form.Group> */}

                {/* <Form.Group controlId='formPassword' className='reg-form-inputs'>
                <Form.Label>
                  Password:
                </Form.Label>
                <Form.Control type="password" placeholder='Password' defaultValue={password} onChange={e => handleUpdate(e)} />
                {values.passwordErr && <p>{values.passwordErr}</p>}
              </Form.Group> */}

                <Form.Group controlId='Email' className='reg-form-inputs'>
                  <Form.Label>
                    Email:
                  </Form.Label>
                  <Form.Control type="email" placeholder='Email' defaultValue={Email} onChange={(e) => this.setEmail(e.target.value || '')} />
                </Form.Group>

                <Form.Group controlId='updateBirthday'>
                  <Form.Label>
                    Birthday:
                  </Form.Label>
                  <Form.Control type="date" placeholder='Update your birthday' name='birthday' value={this.getBirthdayValue()} onChange={(e) => this.setBirthday(e.target.value || '')} />
                </Form.Group>

                <Button id='update-button' variant='primary' type='submit' style={{ margin: 10 }} onClick={(e) => { this.handleUpdate(e) }} >
                  Update Your Info
                </Button>

              </Form>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, { setUser })(UserUpdate);

/* UserUpdate.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
  }).isRequired
}; */