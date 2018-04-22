import validatorFunctions from './validatorFunctions';

/**
 * Validation function builder that takes in a list of rules
 * and validations and returns a custom function
 * @param {Object} rules - a dictionary of specific options passed into validation functions.
 * eg. allowed characters
 * @param {Object} validations - dictionary of validations where keys are names of properties
 * and the values are arrays of validation tests to be tested.
 * eg. {x: [PRESENCE, ALLOWED_CHARACTERS]}.
 * Order matters because testing stops at first error encountered
 */
export default function Validator(rules = {}, validations = {}) {
  /**
   * A validation function
   * @param {string} key
   * @param {Object} entry - value being validated in the form of {value: number|string, errors: []}
   * @param {Object} customRules - Add any additional rules
   * @param {Array} customValidations - Override the list of validations for the given key
   * @returns {Object} - returns the entry object
   */
  return (key, entry, customRules = {}, customValidations = []) => {
    // Add customRules and customValidations
    const mergedValidations = customValidations.length > 0 ?
      customValidations : (validations[key] || []);
    const mergedRules = { ...rules, ...customRules };
    const errors = mergedValidations.reduce((acc, validation) => {
      if (acc.length === 0) {
        return [
          ...acc,
          ...validatorFunctions[validation](entry.value, key, mergedRules),
        ];
      }
      return acc;
    });
    return {
      ...entry,
      errors,
    };
  };
}
