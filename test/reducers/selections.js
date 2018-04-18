/* globals describe it */
import { expect } from 'chai';
import reducer from '../../src/reducers/selections';
import {
  ADD_SELECTION,
  MODIFY_SELECTION,
  DELETE_SELECTION,
} from '../../src/constants';

import state from '../../src/store/defaultState';

const defaultState = state.selections;

describe('selections reducer', () => {
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
          id: 1, x: 1, y: 2, width: 3, height: 4, password: 'pass',
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
          id: 1, x: 0, y: 0, width: action.imageWidth * 0.2, height: action.imageWidth * 0.2, password: '',
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
          id: 1,
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
          id: 2, x: 1, y: 2, width: 3, height: 4, password: '123',
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
          id: 2,
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
          id: 2,
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
          id: 2, x: 1, y: 1, width: 1, height: 1, password: '123',
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
          x: 10,
          y: 11,
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
          id: 2, x: 1, y: 1, width: 1, height: 1, password: '123',
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
          id: 2, x: 1, y: 1, width: 1, height: 1, password: '123',
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
