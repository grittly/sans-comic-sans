import React from 'react';
import { Rect, Group } from 'react-konva';
import PropTypes from 'prop-types';

/**
 * Single selection on CanvasVisible
 */
const SelectionCanvas = props => (
  <Group>
    <Rect
      x={props.x}
      y={props.y}
      width={props.width}
      height={props.height}
    />
  </Group>
);

SelectionCanvas.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default SelectionCanvas;
