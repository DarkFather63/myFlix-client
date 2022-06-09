import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom';
import Container from 'react-bootstrap';

//importing MainView component from components folder
import { MainView } from './components/main-view/main-view';

//Import statement to indicate that you need to bundle `./index.scss`
import './index.scss';
import reactDom from 'react-dom';


//Main component (will eventually use all the others)
export class MyFlixApplication extends React.Component {
  render() {
    return (
      <Container fluid="md">
        <MainView />
      </Container>
    );
  }
}

// Finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);