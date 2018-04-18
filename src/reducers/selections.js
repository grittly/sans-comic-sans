import {
  ADD_SELECTION,
  MODIFY_SELECTION,
  DELETE_SELECTION,
} from '../constants';

const defaultState = {
  collection: [],
};

/**
 * This reducer stores selections that are the areas of the image to be obfuscated
 */

/* eslint-disable no-case-declarations */
export default function selections(state = defaultState, action) {
  const maxId = state.collection.reduce((acc, selection) => (
    selection.id > acc ? selection.id : acc
  ), 0);

  switch (action.type) {
    case ADD_SELECTION:
      if (action.imageWidth && action.imageHeight) {
        const {
          x = 0,
          y = 0,
          width = Math.round(action.imageWidth * 0.2),
          height = Math.round(action.imageHeight * 0.2),
          password = '',
        } = action;
        return {
          ...state,
          collection: [
            {
              id: maxId + 1,
              x,
              y,
              width,
              height,
              password,
            },
            ...state.collection,
          ],
        };
      }
      return state;
    case MODIFY_SELECTION:
      const updatedCollection = state.collection.map((selection) => {
        if (selection.id === action.id) {
          return {
            ...selection,
            id: action.id || selection.id,
            x: action.x || selection.x,
            y: action.y || selection.y,
            width: action.width || selection.width,
            height: action.height || selection.height,
            password: action.password || selection.password,
          };
        }
        return selection;
      });
      return {
        ...state,
        collection: updatedCollection,
      };
    case DELETE_SELECTION:
      return {
        ...state,
        collection: state.collection.filter(selection => selection.id !== action.id),
      };
    default:
      return state;
  }
}
/* eslint-enable no-case-declarations */
