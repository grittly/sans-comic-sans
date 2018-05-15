import React, { Component } from 'react';
import { Rect, Group, Path, Text } from 'react-konva';
import PropTypes from 'prop-types';
import {
  setBoundaries,
  scaleCoordinates,
} from './_helpers';

// configuration
const SELECTION_FILL_ACTIVE = 'rgba(35,149,154,0.3)';
const SELECTION_FILL_INACTIVE = 'rgba(255,255,255,0.2)';
const SELECTION_STROKE = 'rgba(255,255,255,1)';
const SELECTION_STROKE_WIDTH = 2;
const SELECTION_STROKE_DASH = [10, 5];
const RESIZE_HANDLE_SIZE = 32;
const RESIZE_HANDLE_FILL = 'rgba(255, 255, 255, 1)';
// const TEXT_COLOR = 'rgba(255,61,56,1)';
const TEXT_COLOR = 'rgba(35,149,154,1)';

const ResizeHandle = () => (
  <Group>
    <Rect
      width={RESIZE_HANDLE_SIZE * 2}
      height={RESIZE_HANDLE_SIZE * 2}
      opacity={0}
      x={RESIZE_HANDLE_SIZE / -2}
      y={RESIZE_HANDLE_SIZE / -2}
    />
    <Path data="M20.35,32.35l12,-12l0,-4l-16,16l4,0Z" fill={RESIZE_HANDLE_FILL} />
    <Path data="M32.35,8.35l-24,24l-4,0l28,-28l0,4Z" fill={RESIZE_HANDLE_FILL} />
  </Group>
);

/**
 * Single selection on CanvasVisible
 */
class SelectionCanvas extends Component {
  constructor(props) {
    super(props);
    this.state = scaleCoordinates(props, RESIZE_HANDLE_SIZE);
    this.handleSelectionBoundaries = this.handleSelectionBoundaries.bind(this);
    this.handleHandleBoundaries = this.handleHandleBoundaries.bind(this);
    this.changeHandlePosition = this.changeHandlePosition.bind(this);
    this.changeSelectionSize = this.changeSelectionSize.bind(this);
    this.updateCoordinates = this.updateCoordinates.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  // Convenient to do scaling in one place
  componentWillReceiveProps({
    x,
    y,
    scale,
    width,
    height,
    containerWidth,
    containerHeight,
    validated,
  }) {
    if (validated) {
      this.setState(scaleCoordinates({
        x,
        y,
        width,
        height,
        containerWidth,
        containerHeight,
        scale,
      }, RESIZE_HANDLE_SIZE));
    }
  }

  /**
   * Update the handle position as the selection is being dragged
   */
  changeHandlePosition() {
    const { x, y } = this.selection.position();
    this.handle.position({
      x: (x + this.selection.size().width) - this.handle.size().width,
      y: (y + this.selection.size().height) - this.handle.size().height,
    });
  }

  /**
   * Update the selection size as the handle is being dragged
   */
  changeSelectionSize() {
    const { x, y } = this.handle.position();
    this.selection.size({
      width: (x - this.selection.position().x) + this.handle.size().width,
      height: (y - this.selection.position().y) + this.handle.size().height,
    });
  }

  /**
   * Update the selection position and size after dragging stops
   */
  updateCoordinates() {
    const { width, height } = this.selection.size();
    const { x, y } = this.selection.position();
    const { id, scale } = this.props;
    this.props.updateCoordinates({
      id,
      x: Math.round(x / scale),
      y: Math.round(y / scale),
      width: Math.round(width / scale),
      height: Math.round(height / scale),
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
        this.state.selection.width,
        0,
        this.state.container.width,
      ),
      y: setBoundaries(
        y,
        this.state.selection.height,
        0,
        this.state.container.height,
      ),
    };
  }

  /**
   * Boundary function for konva to use when dragging the handle
   * @param {Object} position - x and y coordinates
   * @param {number} position.x - x coordinate
   * @param {number} position.y - y coordinate
   */
  handleHandleBoundaries({ x, y }) {
    return {
      x: setBoundaries(
        x,
        this.state.handle.width,
        this.state.selection.x,
        this.state.container.width,
      ),
      y: setBoundaries(
        y,
        this.state.handle.height,
        this.state.selection.y,
        this.state.container.height,
      ),
    };
  }

  /**
   * Set current selection as active when it is clicked on
   */
  handleClick() {
    this.props.setActiveSelection(this.props.id);
  }

  render() {
    return (
      <Group>
        <Rect
          x={this.state.selection.x}
          y={this.state.selection.y}
          width={this.state.selection.width}
          height={this.state.selection.height}
          fill={this.props.active ? SELECTION_FILL_ACTIVE : SELECTION_FILL_INACTIVE}
          draggable={this.props.active}
          stroke={SELECTION_STROKE}
          dragBoundFunc={this.handleSelectionBoundaries}
          onDragMove={this.changeHandlePosition}
          ref={(elem) => { this.selection = elem; }}
          onDragEnd={this.updateCoordinates}
          onClick={this.handleClick}
          onTap={this.handleClick}
          strokeWidth={SELECTION_STROKE_WIDTH}
          dash={SELECTION_STROKE_DASH}
        />
        {
          this.props.active ?
            <Group
              x={(this.state.handle.x + this.state.handle.width) - RESIZE_HANDLE_SIZE}
              y={(this.state.handle.y + this.state.handle.height) - RESIZE_HANDLE_SIZE}
              width={this.state.handle.width}
              height={this.state.handle.height}
              onDragMove={this.changeSelectionSize}
              draggable={this.props.active}
              ref={(elem) => { this.handle = elem; }}
              onDragEnd={this.updateCoordinates}
              dragBoundFunc={this.handleHandleBoundaries}
            >
              <ResizeHandle />
            </Group> :
            <Group
              x={this.state.selection.x}
              y={this.state.selection.y}
              width={this.state.handle.width}
              height={this.state.handle.height}
            >
              <Text
                x={5}
                y={5}
                text={this.props.id}
                fontSize={20}
                fill={TEXT_COLOR}
              />
            </Group>
        }
      </Group>
    );
  }
}

SelectionCanvas.propTypes = {
  id: PropTypes.number.isRequired,
  x: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  y: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  height: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  containerWidth: PropTypes.number.isRequired,
  containerHeight: PropTypes.number.isRequired,
  scale: PropTypes.number.isRequired,
  active: PropTypes.bool.isRequired,
  updateCoordinates: PropTypes.func.isRequired,
  setActiveSelection: PropTypes.func.isRequired,
  validated: PropTypes.bool.isRequired,
};

export default SelectionCanvas;
