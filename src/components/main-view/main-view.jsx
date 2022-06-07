import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import { ProfileEditView } from '../profile-edit-view/profile-edit-view';


export class MainView extends React.Component {

  //'Constructor' is the place to initialize a state's values - reps the moment a component is created in the memory.
  //'Super' is related to object oriented programming - often means call the constructor of the parent class, React.Component here.
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null
    };
  }

  getMovies(token) {
    axios.get('http://localhost:1234/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  render() {
    const { movies, user } = this.state;

    return (
      <Router>

        <Row className='main-view justify-content-md-center'>

          <Button onClick={() => { this.onLoggedOut() }}>Logout</Button>
          <Link to={`/users/${user}`} >{user}</Link>

          <Route exact path="/" render={() => {
            if (!user) return
            <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
            </Col>
            if (movies.length === 0) return <div className='main-view'>There are no movies here</div>;
            return movies.map(m => (
              <Col md={3} key={m.id}>
                <MovieCard movie={m} />
              </Col>
            ))
          }} />

          <Route path="/register" render={() => {
            if (user) return <Redirect to="/" />
            return <Col md={3}>
              <RegistrationView />
            </Col>
          }} />

          <Route path={`/users/${user}`} render={({ history }) => {
            if (!user) return <Redirect to="/" />
            return <Col>
              <ProfileView user={user} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route path="/movies/:movieId" render={({ match }) => {
            if (!user) return
            <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
            </Col>
            if (movies.length === 0) return <div className='main-view'>There are no movies here</div>;
            return <Col md={8}>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route exact path="/genres/:name" render={({ match }) => {
            if (!user) return
            <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
            </Col>
            if (movies.length === 0) return <div className='main-view'>There are no movies here</div>;
            return <Col md={8}>
              <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} />
            </Col>
          }} />

          <Route exact path="/directors/:name" render={({ match }) => {
            if (!user) return
            <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
            </Col>
            if (movies.length === 0) return <div className='main-view'>There are no movies here</div>;
            return <Col md={8}>
              <DirectorView genre={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
            </Col>
          }} />

        </Row>
      </Router>
    );
  }
}
