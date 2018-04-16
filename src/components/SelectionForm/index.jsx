import React from 'react';

/**
 * Form for a single selection
 */

const SelectionForm = () => (
  <div className="selection-form">
    Selection Form
    <div className="input-section">
      <div className="id-area">
        <div className="input-label-wrapper">
          <label>id:</label>
          <span>1</span>
        </div>
      </div>
      <div className="coordinates-area">
        <div className="input-label-wrapper">
          <label>key:</label>
          <input type="text" />
        </div>
        <div className="input-label-wrapper">
          <label>x:</label>
          <input type="text" />
        </div>
        <div className="input-label-wrapper">
          <label>y:</label>
          <input type="text" />
        </div>
        <div className="input-label-wrapper">
          <label>width:</label>
          <input type="text" />
        </div>
        <div className="input-label-wrapper">
          <label>height:</label>
          <input type="text" />
        </div>
      </div>
      <div className="icons-area"></div>
    </div>
    <div className="errors-section"></div>
  </div>
);

export default SelectionForm;
