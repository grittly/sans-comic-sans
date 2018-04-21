/* globals describe it */
import { expect } from 'chai';
import reducer from '../../src/reducers/selections';
import {
  ADD_SELECTION,
  MODIFY_SELECTION,
  DELETE_SELECTION,
  SET_ACTIVE_SELECTION,
} from '../../src/constants';

import state from '../../src/store/defaultState';

const defaultState = state.selections;

describe('selections reducer', () => {
  it('Sets activeSelectionId to the passed id if it exists in the redux store', () => {
    const initialState = {
      ...defaultState,
      collection: [
        {
          id: { value: 3, errors: [] },
          x: { value: 1, errors: [] },
          y: { value: 2, errors: [] },
          width: { value: 3, errors: [] },
          height: { value: 4, errors: [] },
          password: { value: 'pass', errors: [] },
        },
      ],
      activeSelectionId: null,
    };
    const action = {
      type: SET_ACTIVE_SELECTION,
      id: 3,
    };
    const expectedState = {
      ...initialState,
      activeSelectionId: 3,
    };
    expect(reducer(initialState, action)).to.eql(expectedState);
  });
  it('Sets activeSelectionId to null if thepassed id does exists in the redux store', () => {
    const initialState = {
      ...defaultState,
      collection: [
        {
          id: { value: 3, errors: [] },
          x: { value: 1, errors: [] },
          y: { value: 2, errors: [] },
          width: { value: 3, errors: [] },
          height: { value: 4, errors: [] },
          password: { value: 'pass', errors: [] },
        },
      ],
      activeSelectionId: null,
    };
    const action = {
      type: SET_ACTIVE_SELECTION,
      id: 999,
    };
    expect(reducer(initialState, action)).to.eql(initialState);
  });
  it('Sets activeSelectionId to null if undefined is passed in', () => {
    const initialState = {
      ...defaultState,
      collection: [
        {
          id: { value: 3, errors: [] },
          x: { value: 1, errors: [] },
          y: { value: 2, errors: [] },
          width: { value: 3, errors: [] },
          height: { value: 4, errors: [] },
          password: { value: 'pass', errors: [] },
        },
      ],
      activeSelectionId: 3,
    };
    const action = {
      type: SET_ACTIVE_SELECTION,
      id: null,
    };
    const expectedState = {
      ...initialState,
      activeSelectionId: null,
    };
    expect(reducer(initialState, action)).to.eql(expectedState);
  });
  it('Adds a new selection if all the params are provided', () => {
    const initialState = defaultState;
    const action = {
      type: ADD_SELECTION,
      x: 1,
      y: 2,
      width: 3,
      height: 4,
      password: 'pass',
      imageWidth: 100,
      imageHeight: 100,
    };
    const expectedState = {
      ...initialState,
      collection: [
        {
          id: { value: 1, errors: [] },
          x: { value: 1, errors: [] },
          y: { value: 2, errors: [] },
          width: { value: 3, errors: [] },
          height: { value: 4, errors: [] },
          password: { value: 'pass', errors: [] },
          hasErrors: false,
        },
      ],
    };
    expect(reducer(initialState, action)).to.eql(expectedState);
  });
  it('Adds a new selection with defaults (20% width and 20% height of srcImage) if no params are provided', () => {
    const initialState = defaultState;
    const action = {
      type: ADD_SELECTION,
      imageWidth: 100,
      imageHeight: 100,
    };
    const expectedState = {
      ...initialState,
      collection: [
        {
          id: { value: 1, errors: [] },
          x: { value: 0, errors: [] },
          y: { value: 0, errors: [] },
          width: { value: action.imageWidth * 0.2, errors: [] },
          height: { value: action.imageWidth * 0.2, errors: [] },
          password: { value: '', errors: [] },
          hasErrors: false,
        },
      ],
    };
    expect(reducer(initialState, action)).to.eql(expectedState);
  });
  it('Does not add a selection if imageWidth or imageHeight are undefined', () => {
    const initialState = defaultState;
    const action = {
      type: ADD_SELECTION,
      imageWidth: undefined,
      imageHeight: undefined,
    };
    const expectedState = initialState;
    expect(reducer(initialState, action)).to.eql(expectedState);
  });
  it('Adds a new selection and increments the id', () => {
    const initialState = {
      ...defaultState,
      collection: [
        {
          id: { value: 1, errors: [] },
        },
      ],
    };
    const action = {
      type: ADD_SELECTION,
      x: 1,
      y: 2,
      width: 3,
      height: 4,
      password: '123',
      imageWidth: 100,
      imageHeight: 100,
    };
    const expectedState = {
      ...initialState,
      collection: [
        {
          id: { value: 2, errors: [] },
          x: { value: 1, errors: [] },
          y: { value: 2, errors: [] },
          width: { value: 3, errors: [] },
          height: { value: 4, errors: [] },
          password: { value: '123', errors: [] },
          hasErrors: false
        },
        ...initialState.collection,
      ],
    };
    expect(reducer(initialState, action)).to.eql(expectedState);
  });
  it('Deletes a selection with a specified id', () => {
    const initialState = {
      ...defaultState,
      collection: [
        {
          id: { value: 2, errors: [] },
        },
      ],
    };
    const action = {
      type: DELETE_SELECTION,
      id: 2,
    };
    const expectedState = {
      ...initialState,
      collection: [],
    };
    expect(reducer(initialState, action)).to.eql(expectedState);
  });
  it('Does not delete a selection if the specified id is invalid or does not exist', () => {
    const initialState = {
      ...defaultState,
      collection: [
        {
          id: { value: 2, errors: [] },
        },
      ],
    };
    const action = {
      type: DELETE_SELECTION,
      id: 3,
    };
    const expectedState = initialState;
    expect(reducer(initialState, action)).to.eql(expectedState);
  });

  it('Updates multiple fields in a selection with a specified id', () => {
    const initialState = {
      ...defaultState,
      collection: [
        {
          id: { value: 2, errors: [] },
          x: { value: 1, errors: [] },
          y: { value: 1, errors: [] },
          width: { value: 1, errors: [] },
          height: { value: 1, errors: [] },
          password: { value: '123', errors: [] },
          hasErrors: false,
        },
      ],
    };
    const action = {
      type: MODIFY_SELECTION,
      id: 2,
      x: 10,
      y: 11,
    };
    const expectedState = {
      ...initialState,
      collection: [
        {
          ...initialState.collection[0],
          x: { value: 10, errors: [] },
          y: { value: 11, errors: [] },
        },
      ],
    };
    expect(reducer(initialState, action)).to.eql(expectedState);
  });
  it('Does not update a seelection if field provided does not exist', () => {
    const initialState = {
      ...defaultState,
      collection: [
        {
          id: { value: 2, errors: [] },
          x: { value: 1, errors: [] },
          y: { value: 1, errors: [] },
          width: { value: 1, errors: [] },
          height: { value: 1, errors: [] },
          password: { value: '123', errors: [] },
          hasErrors: false,
        },
      ],
    };
    const action = {
      type: MODIFY_SELECTION,
      id: 2,
      invalid_key: 10,
    };
    const expectedState = initialState;
    expect(reducer(initialState, action)).to.eql(expectedState);
  });
  it('Does not update any selection if the specified id is invalid or does not exist', () => {
    const initialState = {
      ...defaultState,
      collection: [
        {
          id: { value: 2, errors: [] },
          x: { value: 1, errors: [] },
          y: { value: 1, errors: [] },
          width: { value: 1, errors: [] },
          height: { value: 1, errors: [] },
          password: { value: '123', errors: [] },
          hasErrors: false,
        },
      ],
    };
    const action = {
      type: MODIFY_SELECTION,
      id: 3,
      x: 10,
    };
    const expectedState = initialState;
    expect(reducer(initialState, action)).to.eql(expectedState);
  });
});
