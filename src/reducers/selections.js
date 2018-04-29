import {
  ADD_SELECTION,
  MODIFY_SELECTION,
  DELETE_SELECTION,
  SET_ACTIVE_SELECTION,
  VALIDATE_SELECTIONS,
  SCALE_SELECTIONS,
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
    selection.id.value > acc ? selection.id.value : acc
  ), 0);

  switch (action.type) {
    case SCALE_SELECTIONS:
      return state;
    case SET_ACTIVE_SELECTION:
      if (Number.isInteger(action.id)) {
        const activeSelectionIndex
          = state.collection.findIndex(elem => elem.id.value === action.id);
        if (activeSelectionIndex > -1) {
          return {
            ...state,
            activeSelectionId: state.collection[activeSelectionIndex].id.value,
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
          password = 'password',
        } = action;
        return {
          ...state,
          validated: false,
          collection: [
            {
              id: { value: maxId + 1, errors: [] },
              x: { value: x, errors: [] },
              y: { value: y, errors: [] },
              width: { value: width, errors: [] },
              height: { value: height, errors: [] },
              password: { value: password, errors: [] },
              hasErrors: false,
            },
            ...state.collection,
          ],
        };
      }
      return state;
    case MODIFY_SELECTION:
      const updatedCollection = state.collection.map((selection) => {
        if (selection.id.value === action.id) {
          return {
            ...selection,
            id: {
              ...selection.id,
              value: action.id,
            },
            x: {
              ...selection.x,
              value: action.x === undefined ? selection.x.value : action.x,
            },
            y: {
              ...selection.y,
              value: action.y === undefined ? selection.y.value : action.y,
            },
            width: {
              ...selection.width,
              value: action.width === undefined ? selection.width.value : action.width,
            },
            height: {
              ...selection.height,
              value: action.height === undefined ? selection.height.value : action.height,
            },
            password: {
              ...selection.password,
              value: action.password === undefined ? selection.password.value : action.password,
            },
          };
        }
        return selection;
      });
      return {
        ...state,
        collection: updatedCollection,
        validated: false,
      };
    case DELETE_SELECTION:
      return {
        ...state,
        collection: state.collection.filter(selection => selection.id.value !== action.id),
      };
    case VALIDATE_SELECTIONS:
      const hasErrors
        = action.validatedCollection.reduce((acc, selection) => selection.hasErrors
          || acc, false);
      return {
        ...state,
        collection: action.validatedCollection,
        hasErrors,
        validated: true,
      };
    default:
      return state;
  }
}
/* eslint-enable no-case-declarations */
