import React, { Component } from 'react';
import { Group } from 'react-konva';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SelectionCanvas from '../SelectionCanvas';
import {
  modifySelection,
  setActiveSelection,
} from '../../actions';

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
            id={selection.id}
            x={selection.x}
            y={selection.y}
            width={selection.width}
            height={selection.height}
            password={selection.password}
            containerWidth={this.props.containerWidth}
            containerHeight={this.props.containerHeight}
            updateCoordinates={this.props.updateCoordinates}
            scale={this.props.scale}
            active={this.props.activeSelectionId === selection.id}
            setActiveSelection={this.props.setActiveSelection}
          />))
        }
      </Group>
    );
  }
}

SelectionCanvasContainer.defaultProps = {
  activeSelectionId: null,
};

SelectionCanvasContainer.propTypes = {
  selections: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    password: PropTypes.string,
    x: PropTypes.number,
    y: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
  })).isRequired,
  scale: PropTypes.number.isRequired,
  containerWidth: PropTypes.number.isRequired,
  containerHeight: PropTypes.number.isRequired,
  updateCoordinates: PropTypes.func.isRequired,
  setActiveSelection: PropTypes.func.isRequired,
  activeSelectionId: PropTypes.number,
};

const mapStateToProps = state => ({
  selections: state.selections.collection,
  containerWidth: state.srcImage.width,
  containerHeight: state.srcImage.height,
  scale: state.srcImage.scale,
  activeSelectionId: state.selections.activeSelectionId,
});

const mapDispatchToProps = dispatch => ({
  updateCoordinates: (coords) => {
    dispatch(modifySelection(coords));
  },
  setActiveSelection: (id) => {
    dispatch(setActiveSelection(id));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SelectionCanvasContainer);
