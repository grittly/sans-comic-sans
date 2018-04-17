import {
  LOAD_IMAGE,
  UNLOAD_IMAGE,
  IMAGE_STATUS,
  ADD_SELECTION,
  MODIFY_SELECTION,
  DELETE_SELECTION,
} from '../constants';

// Actions related to loading source image

/**
 * Initialize app (for use in development)
 */
export function init() {
  return (dispatch) => {
    dispatch(addSelection({
      x: 0,
      y: 0,
      width: 20,
      height: 20,
      password: '',
    }));
  };
}


/**
 * Load image into redux store
 */
export function loadImage(status, src, width, height) {
  return (dispatch) => {
    dispatch({
      type: LOAD_IMAGE,
      status,
      src,
      width,
      height,
    });
  };
}


/**
 * Unload image from redux store
 */
export function unloadImage() {
  return { type: UNLOAD_IMAGE };
}

/**
 * Add a selection representing an area on the source image
 */
export function addSelection({ x, y, width, height, password }) {
  return {
    type: ADD_SELECTION,
    x,
    y,
    width,
    height,
    password,
  };
}

/**
 * Modify a selection
 */
export function modifySelection() {
  return { type: MODIFY_SELECTION };
}

/**
 * Delete a selection
 */
export function deleteSelection() {
  return { type: DELETE_SELECTION };
}
