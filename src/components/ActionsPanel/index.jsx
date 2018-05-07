/* globals window */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import {
  obfuscateImage,
  unloadImage,
  addAndValidateSelection,
  deleteSelection,
} from '../../actions';
import {
  ClearIcon,
  NewSelectionIcon,
  DeleteSelectionIcon,
  ScrambleIcon,
  HelpIcon,
  DownloadIcon,
} from '../Icons';


class ActionsPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fixed: false,
    };
    this.handleScrolling = this.handleScrolling.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScrolling);
  }

  handleScrolling() {
    if (!this.state.fixed && this.actionsPanel.offsetTop > (window.innerHeight + window.scrollY)) {
      this.setState({
        fixed: true,
      });
    } else if (
      this.state.fixed &&
      this.actionsPanel.offsetTop <= (window.innerHeight + window.scrollY)
    ) {
      this.setState({
        fixed: false,
      });
    }
  }

  render() {
    return (
      <div className="actions-panel-container" ref={(elem) => { this.actionsPanel = elem; }}>
        <div
          style={this.state.fixed ? { width: this.props.width } : {}}
          className={classnames('actions-panel', { fixed: this.state.fixed })}
        >
          <NewSelectionIcon
            onClick={() => this.props.addSelection()}
            hidden={!this.props.imageLoaded || this.props.isImageObfuscated}
          />
          <DeleteSelectionIcon
            onClick={() => this.props.deleteSelection(this.props.currentSelectionId)}
            hidden={!(this.props.imageLoaded && this.props.currentSelectionId) || this.props.isImageObfuscated}
          />
          {
            this.props.isImageObfuscated ?
              <DownloadIcon
                onClick={() => console.log("download")}
                hidden={!this.props.imageLoaded}
              /> :
              <ScrambleIcon
                onClick={() => this.props.obfuscateImage()}
                hidden={!this.props.imageLoaded}
              />
          }
          <ClearIcon
            onClick={() => this.props.unloadImage()}
            hidden={!this.props.imageLoaded}
          />
          <HelpIcon
            onClick={() => console.log("Open up modal")}
            hidden={false}
          />
          {
            // <button
            //   disabled={!this.props.imageLoaded}
            //   onClick={() => this.props.addSelection()}
            // >
            //   New Selection
            // </button>
            // <button
            //   disabled={!(this.props.imageLoaded && this.props.currentSelectionId)}
            //   onClick={() => this.props.deleteSelection(this.props.currentSelectionId)}
            // >
            //   Delete Selection
            // </button>
            // <button
            //   disabled={!this.props.imageLoaded}
            //   onClick={() => this.props.unloadImage()}
            // >
            //   Close Image
            // </button>
            // <button
            //   disabled={!this.props.imageLoaded}
            //   onClick={() => this.props.obfuscateImage()}
            // >
            //   Obfuscate
            // </button>
          }
      </div>
      </div>
  );
  }
}

const mapStateToProps = state => ({
  currentSelectionId: state.selections.activeSelectionId,
  imageLoaded: state.srcImage.src !== null,
  isImageObfuscated: state.obfuscatedImage.src !==null,
});

ActionsPanel.defaultProps = {
  currentSelectionId: null,
};

ActionsPanel.propTypes = {
  unloadImage: PropTypes.func.isRequired,
  addSelection: PropTypes.func.isRequired,
  deleteSelection: PropTypes.func.isRequired,
  obfuscateImage: PropTypes.func.isRequired,
  currentSelectionId: PropTypes.number,
  imageLoaded: PropTypes.bool.isRequired,
  width: PropTypes.number.isRequired,
};

const mapDispatchToProps = dispatch => ({
  unloadImage: () => dispatch(unloadImage()),
  addSelection: () => dispatch(addAndValidateSelection()),
  deleteSelection: id => dispatch(deleteSelection(id)),
  obfuscateImage: () => dispatch(obfuscateImage()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ActionsPanel);
