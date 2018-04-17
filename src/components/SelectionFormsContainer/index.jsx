import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SelectionForm from '../SelectionForm';


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
            key={`selection-form-${selection.id}`}
            x={selection.x}
            y={selection.y}
            width={selection.width}
            height={selection.height}
            password={selection.password}
          />))
        }
      </div>
    );
  }
}

SelectionFormsContainer.propTypes = {
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

export default connect(mapStateToProps)(SelectionFormsContainer);
