import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Row, Col, CardGroup, Card } from 'react-bootstrap';
import { CardGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export class UserUpdate extends React.Component {
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

  getUser(token) {
    const Username = localStorage.getItem('user');

    axios.get(`https://eryn-moviedb.herokuapp.com/users/${Username}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.setState({
          Name: response.data.Name,
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

    const isReq = validate()
    if (isReq) {
      axios.put(`https://eryn-moviedb.herokuapp.com/users/${Username}`, {

        Name: this.state.Name,
        Username: this.state.Username,
        Email: this.state.Email,
        Birthday: this.state.Birthday

      },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
        .then((response) => {
          this.setState({
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
    }
  };

  setUsername(value) {
    this.setState({
      Username: value
    });
  }

  /* setName(value) {
    this.setState({
      Name: value
    });
  } */

  setEmail(value) {
    this.setState({
      Email: value
    });
  }

  setBirthday(value) {
    this.setState({
      Birthday: value
    });
  }

  getBirthdayValue = () => {
    if (this.state.Birthday) return this.state.Birthday.split('T')[0]
    return ''
  };


  render() {

    const { Username, Email, Birthday } = this.state;

    return (
      <Row>
        <Col md={8}>
          <CardGroup>
            <Card>
              <Card.Title>Want to change some info?</Card.Title>
              <Form className='profile-form' onSubmit={(e) => { this.handleUpdate(e) }}>

                <p></p>

                <Form.Group controlId='formUsername' className='reg-form-inputs'>
                  <Form.Label>
                    Username:
                  </Form.Label>
                  <Form.Control type="text" placeholder='Enter a new username' defaultValue={Username} onChange={(e) => this.setUsername(e.target.value || '')} />
                </Form.Group>

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
                  <Form.Control type="date" placeholder='Update your birthday' name='birthday' value={this.getBirthdayValue()} onChange={(e) => this.setUsername(e.target.value || '')} />
                </Form.Group>

                <Button id='update-button' variant='primary' type='submit' onClick={(e) => { this.handleUpdate(e) }} >
                  Update Your Info
                </Button>

                <Link to={`/movies`}>
                  <Button variant="link">Movies</Button>
                </Link>
                <button onClick={() => { onBackClick(); }}>Back</button>
              </Form>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    )
  }
}


/* UserUpdate.propTypes = {
  user: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired
}; */