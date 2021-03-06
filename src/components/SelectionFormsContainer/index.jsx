import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SelectionForm from '../SelectionForm';
import SelectionFormPlaceholder from '../SelectionFormPlaceholder';
import formSectionHOC from '../../HOC/formSectionHOC';
import {
  modifySelection,
  setActiveSelection,
  deleteSelection,
  addAndValidateSelection,
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
        {
          this.props.selections.length > 0 ?
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
              deleteSelection={this.props.deleteSelection}
              active={this.props.activeSelectionId === selection.id.value}
              errors={[
                ...selection.id.errors,
                ...selection.x.errors,
                ...selection.y.errors,
                ...selection.width.errors,
                ...selection.height.errors,
                ...selection.password.errors,
              ]}
            />)) :
            <SelectionFormPlaceholder addSelection={this.props.addSelection} />
        }
      </div>
    );
  }
}

SelectionFormsContainer.defaultProps = {
  activeSelectionId: null,
};

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
  activeSelectionId: PropTypes.number,
  addSelection: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  selections: state.selections.collection
  .sort((a, b) => a.id.value > b.id.value),
  activeSelectionId: state.selections.activeSelectionId,
});

const mapDispatchToProps = dispatch => ({
  updateCoordinates: (coords) => {
    dispatch(modifySelection(coords));
  },
  setActiveSelection: (id) => {
    dispatch(setActiveSelection(id));
  },
  deleteSelection: id => dispatch(deleteSelection(id)),
  addSelection: () => {
    dispatch(addAndValidateSelection());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(formSectionHOC(SelectionFormsContainer, {title: 'Selections', collapsed: false}));
