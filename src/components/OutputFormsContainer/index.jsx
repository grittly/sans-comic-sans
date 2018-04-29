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
      <div className="selection-forms-container">
        <div>
          <label htmlFor="export-selections-summary">
            Summary
            <textarea rows={5} id="export-selections-summary" value={this.props.summary} readOnly placeholder={'No selections presnt'}/>
          </label>
        </div>
        <button>Download</button>
        <button>Start Again</button>
      </div>
    );
  }
}

OutputFormsContainer.defaultProps = {
  summary: '',
};

OutputFormsContainer.propTypes = {
  summary: PropTypes.string,
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
});

export default connect(mapStateToProps)(OutputFormsContainer);
