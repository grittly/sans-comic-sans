/* globals describe it */
import { expect } from 'chai';
import reducer from '../../src/reducers/settings';
import { CHANGE_OBFUSCATION_DIRECTION } from '../../src/constants';

import state from '../../src/store/defaultState';

const defaultState = {
  ...state.settings,
};

describe('settings reducer', () => {
  it('Changes obfuscation direction', () => {
    // Changes the state if param is provided
    let initialState = {
      ...defaultState,
      decrypt: false,
    };
    let action = {
      type: CHANGE_OBFUSCATION_DIRECTION,
      decrypt: true,
    };
    let expectedState = {
      ...initialState,
      decrypt: true,
    };
    expect(reducer(initialState, action)).to.eql(expectedState);

    // If no parameter is provided in action, default is to set decrypt to false
    initialState = {
      ...defaultState,
      decrypt: true,
    };
    action = {
      type: CHANGE_OBFUSCATION_DIRECTION,
    };
    expectedState = {
      ...initialState,
      decrypt: false,
    };
    expect(reducer(initialState, action)).to.eql(expectedState);
  });
});
