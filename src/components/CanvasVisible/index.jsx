import React, { Component } from 'react';
import { Stage, Layer, Image } from 'react-konva';
import PropTypes from 'prop-types';

/**
 * Konva canvas where the loaded image is displayed
 */
class CanvasVisible extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="canvas-wrapper">
        <Stage
          className="canvas-stage"
          width={this.props.width}
          height={this.props.height}
        >
          <Layer>
            <Image
              image={this.props.src}
              width={this.props.width}
              height={this.props.height}
            />
          </Layer>
        </Stage>
      </div>
    );
  }
}

CanvasVisible.propTypes = {
  // eslint-disable-next-line no-undef
  src: PropTypes.instanceOf(HTMLImageElement).isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};


export default CanvasVisible;
