import React from 'react';
import { hot } from 'react-hot-loader';
import CanvasContainer from '../CanvasContainer';
import FormsContainer from '../FormsContainer';

const MainContainer = () => (
  <div className="mainContainer">
    <div className="leftContainer">
      <h1>Canvas</h1>
      <CanvasContainer />
    </div>
    <div className="rightContainer">
      <h1>Settings</h1>
      <FormsContainer />
    </div>
  </div>
);

export default hot(module)(MainContainer);
