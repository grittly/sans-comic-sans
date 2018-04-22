import {
  VALIDATE_PRESENCE,
  VALIDATE_ALLOWED_CHARACTERS,
  VALIDATE_CHAR_LENGTH_RANGE,
  VALIDATE_INTEGER,
  VALIDATE_NUMERIC_RANGE,
  RULE_ALLOWED_CHARACTERS,
  RULE_NUMERIC_RANGE,
  RULE_CHAR_LENGTH_RANGE,
} from '../../../src/constants';

/**
 * Validate for value to not be empty
 * @param {string} value - Input value being tested
 * @param {string} key - the key the value belongs to
 */
function isPresent(value, key) {
  return value === '' || value === undefined ? [`${key} can't be empty`] : [];
}

/**
 * Validate value's character length to be within allowed range
 * @param {string} value - Input value being tested
 * @param {string} key - the key the value belongs to
 * @params {Object} options - additional options specific to this function
 * @params {number} options.minLength - left boundary of the allowed character range
 * @params {number} options.maxLength - right boundary of the allowed character range
 */
function charLengthRange(value, key, options = {}) {
  const { minLength = 0, maxLength = 99999 } = options[RULE_CHAR_LENGTH_RANGE];
  if (typeof value === 'string' && !Number.isNaN(parseInt(minLength, 0)) && !Number.isNaN(parseInt(maxLength, 10))) {
    if (value.length < minLength || value.length > maxLength) {
      return [`${key} must be between ${minLength} and ${maxLength} characters long`];
    }
  }
  return [];
}

/**
 * Validate number to be within allowed numeric range. Validate that integer first
 * @param {number} value - Input value being tested
 * @param {string} key - the key the value belongs to
 * @params {Object} options - additional options specific to this function
 * @params {number} options.min - left boundary of the numeric range
 * @params {number} options.max - right boundary of the numeric range
 */
function numericRange(value, key, options) {
  const { minNum = 0, maxNum = 99999 } = options[RULE_NUMERIC_RANGE];
  const valueInt = parseInt(value, 10);
  if (!Number.isNaN(parseInt(minNum, 10)) &&
    !Number.isNaN(parseInt(maxNum, 10)) &&
    !Number.isNaN(valueInt)) {
    if (valueInt < minNum || valueInt > maxNum) {
      return [`${key} must be between ${minNum} and ${maxNum}`];
    }
  }
  return [];
}

/**
 * Validate if value is an integer
 * @param {string} value - Input value being tested
 * @param {string} key - the key the value belongs to
 */
function isInteger(value, key) {
  return /^(-|\+)?([0-9]+|Infinity)$/.test(value) ? [] : [`${key} must be an integer`];
}

/**
 * Validated that value consists only of allowed characters
 * @param {string} value - Input value being tested
 * @param {string} key - the key the value belongs to
 * @params {Object} options - additional options specific to this function
 * @params {RegExp} options.regex - regular expression with allowed characters
 */
function allowedCharacters(value, key, options = {}) {
  const { allowedCharsRe } = options[RULE_ALLOWED_CHARACTERS];
  return allowedCharsRe.test(value) ? [] : [`${key} has invalid characters. No spaces allowed`];
}

export default {
  [VALIDATE_CHAR_LENGTH_RANGE]: charLengthRange,
  [VALIDATE_ALLOWED_CHARACTERS]: allowedCharacters,
  [VALIDATE_PRESENCE]: isPresent,
  [VALIDATE_INTEGER]: isInteger,
  [VALIDATE_NUMERIC_RANGE]: numericRange,
};
