import React from 'react';
import PropTypes from 'prop-types';

/**
 *  Radio input form for chosing obfuscate or deobfuscate an image
 */
const ObfuscationDirectionForm = props => (
  <div>
    <label htmlFor="encrypt-input">
      Encrypt
      <input id="encrypt-input" type="radio" checked={!props.decrypt} onChange={
        e => props.changeDirection(!e.target.checked)
      } />
    </label>
    <label htmlFor="encrypt-input">
      Decrypt
      <input id="encrypt-input" type="radio" checked={props.decrypt} onChange={
        e => props.changeDirection(e.target.checked)
      } />
    </label>
  </div>
);

ObfuscationDirectionForm.propTypes = {
  decrypt: PropTypes.bool.isRequired,
  changeDirection: PropTypes.func.isRequired,
};

export default ObfuscationDirectionForm;
