// Action types linked to source image loading
export const LOAD_IMAGE = 'LOAD_IMAGE';
export const UNLOAD_IMAGE = 'UNLOAD_IMAGE';
export const RESIZE_CANVAS_CONTAINER = 'RESIZE_CANVAS_CONTAINER';

// Action types linked to selections
export const ADD_SELECTION = 'ADD_SELECTION';
export const DELETE_SELECTION = 'DELETE_SELECTION';
export const MODIFY_SELECTION = 'MODIFY_SELECTION';
export const SET_ACTIVE_SELECTION = 'SET_ACTIVE_SELECTION';
export const VALIDATE_SELECTIONS = 'VALIDATE_SELECTIONS';

// Validation constants
export const VALIDATE_PRESENCE = 'VALIDATE_PRESENCE';
export const VALIDATE_ALLOWED_CHARACTERS = 'VALIDATE_ALLOWED_CHARACTERS';
export const VALIDATE_CHAR_LENGTH_RANGE = 'VALIDATE_CHAR_LENGTH_RANGE';
export const VALIDATE_INTEGER = 'VALIDATE_INTEGER';
export const VALIDATE_NUMERIC_RANGE = 'VALIDATE_NUMERIC_RANGE';

// Image loading status constants
export const IMAGE_STATUS = {
  LOADING: 'LOADING',
  DONE: 'DONE',
};

