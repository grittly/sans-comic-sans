import {
} from '../constants';

const defaultState = {
  decrypt: false,
};

/**
 * This reducer stores any settings related to the process of obfuscation
 */
export default function settings(state = defaultState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
