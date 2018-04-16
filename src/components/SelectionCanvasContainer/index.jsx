import React, { Component } from 'react';
import { Group } from 'react-konva';
import SelectionCanvas from '../SelectionCanvas';

/**
 * Container for selections that are displayed on CanvasVisible
 */
class SelectionCanvasContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Group>
        <SelectionCanvas />
      </Group>
    );
  }
}

export default SelectionCanvasContainer;
