/* globals describe it */
import { expect } from 'chai';
import Validator from '../../src/lib/Validator';
import { 
  VALIDATE_PRESENCE,
  VALIDATE_ALLOWED_CHARACTERS,
  VALIDATE_CHAR_LENGTH_RANGE,
  VALIDATE_INTEGER,
  VALIDATE_NUMERIC_RANGE,
} from '../../src/constants';

describe('Validator', () => {
  it('Handles the case where they key provided is not present in the validations');
  it('Does not add another error after the first one');
  it('Adds errors property to the return value even if it is not provided in the entry object');
  it('Validation: PRESENCE');
  it('Validation: ALLOWED_CHARACTERS');
  it('Validation: CHAR_LENGTH_RANGE');
  it('Validation: INTEGER');
  it('Validation: NUMERIC_RANGE');


});
