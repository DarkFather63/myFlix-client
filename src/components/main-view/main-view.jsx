import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
//'React.Component' is a sort of template for creating components
//'Exposing' is done via the export keyword, allowing MainView to be used by other files
//Class keyword states that component is a class component vs a function component
//Extends is extending from the React template, React.Component - this lets us make the MainView component
//Render function returns the visual rep. of the component, with JSX code inside it (similar to HTML)
//Important! the render() function can only have one Root element (ie wrapped in a <div> or <React.Fragment> element)
export class MainView extends React.Component {

  //'Constructor' is the place to initialize a state's values - reps the moment a component is created in the memory.
  //'Super' is related to object oriented programming - often means call the constructor of the parent class, React.Component here.
  constructor() {
    super();
    this.state = {
      movies: [
        { _id: 1, Title: 'Inception', Description: 'desc1...', ImagePath: '...' },
        { _id: 2, Title: 'The Shawshank Redemption', Description: 'desc2...', ImagePath: '...' },
        { _id: 3, Title: 'Gladiator', Description: 'desc3...', ImagePath: '...' }
      ],
      selectedMovie: null
    };
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  render() {
    const { movies, selectedMovie } = this.state;

    if (selectedMovie) return <MovieView movie={selectedMovie} />;

    if (movies.length === 0) return <div className='main-view'>The list is empty!</div>;

    return (
      <div className='main-view'>
        {selectedMovie
          ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie) }} />
          : movies.map(movie => (
            <MovieCard key={movie._id} movieData={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />
          ))

        }
      </div>
    );
  }
}