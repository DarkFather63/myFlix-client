import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';


import { setMovies } from '../../actions/actions';

import MoviesList from '../movies-list/movies-list';

//Importing each view from their respective files 
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import ProfileView from '../profile-view/profile-view';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { MyNavbar } from '../navbar/navbar';

//exports this view to the main index.jsx file (then to index.html)
class MainView extends React.Component {
  //'Constructor' is the place to initialize a state's values - reps the moment a component is created in the memory.
  //'Super' is related to object oriented programming - often means call the constructor of the parent class, React.Component here.
  constructor() {
    super();

    this.state = {
      user: null
    };
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

  //'GETs' movies from database (link to app), adds authorization so no one can simply enter endpoints
  //Have to log in to see app
  getMovies(token) {
    axios.get('https://eryn-moviedb.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
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

  //Study this more - function for switching view between main and movie
  //Sets state of movie clicked to the appropriate movie response
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }


  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  render() {
    let { movies } = this.props;
    let { user } = this.state;

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
              <Col md={9} sm={4} >
                <MoviesList movies={movies} key={movies._id} />;
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

          <Route path='/users/:username' render={({ history, match }) => {
            if (!user) return (
              <Col>
                <LoginView movies={movies} onLoggedIn={user => this.onLoggedIn(user)} />;
              </Col>
            )

            return <Col>
              <ProfileView onBackClick={() => history.goBack()} movies={movies} user={user} />
            </Col>
          }} />

          {/* <Route path={`/user-update/${user}`} render={({ history }) => {
            if (!user) return <Redirect to="/" />
            if (movies.length === 0) return <div className='main-view'></div>;
            return <Col>
              <UserUpdate user={user} onBackClick={() => history.goBack()} />
            </Col>
          }} /> */}

          <Route path="/movies/:id" render={({ match, history }) => {
            if (!user) return
            <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
            </Col>

            if (movies.length === 0) return <div className='main-view'>There are no movies here</div>;

            return <Col md={8} className='justify-content-md-center'>
              <MovieView movie={movies.find(m => m._id === match.params.id)} onBackClick={() => history.goBack()} />

            </Col>
          }} />

          <Route exact path="/genres/:name" render={({ match, history }) => {
            if (!user) return
            <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
            </Col>

            if (movies.length === 0) return <div className='main-view'>There are no movies here</div>;

            return <Col md={8} className='justify-content-md-center'>
              <GenreView movie={movies.find(m => m.Genre.Name === match.params.name)} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route exact path="/directors/:name" render={({ match, history }) => {
            if (!user) return
            <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
            </Col>

            if (movies.length === 0) return <div className='main-view'>There are no movies here</div>;

            return <Col md={8}>
              <DirectorView movie={movies.find(m => m.Director.Name === match.params.name)} onBackClick={() => history.goBack()} />
            </Col>
          }} />
        </Row>
      </Router >
    );
  }
}

let mapStateToProps = state => {
  return { movies: state.movies }
}

export default connect(mapStateToProps, { setMovies })(MainView);
