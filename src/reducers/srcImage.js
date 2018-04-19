import {
  LOAD_IMAGE,
  UNLOAD_IMAGE,
  IMAGE_STATUS,
  RESIZE_CANVAS_CONTAINER,
} from '../constants';

const defaultState = {
  status: null,
  src: null,
  width: 0,
  height: 0,
  containerWidth: 0,
  aspectRatio: 1,
};

/**
 * This reducer stores properties related to the image being loaded into CanvasVisible component
 */
export default function srcImage(state = defaultState, action) {
  switch (action.type) {
    case RESIZE_CANVAS_CONTAINER:
      return {
        ...state,
        containerWidth: action.containerWidth,
      };
    case LOAD_IMAGE:
      if (action.status === IMAGE_STATUS.DONE
        && action.src && action.width > 0 && action.height > 0) {
        return {
          ...state,
          status: action.status,
          src: action.src,
          width: action.width,
          height: action.height,
          aspectRatio: action.height / action.width,
        };
      } else if (action.status === IMAGE_STATUS.LOADING) {
        return {
          ...state,
          status: action.status,
          src: null,
          width: 0,
          height: 0,
          aspectRatio: 1,
        };
      }
      return state;
    case UNLOAD_IMAGE:
      return {
        ...state,
        status: null,
        src: null,
        width: 0,
        height: 0,
        aspectRatio: 1,
      };
    default:
      return state;
  }
}
