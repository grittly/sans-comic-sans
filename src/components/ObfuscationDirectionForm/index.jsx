import React from 'react';
import PropTypes from 'prop-types';
import formSectionHOC from '../../HOC/formSectionHOC';

/**
 *  Radio input form for chosing obfuscate or deobfuscate an image
 */
const ObfuscationDirectionForm = props => (
  <div className="radio-input">
    <label htmlFor="encrypt-input">
      <input id="encrypt-input" type="radio" checked={!props.decrypt} onChange={
        e => props.changeDirection(!e.target.checked)
      }
    />
      Encrypt
    </label>
    <label htmlFor="encrypt-input">
      <input id="encrypt-input" type="radio" checked={props.decrypt} onChange={
        e => props.changeDirection(e.target.checked)
      }
    />
      Decrypt
    </label>
  </div>
);

ObfuscationDirectionForm.propTypes = {
  decrypt: PropTypes.bool.isRequired,
  changeDirection: PropTypes.func.isRequired,
};

export default formSectionHOC(ObfuscationDirectionForm, { title: 'Settings', collapsed: false });
