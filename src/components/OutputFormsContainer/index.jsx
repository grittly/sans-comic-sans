/* globals btoa */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/**
 * Forms containing export information after image obfuscation
 */
class OutputFormsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="output-forms-container">
        <div>
          <label htmlFor="export-selections-summary" className="with-button">
            <span className="subheading">Base64 export</span>
            <textarea rows={5} id="export-selections-base64" value={this.props.selectionsBase64} readOnly placeholder="No selections presnt" className="expanded" />
            <button type="button" className="copy-button" data-clipboard-target="#export-selections-base64"><small>copy</small></button>
          </label>
        </div>
        <div>
          <label htmlFor="export-selections-base64" className="with-button">
            <span className="subheading">Summary</span>
            <textarea rows={5} id="export-selections-summary" value={this.props.summary} readOnly placeholder="No selections presnt" className="expanded" />
            <button type="button" className="copy-button" data-clipboard-target="#export-selections-summary"><small>copy</small></button>
          </label>
        </div>
      </div>
    );
  }
}

OutputFormsContainer.defaultProps = {
  summary: '',
  selectionsBase64: '',
};

OutputFormsContainer.propTypes = {
  summary: PropTypes.string,
  selectionsBase64: PropTypes.string,
};

const mapStateToProps = state => ({
  summary: state.selections.collection.reduce((acc, selection, idx) => (
    `${acc}` +
    `Selection ${idx + 1}\n` +
    `key: ${selection.password.value}\n` +
    `position: ${selection.x.value}, ${selection.y.value}\n` +
    `size: ${selection.width.value} x ${selection.height.value}\n` +
    '---------------\n'
  ), ''),
  selectionsBase64: state.selections.collection.length > 0 ?
    btoa(JSON.stringify(state.selections.collection.map(selection => ({
      x: selection.x.value,
      y: selection.y.value,
      width: selection.width.value,
      height: selection.height.value,
      password: selection.password.value,
    })))) : '',
});

export default connect(mapStateToProps)(OutputFormsContainer);
