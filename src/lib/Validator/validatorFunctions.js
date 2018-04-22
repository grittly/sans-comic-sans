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
  // TODO: add code
}

/**
 * Validate value's character length to be within allowed range
 * @param {string} value - Input value being tested
 * @param {string} key - the key the value belongs to
 * @params {Object} options - additional options specific to this function
 * @params {number} options.minLength - left boundary of the allowed character range
 * @params {number} options.maxLength - right boundary of the allowed character range
 */
function charLengthRange(value, key, { minLength, maxLength }) {
  // TODO: add code
}

/**
 * Validate number to be within allowed numeric range
 * @param {string} value - Input value being tested
 * @param {string} key - the key the value belongs to
 * @params {Object} options - additional options specific to this function
 * @params {number} options.min - left boundary of the numeric range
 * @params {number} options.max - right boundary of the numeric range
 */
function numericRange(value, key, { minLength, maxLength }) {
  // TODO: add code
}

/**
 * Validate if value is an integer
 * @param {string} value - Input value being tested
 * @param {string} key - the key the value belongs to
 */
function isInteger(value, key) {
  // TODO: add code
}

/**
 * Validated that value consists only of allowed characters
 * @param {string} value - Input value being tested
 * @param {string} key - the key the value belongs to
 * @params {Object} options - additional options specific to this function
 * @params {RegExp} options.allowedCharacters - regular expression with allowed characters
 */
function allowedCharacters(value, key, { allowedCharacters }) {
  // TODO: add code
}

export default {
  [VALIDATE_CHAR_LENGTH_RANGE]: charLengthRange,
  [VALIDATE_ALLOWED_CHARACTERS]: allowedCharacters,
  [VALIDATE_PRESENCE]: isPresent,
  [VALIDATE_INTEGER]: isInteger,
  [VALIDATE_NUMERIC_RANGE]: numericRange,
};
