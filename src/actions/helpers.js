import {
  VALIDATE_PRESENCE,
  VALIDATE_ALLOWED_CHARACTERS,
  VALIDATE_CHAR_LENGTH_RANGE,
  VALIDATE_INTEGER,
  VALIDATE_NUMERIC_RANGE,
  RULE_ALLOWED_CHARACTERS,
  RULE_NUMERIC_RANGE,
  RULE_CHAR_LENGTH_RANGE,
} from '../constants';
import Validator from '../lib/Validator';

const rules = {
  [RULE_CHAR_LENGTH_RANGE]: { minLength: 0, maxLength: 100 },
  [RULE_NUMERIC_RANGE]: { minNum: 4, maxNum: 100 },
  [RULE_ALLOWED_CHARACTERS]: { allowedCharsRe: /^\S+$/ },
};

const validations = {
  id: [],
  x: [VALIDATE_PRESENCE, VALIDATE_INTEGER, VALIDATE_NUMERIC_RANGE],
  y: [VALIDATE_PRESENCE, VALIDATE_INTEGER, VALIDATE_NUMERIC_RANGE],
  width: [VALIDATE_PRESENCE, VALIDATE_INTEGER, VALIDATE_NUMERIC_RANGE],
  height: [VALIDATE_PRESENCE, VALIDATE_INTEGER, VALIDATE_NUMERIC_RANGE],
  password: [VALIDATE_CHAR_LENGTH_RANGE, VALIDATE_ALLOWED_CHARACTERS],
};

const Validate = Validator(rules, validations);

export function runSelectionValidator(selections, imgWidth, imgHeight) {
  return new Promise((resolve) => {
    const validatedCollection = selections.map((selection) => {
      const validated = {
        x: Validate('x', selection.x, {
          RULE_NUMERIC_RANGE: { minNum: 0, maxNum: imgWidth - selection.width.value },
        }),
        y: Validate('y', selection.y, {
          RULE_NUMERIC_RANGE: { minNum: 0, maxNum: imgWidth - selection.width.value },
        }),
        width: Validate('width', selection.width, {
          RULE_NUMERIC_RANGE: { minNum: 0, maxNum: imgWidth - selection.x.value },
        }),
        height: Validate('height', selection.height, {
          RULE_NUMERIC_RANGE: { minNum: 0, maxNum: imgHeight - selection.x.value },
        }),
        password: Validate('password', selection.password),
      };
      return {
        ...selection,
        ...validated,
        hasErrors: Object.keys(validated)
          .reduce((acc, key) => validated[key].errors.length + acc, 0) > 0,
      };
    });
    resolve(validatedCollection);
  });
}
