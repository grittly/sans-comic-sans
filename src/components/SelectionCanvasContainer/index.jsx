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
            key={`selection-canvas-${selection.id.value}`}
            id={selection.id.value}
            x={selection.x.value}
            y={selection.y.value}
            width={selection.width.value}
            height={selection.height.value}
            containerWidth={this.props.containerWidth}
            containerHeight={this.props.containerHeight}
            updateCoordinates={this.props.updateCoordinates}
            scale={this.props.scale}
            active={this.props.activeSelectionId === selection.id.value}
            setActiveSelection={this.props.setActiveSelection}
            validated={this.props.validated}
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
    id: PropTypes.object,
    x: PropTypes.object,
    y: PropTypes.object,
    width: PropTypes.object,
    height: PropTypes.object,
  })).isRequired,
  scale: PropTypes.number.isRequired,
  containerWidth: PropTypes.number.isRequired,
  containerHeight: PropTypes.number.isRequired,
  updateCoordinates: PropTypes.func.isRequired,
  setActiveSelection: PropTypes.func.isRequired,
  activeSelectionId: PropTypes.number,
  validated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  selections: state.selections.collection.filter(selection => !selection.hasErrors),
  containerWidth: state.srcImage.width,
  containerHeight: state.srcImage.height,
  scale: state.srcImage.scale,
  activeSelectionId: state.selections.activeSelectionId,
  validated: state.selections.validated,
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
