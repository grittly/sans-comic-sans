import React, { Component } from 'react';
import SelectionFormsContainer from '../SelectionFormsContainer';

/**
 * Container for CanvasVisible, CanvasPlaceholder and Header
 */
class SettingsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="settings-container">
        Settings Container
        <SelectionFormsContainer />
      </div>
    );
  }
}

export default SettingsContainer;
