import {
  ADD_SELECTION,
  UPDATE_SELECTION,
  DELETE_SELECTION,
} from '../constants';

const defaultState = {
  collection: [],
};

/**
 * This reducer stores selections that are the areas of the image to be obfuscated
 */
export default function selections(state = defaultState, action) {
  switch (action.type) {
    case ADD_SELECTION:
      // TODO: code for adding new selection
      return state;
    case UPDATE_SELECTION:
      // TODO: code for modifying an existing selection
      return state;
    case DELETE_SELECTION:
      // TODO: code for deleting an existing selection
    default:
      return state;
  }
}
