import React, { Component } from 'react';
import { Stage, Layer, Image } from 'react-konva';

class CanvasVisible extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="canvas-wrapper">
        <Stage className="canvas-stage">
          <Layer>
            <Image />
          </Layer>
        </Stage>
      </div>
    );
  }
}

export default CanvasVisible;
