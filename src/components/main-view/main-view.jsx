import React from 'react';
import axios from 'axios';
import { Row, Col, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Route, Redirect, Link, BrowserRouter as Router } from 'react-router-dom';


//Importing each view from their respective files (7 views so far)
import { LoginView } from '../login-view/login-view';
import { MovieView } from '../movie-view/movie-view';
import { MovieCard } from '../movie-card/movie-card';
import { RegistrationView } from '../registration-view/registration-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import ProfileView from '../profile-view/profile-view.jsx';
import { MyNavbar } from '../navbar/navbar';

//exports this view to the main index.jsx file (then to index.html)
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

  //Study this more - function for switching view between main and movie
  //Sets state of movie clicked to the appropriate movie response
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  //'GETs' movies from database (link to app), adds authorization so no one can simply enter endpoints
  //Have to log in to see app
  getMovies(token) {
    axios.get('https://eryn-moviedb.herokuapp.com/movies', {
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


  //function for authorizing logged in user
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  //when login is successful, stores login token locally
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
        <MyNavbar user={user} />
        <Row className='main-view justify-content-md-center'>

          <Route exact path="/" render={() => {
            if (!user) return (
              <Col>
                <LoginView movies={movies} onLoggedIn={user => this.onLoggedIn(user)} />;
              </Col>
            )

            if (movies.length === 0) return <div className='main-view'></div>;

            if (user) return (
              <Col md={3} lg={4} key={movies._id}>
                {
                  movies.map((movie) => {
                    return <MovieCard movie={movie} onBackClick={this.setSelectedMovie} />
                  })
                }

              </Col>
            )
          }} />

          <Route exact path="/login" render={() => {
            if (movies.length === 0) return <div className='main-view'>There are no movies here</div>;
            return <Col md={8}>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
          }} />

          <Route path="/register" render={() => {
            if (user) return <Redirect to="/" />
            return <Col lg={8} md={4}>
              <RegistrationView />
            </Col>
          }} />

          <Route path={`/users/${user}`} render={({ history }) => {
            if (!user) return <Redirect to="/" />
            return <Col>
              <ProfileView user={user} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route path={`/user-update/${user}`} render={({ history }) => {
            if (!user) return <Redirect to="/" />
            if (movies.length === 0) return <div className='main-view'></div>;
            return <Col>
              <UserUpdate user={user} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route path="/movies/:id" render={({ match, history }) => {
            if (!user) return
            <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
            </Col>

            if (movies.length === 0) return <div className='main-view'>There are no movies here</div>;

            return <Col md={8} className='justify-content-md-center'>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
              <Button onClick={() => { this.onLoggedOut() }}>Logout</Button>
            </Col>
          }} />

          <Route exact path="/genres/:name" render={({ match, history }) => {
            if (!user) return
            <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
            </Col>

            if (movies.length === 0) return <div className='main-view'>There are no movies here</div>;

            return <Col md={8} className='justify-content-md-center'>
              <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route exact path="/directors/:name" render={({ match, history }) => {
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
      </Router >
    );
  }
}
