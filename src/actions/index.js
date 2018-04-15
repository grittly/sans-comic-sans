import {
  LOAD_IMAGE,
  IMAGE_STATUS,
} from '../constants';

// Actions related to loading source image

/**
 * Load image into redux store
 */
export function loadImage(status = IMAGE_STATUS.EMPTY, src = null, width = 0, height = 0) {
  return (dispatch) => {
    const aspectRatio = width > 0 && height > 0 ? width / height : 1;
    dispatch({
      type: LOAD_IMAGE,
      status,
      src,
      width,
      height,
      aspectRatio,
    });
  };
}
