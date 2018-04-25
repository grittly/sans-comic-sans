import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { obfuscateImage } from '../../actions';
import SelectionFormsContainer from '../SelectionFormsContainer';

/**
 * Container for CanvasVisible, CanvasPlaceholder and Header
 */
class SettingsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.obfuscateImage();
  }

  render() {
    return (
      <div className="settings-container">
        <form onSubmit={this.handleSubmit}>
          Settings Container
          <SelectionFormsContainer />
          <input type="submit" value="Obfuscate" disabled={!this.props.readyToObfuscate} />
        </form>
      </div>
    );
  }
}


SettingsContainer.propTypes = {
  readyToObfuscate: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  readyToObfuscate: state.selections.validated && !state.selections.hasErrors,
});

const mapDispatchToProps = dispatch => ({
  obfuscateImage: () => dispatch(obfuscateImage()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SettingsContainer);
