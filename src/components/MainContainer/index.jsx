import React from 'react';
import { hot } from 'react-hot-loader';

const MainContainer = () => (
  <div className="mainContainer">
    <div className="leftContainer">
      <h1>Canvas</h1>
    </div>
    <div className="rightContainer">
      <h1>Settings</h1>
    </div>
  </div>
);

export default hot(module)(MainContainer);
