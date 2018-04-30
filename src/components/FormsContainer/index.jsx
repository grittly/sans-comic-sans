import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  obfuscateImage,
  importSelections,
  changeObfuscationDirection,
} from '../../actions';
import SelectionFormsContainer from '../SelectionFormsContainer';
import OutputFormsContainer from '../OutputFormsContainer';
import ImportSelectionsForm from '../ImportSelectionsForm';
import ObfuscationDirectionForm from '../ObfuscationDirectionForm';

/**
 * Container for CanvasVisible, CanvasPlaceholder and Header
 */
class FormsContainer extends Component {
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
      <div className="forms-container">
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
              <ObfuscationDirectionForm decrypt={this.props.decrypt} changeDirection={this.props.changeObfuscationDirection} />
              <ImportSelectionsForm importSelections={this.props.importSelections} />
              <button type="submit" disabled={!this.props.readyToObfuscate}>Obfuscate</button>
            </form>
        }
      </div>
    );
  }
}

FormsContainer.defaultProps = {
  obfuscatedImageSrc: null,
};

FormsContainer.propTypes = {
  readyToObfuscate: PropTypes.bool.isRequired,
  isObfuscated: PropTypes.bool.isRequired,
  obfuscateImage: PropTypes.func.isRequired,
  // eslint-disable-next-line no-undef
  obfuscatedImageSrc: PropTypes.instanceOf(HTMLImageElement),
  importSelections: PropTypes.func.isRequired,
  decrypt: PropTypes.bool.isRequired,
  changeObfuscationDirection: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  readyToObfuscate: state.selections.validated && !state.selections.hasErrors,
  isObfuscated: state.obfuscatedImage.src !== null,
  obfuscatedImageSrc: state.obfuscatedImage.src,
  decrypt: state.settings.decrypt,
});

const mapDispatchToProps = dispatch => ({
  obfuscateImage: () => dispatch(obfuscateImage()),
  importSelections: selectionsBase64 => dispatch(importSelections(selectionsBase64)),
  changeObfuscationDirection: decrypt => dispatch(changeObfuscationDirection(decrypt)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormsContainer);
