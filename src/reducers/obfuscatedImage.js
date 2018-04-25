import {
  IMAGE_OBFUSCATING,
  IMAGE_OBFUSCATING_STATUS,
  UNLOAD_OBFUSCATED_IMAGE,
} from '../constants';

const defaultState = {
  status: null,
  src: null,
};

/**
 * This reducer stores properties related to the image being loaded into CanvasVisible component
 */
export default function obfuscatedImage(state = defaultState, action) {
  switch (action.type) {
    case IMAGE_OBFUSCATING:
      if (action.status === IMAGE_OBFUSCATING_STATUS.DONE && action.obfuscatedSrc) {
        return {
          ...state,
          status: IMAGE_OBFUSCATING_STATUS.DONE,
          src: action.obfuscatedSrc,
        };
      } else if (action.status === IMAGE_OBFUSCATING_STATUS.LOADING) {
        return {
          ...state,
          status: IMAGE_OBFUSCATING_STATUS.LOADING,
          src: null,
        };
      }
      return state;
    case UNLOAD_OBFUSCATED_IMAGE:
      return {
        ...state,
        status: null,
        src: null,
      };
    default:
      return state;
  }
}
