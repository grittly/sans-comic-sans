import React, { Component } from 'react';
import { Stage, Layer, Image } from 'react-konva';
import PropTypes from 'prop-types';
import SelectionCanvasContainer from '../SelectionCanvasContainer';

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
      <div
        className="canvas-wrapper"
        style={{
          position: 'relative',
          height: this.props.height,
          border: '1px solid black',
        }}
      >
        <Stage
          className="canvas-stage"
          width={this.props.width}
          height={this.props.height}
          style={{ position: 'absolute' }}
        >
          <Layer>
            <Image
              image={this.props.src}
              width={this.props.width}
              height={this.props.height}
            />
            <SelectionCanvasContainer />
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
