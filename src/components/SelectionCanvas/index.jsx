import React, { Component } from 'react';
import { Rect, Group } from 'react-konva';
import PropTypes from 'prop-types';
import { setBoundaries } from './_helpers';

// configuration
const SELECTION_FILL = 'rgba(255,255,255,0.7)';
const SELECTION_STROKE = 'green';
const RESIZE_HANDLE_SIZE = 32;
const RESIZE_HANDLE_FILL = 'red';

const ResizeHandle = () => (
  <Group>
    <Rect width={RESIZE_HANDLE_SIZE} height={RESIZE_HANDLE_SIZE} fill={RESIZE_HANDLE_FILL} />
  </Group>
);

/**
 * Single selection on CanvasVisible
 */
class SelectionCanvas extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSelectionBoundaries = this.handleSelectionBoundaries.bind(this);
    this.changeHandlePosition = this.changeHandlePosition.bind(this);
    this.changeSelectionSize = this.changeSelectionSize.bind(this);
  }

  changeHandlePosition() {
    const { x, y } = this.selection.position();
    this.handle.position({
      x: (x + this.selection.size().width) - this.handle.size().width,
      y: (y + this.selection.size().height) - this.handle.size().height,
    });
  }

  changeSelectionSize() {
    const { x, y } = this.handle.position();
    this.selection.size({
      width: (x - this.selection.position().x) + this.handle.size().width,
      height: (y - this.selection.position().y) + this.handle.size().height,
    });
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
          onDragMove={this.changeHandlePosition}
          ref={(elem) => { this.selection = elem; }}

        />
        <Group
          x={(this.props.x + this.props.width) - RESIZE_HANDLE_SIZE}
          y={(this.props.y + this.props.height) - RESIZE_HANDLE_SIZE}
          width={RESIZE_HANDLE_SIZE}
          height={RESIZE_HANDLE_SIZE}
          onDragMove={this.changeSelectionSize}
          draggable={true}
          ref={(elem) => { this.handle = elem; }}
        >
          <ResizeHandle />
        </Group>
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
