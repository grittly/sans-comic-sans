import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { GoX } from 'react-icons/lib/go';

/**
 * Form for a single selection
 */

const SelectionForm = props => (
  <div className={classnames('selection-form', { active: props.active })}>
    <div className="input-section">
      <div className="id-area">
        <div className="input-label-wrapper">
          <label htmlFor={`selection-${props.id.value}-id`}>id:</label>
          <span id={`selection-${props.id.value}-id`}>{props.id.value}</span>
        </div>
      </div>
      <div className="coordinates-area">
        <div className="input-label-wrapper password">
          <label htmlFor={`selection-${props.id.value}-password`}>key:</label>
          <input
            type="text"
            id={`selection-${props.id.value}-password`}
            value={props.password.value}
            onChange={(e) => {
              props.updateCoordinates({
                id: props.id.value, password: e.target.value,
              });
            }}
            onFocus={() => { props.setActiveSelection(props.id.value); }}
            onBlur={() => { props.setActiveSelection(); }}
          />
        </div>
        <div className="input-label-wrapper">
          <label htmlFor={`selection-${props.id.value}-x`}>x:</label>
          <input
            type="number"
            id={`selection-${props.id.value}-x`}
            value={props.x.value}
            onChange={(e) => {
              props.updateCoordinates({
                id: props.id.value,
                x: e.target.value,
              });
            }}
            onFocus={() => { props.setActiveSelection(props.id.value); }}
            onBlur={() => { props.setActiveSelection(); }}
          />
        </div>
        <div className="input-label-wrapper">
          <label htmlFor={`selection-${props.id.value}-y`}>y:</label>
          <input
            type="number"
            id={`selection-${props.id.value}-y`}
            value={props.y.value}
            onChange={(e) => {
              props.updateCoordinates({
                id: props.id.value,
                y: e.target.value,
              });
            }}
            onFocus={() => { props.setActiveSelection(props.id.value); }}
            onBlur={() => { props.setActiveSelection(); }}
          />
        </div>
        <div className="input-label-wrapper">
          <label htmlFor={`selection-${props.id.value}-width`}>width:</label>
          <input
            type="number"
            id={`selection-${props.id.value}-width`}
            value={props.width.value}
            onChange={(e) => {
              props.updateCoordinates({
                id: props.id.value, width: e.target.value,
              });
            }}
            onFocus={() => { props.setActiveSelection(props.id.value); }}
            onBlur={() => { props.setActiveSelection(); }}
          />
        </div>
        <div className="input-label-wrapper">
          <label htmlFor={`selection-${props.id.value}-height`}>height:</label>
          <input
            type="number"
            id={`selection-${props.id.value}-height`}
            value={props.height.value}
            onChange={(e) => {
              props.updateCoordinates({
                id: props.id.value, height: e.target.value,
              });
            }}
            onFocus={() => { props.setActiveSelection(props.id.value); }}
            onBlur={() => { props.setActiveSelection(); }}
          />
        </div>
      </div>
      <div className="icons-area">
        <span onClick={() => props.deleteSelection(props.id.value)}><GoX /></span>
      </div>
    </div>
    <div className="errors-section">
      <ul>
        { props.errors.map((error, idx) => (
          <li key={`selection-${props.id}-error-${idx}`}>{error}</li>
        ))}
      </ul>
    </div>
  </div>
);

SelectionForm.propTypes = {
  id: PropTypes.shape({
    value: PropTypes.number,
    errors: PropTypes.array,
  }).isRequired,
  password: PropTypes.shape({
    value: PropTypes.string,
    errors: PropTypes.array,
  }).isRequired,
  width: PropTypes.shape({
    value: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    errors: PropTypes.array,
  }).isRequired,
  height: PropTypes.shape({
    value: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    errors: PropTypes.array,
  }).isRequired,
  x: PropTypes.shape({
    value: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    errors: PropTypes.array,
  }).isRequired,
  y: PropTypes.shape({
    value: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    errors: PropTypes.array,
  }).isRequired,
  updateCoordinates: PropTypes.func.isRequired,
  setActiveSelection: PropTypes.func.isRequired,
  deleteSelection: PropTypes.func.isRequired,
  errors: PropTypes.arrayOf(PropTypes.string).isRequired,
  active: PropTypes.bool.isRequired,
};

export default SelectionForm;
