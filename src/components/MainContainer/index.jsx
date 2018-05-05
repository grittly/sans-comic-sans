import React from 'react';
import { hot } from 'react-hot-loader';
import CanvasContainer from '../CanvasContainer';
import FormsContainer from '../FormsContainer';
import Footer from '../Footer';

const MainContainer = () => (
  <div className="mainContainer">
    <div className="leftContainer">
      <CanvasContainer />
    </div>
    <div className="rightContainer">
      <FormsContainer />
    </div>
      <Footer />
  </div>
);

export default hot(module)(MainContainer);
