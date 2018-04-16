import React, { Component } from 'react';
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
        <SelectionForm />
      </div>
    );
  }
}

export default SelectionFormsContainer;
