import {
  LOAD_IMAGE,
  UNLOAD_IMAGE,
  IMAGE_STATUS,
} from '../constants';

const defaultState = {
  status: null,
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
      if(action.status === IMAGE_STATUS.DONE && action.src && action.width > 0 && action.height > 0){
        return {
          ...state,
          status: action.status,
          src: action.src,
          width: action.width,
          height: action.height
        }
      } else if(action.status === IMAGE_STATUS.LOADING){
        return {
          ...state,
          status: action.status,
          src: null,
          width: 0,
          height: 0,
        }
      }
      return state;
    case UNLOAD_IMAGE:
      return {
        ...state,
        status: null,
        src: null,
        width: 0,
        height: 0,
      }
    default:
      return state;
  }
}
