import React from 'react';
import ReactDOM from 'react-dom';
import { Container } from 'react-bootstrap';
import { legacy_createStore as createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import { Provider } from 'react-redux';

import moviesApp from './reducers/reducers';

//importing MainView component from components folder
import MainView from './components/main-view/main-view';

//Import statement to indicate that you need to bundle `./index.scss`
import './index.scss';

const store = createStore(moviesApp, devToolsEnhancer());

//Main component 
export class MyFlixApplication extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container fluid="md">
          <MainView />
        </Container>
      </Provider>
    );
  }
}

// Finds the root of your app
const container = document.getElementsByClassName('myflixapp-container')[0];

// Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);