import React from 'react';
import PropTypes from 'prop-types';
import { UploadImageIcon } from '../Icons';

/**
 * A placeholder for when there is no image loaded into CanvasVisible
 */
const CanvasPlaceholder = props => (
  <div className="canvasPlaceholder">
    <div className="uploadArea">
      <label htmlFor="image-browser" className="upload-image-container">
        <span>Click to Upload</span>
        <UploadImageIcon loading={props.loading} />
        <input id="image-browser" type="file" accept="image/*" onChange={props.handleImageUpload} />
      </label>
      <button className="load-sample-btn"><span>or use an example</span></button>
    </div>
  </div>
);

CanvasPlaceholder.defaultProps = {
  loading: false,
};

CanvasPlaceholder.propTypes = {
  loading: PropTypes.bool,
  handleImageUpload: PropTypes.func.isRequired,
};

export default CanvasPlaceholder;
