import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SelectionForm from '../SelectionForm';
import {
  modifySelection,
  setActiveSelection,
} from '../../actions';

/**
 * Container for Selection Forms that are linked to selections in CanvasVisible
 */
class SelectionFormsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="selection-forms-container">
        Forms for Selections
        {
          this.props.selections.map(selection => (<SelectionForm
            key={`selection-form-${selection.id.value}`}
            id={selection.id}
            x={selection.x}
            y={selection.y}
            width={selection.width}
            height={selection.height}
            password={selection.password}
            updateCoordinates={this.props.updateCoordinates}
            setActiveSelection={this.props.setActiveSelection}
            errors={[
              ...selection.id.errors,
              ...selection.x.errors,
              ...selection.y.errors,
              ...selection.width.errors,
              ...selection.height.errors,
              ...selection.password.errors,
            ]}
          />))
        }
      </div>
    );
  }
}

SelectionFormsContainer.propTypes = {
  selections: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.Object,
    password: PropTypes.Object,
    x: PropTypes.Object,
    y: PropTypes.Object,
    width: PropTypes.Object,
    height: PropTypes.Object,
  })).isRequired,
  updateCoordinates: PropTypes.func.isRequired,
  setActiveSelection: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  selections: state.selections.collection,
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
)(SelectionFormsContainer);
