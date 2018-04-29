import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Import selections from a base64 string
 */
class ImportSelectionsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    this.setState({
      value: e.target.value,
    });
  }

  handleClick() {
    this.props.importSelections(this.state.value);
    this.setState({
      value: '',
    });
  }

  render() {
    return (
      <div className="import-selections-form">
        <label htmlFor="export-selections-summary">
          Import selections
          <textarea rows={5} id="export-selections-base64" placeholder="Paste the base64 key here" value={this.state.value} onChange={this.handleChange} />
          <button type="button" onClick={this.handleClick}>Import</button>
        </label>
      </div>
    );
  }
}

ImportSelectionsForm.propTypes = {
  importSelections: PropTypes.func.isRequired,
};

export default ImportSelectionsForm;
