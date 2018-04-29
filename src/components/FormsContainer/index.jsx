import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  obfuscateImage,
  importSelections,
} from '../../actions';
import SelectionFormsContainer from '../SelectionFormsContainer';
import OutputFormsContainer from '../OutputFormsContainer';
import ImportSelectionsForm from '../ImportSelectionsForm';


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
        {
          this.props.isObfuscated ?
            <div>
              <form>
                <OutputFormsContainer />
                <a href={this.props.obfuscatedImageSrc.src} download="obfuscatedImage">
                  <button type="button">Download</button>
                </a>
                <button type="button">Start again</button>
              </form>
            </div> :
            <form onSubmit={this.handleSubmit}>
              Settings Container
              <SelectionFormsContainer />
              <ImportSelectionsForm importSelections={this.props.importSelections} />
              <button type="submit" disabled={!this.props.readyToObfuscate}>Obfuscate</button>
            </form>
        }
      </div>
    );
  }
}

SettingsContainer.defaultProps = {
  obfuscatedImageSrc: null,
};

SettingsContainer.propTypes = {
  readyToObfuscate: PropTypes.bool.isRequired,
  isObfuscated: PropTypes.bool.isRequired,
  obfuscateImage: PropTypes.func.isRequired,
  // eslint-disable-next-line no-undef
  obfuscatedImageSrc: PropTypes.instanceOf(HTMLImageElement),
  importSelections: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  readyToObfuscate: state.selections.validated && !state.selections.hasErrors,
  isObfuscated: state.obfuscatedImage.src !== null,
  obfuscatedImageSrc: state.obfuscatedImage.src,
});

const mapDispatchToProps = dispatch => ({
  obfuscateImage: () => dispatch(obfuscateImage()),
  importSelections: selectionsBase64 => dispatch(importSelections(selectionsBase64)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SettingsContainer);
