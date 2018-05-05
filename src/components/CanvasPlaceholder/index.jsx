import React from 'react';
import PropTypes from 'prop-types';

/**
 * A placeholder for when there is no image loaded into CanvasVisible
 */
const CanvasPlaceholder = props => (
  <div className="canvasPlaceholder">
    <form>
      <label htmlFor="image-browser">
        Upload Image
        <input id="image-browser" type="file" accept="image/*" onChange={props.handleImageUpload} />
        { props.loading ?
            'Loading' :
            null
        }
      </label>
    </form>
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
