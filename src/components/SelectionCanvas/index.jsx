import React, { Component } from 'react';
import { Rect, Group } from 'react-konva';
import PropTypes from 'prop-types';
import { setBoundaries } from './_helpers';

// configuration
const SELECTION_FILL = 'rgba(255,255,255,0.7)';
const SELECTION_STROKE = 'green';

/**
 * Single selection on CanvasVisible
 */
class SelectionCanvas extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSelectionBoundaries = this.handleSelectionBoundaries.bind(this);
  }

  /**
   * Boundary function for konva to use when dragging selection
   * @param {Object} position - x and y coordinates
   * @param {number} position.x - x coordinate
   * @param {number} position.y - y coordinate
  */
  handleSelectionBoundaries({ x, y }) {
    return {
      x: setBoundaries(
        x,
        this.props.width,
        0,
        this.props.containerWidth,
      ),
      y: setBoundaries(
        y,
        this.props.height,
        0,
        this.props.containerHeight,
      ),
    };
  }

  render() {
    return (
      <Group>
        <Rect
          x={this.props.x}
          y={this.props.y}
          width={this.props.width}
          height={this.props.height}
          fill={SELECTION_FILL}
          draggable={true}
          stroke={SELECTION_STROKE}
          dragBoundFunc={this.handleSelectionBoundaries}
        />
      </Group>
    );
  }
}

SelectionCanvas.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  containerWidth: PropTypes.number.isRequired,
  containerHeight: PropTypes.number.isRequired,
};

export default SelectionCanvas;
