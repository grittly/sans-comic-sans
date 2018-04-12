import React from 'react';
import ReactDOM from 'react-dom';
// import { hot } from 'react-hot-loader';
import MainContainer from './components/MainContainer';

const MainApp = () => (
  <MainContainer />
);

ReactDOM.render(
  <MainApp />,
  // eslint-disable-next-line no-undef
  document.getElementById('app'),
);
