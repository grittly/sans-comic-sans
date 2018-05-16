/* globals window */
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

  componentDidMount() {
    // Trigger a scroll event so that ActionsPanel fixed
    // poisitioning is triggered on image load
    window.scrollTo(window.scrollX, window.scrollY - 1);
    window.scrollTo(window.scrollX, window.scrollY + 1);
  }

  render() {
    return (
      <div
        className="canvas-wrapper"
        style={{
          height: this.props.height,
        }}
      >
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
              preventDefault={false}
            />
            {
              this.props.displaySelections ?
                <SelectionCanvasContainer /> :
                null
            }
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
  displaySelections: PropTypes.bool.isRequired,
};

export default CanvasVisible;
