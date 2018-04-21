import {
  LOAD_IMAGE,
  UNLOAD_IMAGE,
  IMAGE_STATUS,
  ADD_SELECTION,
  MODIFY_SELECTION,
  DELETE_SELECTION,
  RESIZE_CANVAS_CONTAINER,
  SET_ACTIVE_SELECTION,
  VALIDATE_SELECTIONS,
} from '../constants';

// Actions related to loading source image

/**
 * Initialize app (for use in development)
 */
export function init() {
  /* eslint-disable */
  return (dispatch) => {
    const image = new window.Image();
    image.src = 'http://via.placeholder.com/700x500';
    return new Promise((resolve) => image.onload = resolve)
      .then(() => dispatch(loadImage(IMAGE_STATUS.DONE, image, image.width, image.height)))
      .then(() => dispatch(addSelection()));
  };
  /* eslint-enable */
}

/**
 * Run the validator through the collection array inside selections reducer
 *
 */
export function validateSelections() {
  // TODO: run validation
  return {
    type: VALIDATE_SELECTIONS,
    validatedCollection: null,
    hasErrors: false,
  };
}

/**
 * Set or unset the id of the current selection
 * @param {number} id - Id corresponding to the id in collection
 * array inside selection reducer
 */
export function setActiveSelection(id) {
  return {
    type: SET_ACTIVE_SELECTION,
    id,
  };
}

/**
 * Modify canvas container dimensions in redux store in
 * response to the browser resizing
 */
export function resizeCanvas(containerWidth = 0) {
  return (dispatch) => {
    dispatch({
      type: RESIZE_CANVAS_CONTAINER,
      containerWidth,
    });
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
export function addSelection({
  x, y, width, height, password,
} = {}) {
  return (dispatch, getState) => {
    const imageWidth = getState().srcImage.width;
    const imageHeight = getState().srcImage.height;
    dispatch({
      type: ADD_SELECTION,
      x,
      y,
      width,
      height,
      password,
      imageWidth,
      imageHeight,
    });
  };
}

/**
 * Modify a selection
 */
export function modifySelection({
  id, x, y, width, height, password,
} = {}) {
  return {
    type: MODIFY_SELECTION,
    id,
    x,
    y,
    width,
    height,
    password,
  };
}

/**
 * Delete a selection
 */
export function deleteSelection() {
  return { type: DELETE_SELECTION };
}
