import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import formSectionHOC from '../../HOC/formSectionHOC';

/**
 *  Radio input form for chosing obfuscate or deobfuscate an image
 */
const ObfuscationDirectionForm = props => (
  <div className="radio-input">
    <button
      type="button"
      className={classnames('radio-button', {'crossed-out': props.decrypt})}
      onClick={(e) => {props.changeDirection(false)}}
    >
      <div>Encrypt</div>
    </button>
    <button
      type="button"
      className={classnames('radio-button', {'crossed-out': !props.decrypt})}
      onClick={(e) => {props.changeDirection(true)}}
    >
      <div>Decrypt</div>
    </button>
  </div>
);

ObfuscationDirectionForm.propTypes = {
  decrypt: PropTypes.bool.isRequired,
  changeDirection: PropTypes.func.isRequired,
};

export default formSectionHOC(ObfuscationDirectionForm, { title: 'Settings', collapsed: false });
