import React, { Component } from 'react';
import CanvasPlaceholder from '../CanvasPlaceholder';
import CanvasVisible from '../CanvasVisible';
import Header from '../Header';

/**
 * Container for CanvasVisible, CanvasPlaceholder and Header
 */
class CanvasContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleCanvasiResize = this.handleCanvasResize;
  }

  componentDidMount() {
    // eslint-disable-next-line no-undef
    window.addEventListener('resize', this.handleCanvasResize);
  }

  handleCanvasResize(e) {
    // TODO: update container size in redux store based on browser window size
  }

  render() {
    return (
      <div className="canvas-container" ref={(elem) => { this.canvasContainer = elem; }}>
        Header, Canvas and Canvas placeholder
        <Header />
        <CanvasPlaceholder />
        <CanvasVisible />
      </div>
    );
  }
}

export default CanvasContainer;
