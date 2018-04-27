import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  obfuscateImage,
  unloadImage,
  addSelection,
  deleteSelection,
} from '../../actions';


const ActionsPanel = props => (
  <div className="actions-panel">
    <button disabled={!props.imageLoaded} onClick={() => props.addSelection()} >New Selection</button>
    <button disabled={!(props.imageLoaded && props.currentSelectionId)} onClick={() => props.deleteSelection(props.currentSelectionId)} >Delete Selection</button>
    <button disabled={!props.imageLoaded} onClick={() => props.unloadImage()} >Close Image</button>
    <button disabled={!props.imageLoaded} onClick={() => props.obfuscateImage()} >Obfuscate</button>
  </div>
);

const mapStateToProps = state => ({
  currentSelectionId: state.selections.activeSelectionId,
  imageLoaded: state.srcImage.src ? true : false,
});

ActionsPanel.defaultProps = {
  currentSelectionId: null,
}

ActionsPanel.propTypes = {
  unloadImage: PropTypes.func.isRequired,
  addSelection: PropTypes.func.isRequired,
  deleteSelection: PropTypes.func.isRequired,
  obfuscateImage: PropTypes.func.isRequired,
  currentSelectionId: PropTypes.number,
};

const mapDispatchToProps = dispatch => ({
  unloadImage : () => dispatch(unloadImage()),
  addSelection : () => dispatch(addSelection()),
  deleteSelection : id => dispatch(deleteSelection(id)),
  obfuscateImage : () => dispatch(obfuscateImage()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ActionsPanel);
