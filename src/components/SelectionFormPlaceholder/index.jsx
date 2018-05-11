import React from 'react';
import classnames from 'classnames';
import { GoX } from 'react-icons/lib/go';

/**
 * Form for a single selection
 */

const SelectionFormPlaceholder = props => (
  <div className={classnames('selection-form', 'placeholder')}>
    <div className="input-section">
      <div className="id-area">
        <div className="input-label-wrapper">
          <label>id:</label>
          <span>-</span>
        </div>
      </div>
      <div className="coordinates-area">
        <div className="input-label-wrapper password">
          <label>key:</label>
          <input
            type="text"
            id={`selection-empty-password`}
            readOnly
            onFocus={() => props.addSelection()}
          />
        </div>
        <div className="input-label-wrapper">
          <label htmlFor={`selection-empty-x`}>x:</label>
          <input
            type="number"
            id={`selection-empty-x`}
            readOnly
            onFocus={() => props.addSelection()}
          />
        </div>
        <div className="input-label-wrapper">
          <label htmlFor={`selection-empty-y`}>y:</label>
          <input
            type="number"
            id={`selection-empty-y`}
            readOnly
            onFocus={() => props.addSelection()}
          />
        </div>
        <div className="input-label-wrapper">
          <label htmlFor={`selection-empty-width`}>width:</label>
          <input
            type="number"
            id={`selection-empty-width`}
            readOnly
            onFocus={() => props.addSelection()}
          />
        </div>
        <div className="input-label-wrapper">
          <label htmlFor={`selection-empty-height`}>height:</label>
          <input
            type="number"
            id={`selection-empty-height`}
            readOnly
            onFocus={() => props.addSelection()}
          />
        </div>
      </div>
      <div className="icons-area">
        <span onClick={() => {}}><GoX /></span>
      </div>
    </div>
  </div>
);

export default SelectionFormPlaceholder;
