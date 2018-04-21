import {
  ADD_SELECTION,
  MODIFY_SELECTION,
  DELETE_SELECTION,
  SET_ACTIVE_SELECTION,
} from '../constants';

const defaultState = {
  collection: [],
  activeSelectionId: null,
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
    case SET_ACTIVE_SELECTION:
      if (Number.isInteger(action.id)) {
        const activeSelectionIndex = state.collection.findIndex(elem => elem.id === action.id);
        if (activeSelectionIndex > -1) {
          return {
            ...state,
            activeSelectionId: state.collection[activeSelectionIndex].id,
          };
        }
      }
      return {
        ...state,
        activeSelectionId: null,
      };
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
            id: action.id,
            x: action.x === undefined ? selection.x : action.x,
            y: action.y === undefined ? selection.y : action.y,
            width: action.width === undefined ? selection.width : action.width,
            height: action.height === undefined ? selection.height : action.height,
            password: action.password === undefined ? selection.password : action.password,
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
