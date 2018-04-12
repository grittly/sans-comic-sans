import React from 'react';
import ReactDOM from 'react-dom';
import MainContainer from './components/MainContainer';
import './stylesheets/main.scss';

const App = () => (
  <MainContainer />
);

ReactDOM.render(
  <App />,
  // eslint-disable-next-line no-undef
  document.getElementById('app'),
);
