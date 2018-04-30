import { CHANGE_OBFUSCATION_DIRECTION } from '../constants';

const defaultState = {
  decrypt: false,
};

/**
 * This reducer stores any settings related to the process of obfuscation
 */
export default function settings(state = defaultState, action) {
  switch (action.type) {
    case CHANGE_OBFUSCATION_DIRECTION:
      return {
        ...state,
        decrypt: action.decrypt === true,
      };
    default:
      return state;
  }
}
