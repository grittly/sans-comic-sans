import React, { Component } from 'react';
import { Group } from 'react-konva';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
        {
          this.props.selections.map(selection => (<SelectionCanvas
            key={`selection-form-${selection.id}`}
            x={selection.x}
            y={selection.y}
            width={selection.width}
            height={selection.height}
            password={selection.password}
          />))
        }
      </Group>
    );
  }
}

SelectionCanvasContainer.propTypes = {
  selections: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    password: PropTypes.string,
    x: PropTypes.number,
    y: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
  })).isRequired,
};

const mapStateToProps = state => ({
  selections: state.selections.collection,
});

export default connect(mapStateToProps)(SelectionCanvasContainer);
