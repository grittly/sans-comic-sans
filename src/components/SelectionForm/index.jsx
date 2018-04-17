import React from 'react';

/**
 * Form for a single selection
 */

const SelectionForm = props => (
  <div className="selection-form">
    Selection Form
    <div className="input-section">
      <div className="id-area">
        <div className="input-label-wrapper">
          <label htmlFor={`selection-${props.id}-id`}>id:</label>
          <span id={`selection-${props.id}-id`}>{props.id}</span>
        </div>
      </div>
      <div className="coordinates-area">
        <div className="input-label-wrapper">
          <label htmlFor={`selection-${props.id}-password`}>key:</label>
          <input type="text" id={`selection-${props.id}-password`} value={props.password} />
        </div>
        <div className="input-label-wrapper">
          <label htmlFor={`selection-${props.id}-x`}>x:</label>
          <input type="text" id={`selection-${props.id}-x`} value={props.x}/>
        </div>
        <div className="input-label-wrapper">
          <label htmlFor={`selection-${props.id}-y`}>y:</label>
          <input type="text" id={`selection-${props.id}-y`} value={props.y}/>
        </div>
        <div className="input-label-wrapper">
          <label htmlFor={`selection-${props.id}-width`}>width:</label>
          <input type="text" id={`selection-${props.id}-width`} value={props.width}/>
        </div>
        <div className="input-label-wrapper">
          <label htmlFor={`selection-${props.id}-height`}>height:</label>
          <input type="text" id={`selection-${props.id}-height`} value={props.height}/>
        </div>
      </div>
      <div className="icons-area"></div>
    </div>
    <div className="errors-section"></div>
  </div>
);

export default SelectionForm;
