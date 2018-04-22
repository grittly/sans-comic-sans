/* globals describe it */
import { expect } from 'chai';
import Validator from '../../src/lib/Validator';
import {
  VALIDATE_PRESENCE,
  VALIDATE_ALLOWED_CHARACTERS,
  VALIDATE_CHAR_LENGTH_RANGE,
  VALIDATE_INTEGER,
  VALIDATE_NUMERIC_RANGE,
  RULE_ALLOWED_CHARACTERS,
  RULE_NUMERIC_RANGE,
  RULE_CHAR_LENGTH_RANGE,
} from '../../src/constants';

const rules = {
  [RULE_CHAR_LENGTH_RANGE]: { minLength: 0, maxLength: 5 },
  [RULE_NUMERIC_RANGE]: { minNum: 4, maxNum: 10 },
  [RULE_ALLOWED_CHARACTERS]: { allowedCharsRe: /^\S+$/ },
};
const validations = {
  presence_test: [VALIDATE_PRESENCE],
  allowed_chars_test: [VALIDATE_PRESENCE, VALIDATE_ALLOWED_CHARACTERS],
  char_length_test: [VALIDATE_PRESENCE, VALIDATE_CHAR_LENGTH_RANGE],
  integer_test: [VALIDATE_PRESENCE, VALIDATE_INTEGER],
  numeric_range_test: [VALIDATE_PRESENCE, VALIDATE_NUMERIC_RANGE],
};
const Validate = Validator(rules, validations);

describe('Validator', () => {
  it('Handles the case where they key provided is not present in the validations', () => {
    const key = 'non_existent_key';
    const entry = { value: 'somevalue', errors: [] };
    const result = Validate(key, entry);
    expect(result.errors).to.have.length(0);
  });
  it('Does not add another error after the first one', () => {
    const key = 'allowed_chars_test';
    const entry = { value: '', errors: [] };
    const result = Validate(key, entry);
    expect(result.errors).to.have.length(1);
    expect(result.errors[0]).to.include('empty');
  });
  it('Adds errors property to the return value even if it is not provided in the entry object', () => {
    const key = 'presence_test';
    // Invalid value
    let entry = { value: '' };
    let result = Validate(key, entry);
    expect(result).to.have.property('errors');
    expect(result.errors).to.have.length(1);

    // Valid value
    entry = { value: 'valid value' };
    result = Validate(key, entry);
    expect(result).to.have.property('errors');
    expect(result.errors).to.have.length(0);
  });
  it('Validation: VALIDATE_PRESENCE', () => {
    const key = 'presence_test';

    // Empty string generates error
    let entry = { value: '', errors: [] };
    let result = Validate(key, entry);
    expect(result.errors).to.have.length(1);
    expect(result.errors[0]).to.have.string('empty');

    // Non-empty string passes
    entry = { value: 'notempty', errors: [] };
    result = Validate(key, entry);
    expect(result.errors).to.have.length(0);

    // Undefined value fails
    entry = { value: undefined, errors: [] };
    result = Validate(key, entry);
    expect(result.errors).to.have.length(1);
    expect(result.errors[0]).to.have.string('empty');
  });
  it('Validation: VALIDATE_ALLOWED_CHARACTERS', () => {
    const key = 'allowed_chars_test';

    // Invalid value - a whitespace character
    let entry = { value: ' space', errors: [] };
    let result = Validate(key, entry);
    expect(result.errors).to.have.length(1);
    expect(result.errors[0]).to.include('invalid characters');

    // Valid value
    entry = { value: 'nospace', errors: [] };
    result = Validate(key, entry);
    expect(result.errors).to.have.length(0);
  });
  it('Validation: VALIDATE_CHAR_LENGTH_RANGE', () => {
    const key = 'char_length_test';

    // Invalid value
    let entry = { value: 'toomanycharacters', errors: [] };
    let result = Validate(key, entry);
    expect(result.errors).to.have.length(1);
    expect(result.errors[0]).to.include('characters long');

    // Valid value
    entry = { value: '123', errors: [] };
    result = Validate(key, entry);
    expect(result.errors).to.have.length(0);
  });
  it('Validation: VALIDATE_INTEGER', () => {
    const key = 'integer_test';
    // Invalid values
    let entry = { value: 'a', errors: [] };
    let result = Validate(key, entry);
    expect(result.errors).to.have.length(1);
    expect(result.errors[0]).to.include('must be an integer');

    entry = { value: '12.3', errors: [] };
    result = Validate(key, entry);
    expect(result.errors).to.have.length(1);
    expect(result.errors[0]).to.include('must be an integer');

    // Valid values
    entry = { value: '1', errors: [] };
    result = Validate(key, entry);
    expect(result.errors).to.have.length(0);

    entry = { value: '0', errors: [] };
    result = Validate(key, entry);
    expect(result.errors).to.have.length(0);

    entry = { value: 1, errors: [] };
    result = Validate(key, entry);
    expect(result.errors).to.have.length(0);
  });
  it('Validation: VALIDATE_NUMERIC_RANGE', () => {
    const key = 'numeric_range_test';

    // Invalid values
    let entry = { value: 0, errors: [] };
    let result = Validate(key, entry);
    expect(result.errors).to.have.length(1);
    expect(result.errors[0]).to.include('must be between');

    entry = { value: 100, errors: [] };
    result = Validate(key, entry);
    expect(result.errors).to.have.length(1);
    expect(result.errors[0]).to.include('must be between');

    entry = { value: -3, errors: [] };
    result = Validate(key, entry);
    expect(result.errors).to.have.length(1);
    expect(result.errors[0]).to.include('must be between');

    // Valid values - border case
    entry = { value: 4, errors: [] };
    result = Validate(key, entry);
    expect(result.errors).to.have.length(0);

    // Valid values - within range
    entry = { value: 7, errors: [] };
    result = Validate(key, entry);
    expect(result.errors).to.have.length(0);
  });
});
