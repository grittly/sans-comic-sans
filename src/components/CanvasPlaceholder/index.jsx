import React from 'react';

/**
 * A placeholder for when there is no image loaded into CanvasVisible
 */
const CanvasPlaceholder = () => (
  <div className="canvas-placeholder">
    <form>
      <label htmlFor="image-browser">
        Upload Image
        <input id="image-browser" type="file" accept="image/*" />
      </label>
    </form>
  </div>
);

export default CanvasPlaceholder;
