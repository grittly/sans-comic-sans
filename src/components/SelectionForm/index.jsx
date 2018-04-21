import React from 'react';
import PropTypes from 'prop-types';

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
          <input
            type="text"
            id={`selection-${props.id}-password`}
            value={props.password}
            onChange={(e) => {
              props.updateCoordinates({
                id: props.id, password: e.target.value,
              });
            }}
            onFocus={() => { props.setActiveSelection(props.id); }}
            onBlur={() => { props.setActiveSelection(); }}
          />
        </div>
        <div className="input-label-wrapper">
          <label htmlFor={`selection-${props.id}-x`}>x:</label>
          <input
            type="number"
            id={`selection-${props.id}-x`}
            value={props.x}
            onChange={(e) => {
              props.updateCoordinates({
                id: props.id, x: e.target.value,
              });
            }}
            onFocus={() => { props.setActiveSelection(props.id); }}
            onBlur={() => { props.setActiveSelection(); }}
          />
        </div>
        <div className="input-label-wrapper">
          <label htmlFor={`selection-${props.id}-y`}>y:</label>
          <input
            type="number"
            id={`selection-${props.id}-y`}
            value={props.y}
            onChange={(e) => {
              props.updateCoordinates({
                id: props.id, y: e.target.value,
              });
            }}
            onFocus={() => { props.setActiveSelection(props.id); }}
            onBlur={() => { props.setActiveSelection(); }}
          />
        </div>
        <div className="input-label-wrapper">
          <label htmlFor={`selection-${props.id}-width`}>width:</label>
          <input
            type="number"
            id={`selection-${props.id}-width`}
            value={props.width}
            onChange={(e) => {
              props.updateCoordinates({
                id: props.id, width: e.target.value,
              });
            }}
          />
        </div>
        <div className="input-label-wrapper">
          <label htmlFor={`selection-${props.id}-height`}>height:</label>
          <input
            type="number"
            id={`selection-${props.id}-height`}
            value={props.height}
            onChange={(e) => {
              props.updateCoordinates({
                id: props.id, height: e.target.value,
              });
            }}
          />
        </div>
      </div>
      <div className="icons-area"></div>
    </div>
    <div className="errors-section"></div>
  </div>
);

SelectionForm.propTypes = {
  id: PropTypes.number.isRequired,
  password: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  updateCoordinates: PropTypes.func.isRequired,
  setActiveSelection: PropTypes.func.isRequired,
};

export default SelectionForm;
