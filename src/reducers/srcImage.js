import {
  LOAD_IMAGE,
  UNLOAD_IMAGE,
  IMAGE_STATUS,
} from '../constants';

const defaultState = {
  status: IMAGE_STATUS.EMPTY,
  src: null,
  width: 0,
  height: 0,
};

/**
 * This reducer stores properties related to the image being loaded into CanvasVisible component
 */
export default function srcImage(state = defaultState, action) {
  switch (action.type) {
    case LOAD_IMAGE:
      // TODO: load image
      return state;
    case UNLOAD_IMAGE:
      // TODO: unload image
    default:
      return state;
  }
}
