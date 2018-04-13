import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
// eslint-disable-next-line import/no-extraneous-dependencies
import { composeWithDevTools } from 'redux-devtools-extension';

import MainContainer from './components/MainContainer';
import reducer from './reducers';
import defaultState from './store/defaultState';
import './stylesheets/main.scss';

let store;

if (process.env.NODE_ENV === 'production') {
  store = createStore(
    reducer,
    defaultState,
    compose(applyMiddleware(thunk)),
  );
} else {
  store = createStore(
    reducer,
    defaultState,
    // Requires redux devtools extension to be installed
    composeWithDevTools(applyMiddleware(thunk)),
  );
}


const App = () => (
  <Provider store={store}>
    <MainContainer />
  </Provider>
);

ReactDOM.render(
  <App />,
  // eslint-disable-next-line no-undef
  document.getElementById('app'),
);
