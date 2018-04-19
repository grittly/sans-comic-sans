/* globals describe it */
import { expect } from 'chai';
import reducer from '../../src/reducers/srcImage';
import {
  LOAD_IMAGE,
  UNLOAD_IMAGE,
  IMAGE_STATUS,
} from '../../src/constants';

import state from '../../src/store/defaultState';

const defaultState = state.srcImage;

describe('srcImage reducer', () => {
  it('Sets image src if all params are present', () => {
    const initialState = defaultState;
    let action = {
      type: LOAD_IMAGE,
      width: 100,
      height: 200,
      src: {},
      status: IMAGE_STATUS.DONE,
    };
    let expectedState = {
      ...defaultState,
      src: {},
      status: IMAGE_STATUS.DONE,
      width: 100,
      height: 200,
      aspectRatio: 2,
    };
    expect(reducer(initialState, action)).to.eql(expectedState);
    action = {
      type: LOAD_IMAGE,
      width: 100,
      height: 100,
      src: null,
      status: IMAGE_STATUS.DONE,
    };
    expectedState = defaultState;
    expect(reducer(initialState, action)).to.eql(expectedState);
  });
  it('Should leave image src as null and width and height as 0 if status is anything but DONE', () => {
    const initialState = defaultState;
    let action;
    let expectedState;

    action = {
      type: LOAD_IMAGE,
      width: 100,
      height: 200,
      src: {},
      status: IMAGE_STATUS.LOADING,
    };
    expectedState = {
      ...defaultState,
      src: null,
      status: IMAGE_STATUS.LOADING,
      width: 0,
      height: 0,
      aspectRatio: 1,
    };

    expect(reducer(initialState, action)).to.eql(expectedState);

    action = {
      type: LOAD_IMAGE,
      width: 100,
      height: 200,
      src: {},
      status: IMAGE_STATUS.DONE,
    };
    expectedState = {
      ...defaultState,
      src: {},
      status: IMAGE_STATUS.DONE,
      width: 100,
      height: 200,
      aspectRatio: 2,
    };
    expect(reducer(initialState, action)).to.eql(expectedState);
  });
  it('Should clear image src and reset status if UNLOAD_IMAGE action is received', () => {
    const initialState = {
      ...defaultState,
      src: {},
      status: IMAGE_STATUS.DONE,
      width: 100,
      height: 200,
      aspectRatio: 2,
    };
    const action = {
      type: UNLOAD_IMAGE,
    };
    const expectedState = defaultState;
    expect(reducer(initialState, action)).to.eql(expectedState);
  });
  it('Should only accept 2 types of statuses - LOADING and DONE', () => {
    const initialState = defaultState;
    const action = {
      type: LOAD_IMAGE,
      src: {},
      status: 'WRONG_STATUS',
      width: 100,
      height: 200,
    };
    const expectedState = defaultState;
    expect(reducer(initialState, action)).to.eql(expectedState);
  });
  it('Should return default state if no width or height are provided or if they are <= 0', () => {
    const initialState = defaultState;
    let action = {
      type: LOAD_IMAGE,
      src: {},
      status: IMAGE_STATUS.DONE,
      width: null,
      height: null,
    };
    const expectedState = defaultState;
    expect(reducer(initialState, action)).to.eql(expectedState);

    action = {
      type: LOAD_IMAGE,
      src: {},
      status: IMAGE_STATUS.DONE,
      width: -100,
      height: 100,
    };
    expect(reducer(initialState, action)).to.eql(expectedState);
  });
});
