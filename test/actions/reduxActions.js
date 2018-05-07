/* globals describe it beforeEach */
import { expect } from 'chai';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import defaultState from '../../src/store/defaultState';
import {
  unloadImage,
  importSelections,
} from '../../src/actions';
import {
  ADD_SELECTION,
  VALIDATE_SELECTIONS,
  UNLOAD_IMAGE,
  CLEAR_SELECTIONS,
  SET_ACTIVE_SELECTION,
  UNLOAD_OBFUSCATED_IMAGE,
} from '../../src/constants';

const mockStore = configureStore([thunk]);
let store;


describe('Redux actions', () => {
  beforeEach(() => {
    store = mockStore(defaultState);
  });
  it('importSelections first adds the selections, and then validates them', () => {
    store = mockStore({
      ...defaultState,
      srcImage: {
        width: 200,
        height: 200,
      },
    });
    const selectionsBase64 = Buffer.from(JSON.stringify([
      {
        x: 1,
        y: 2,
        width: 10,
        height: 11,
        password: 'blank',
      },
      {
        x: 3,
        y: 4,
        width: 20,
        height: 21,
        password: 'pass',
      }])).toString('base64');
    const action = importSelections(
      selectionsBase64,
      base64String => Buffer.from(base64String, 'base64').toString(),
    );
    const expectedActions = [
      {
        type: ADD_SELECTION,
        x: 1,
        y: 2,
        width: 10,
        height: 11,
        imageWidth: 200,
        imageHeight: 200,
        password: 'blank',
      },
      {
        type: ADD_SELECTION,
        x: 3,
        y: 4,
        width: 20,
        height: 21,
        imageWidth: 200,
        imageHeight: 200,
        password: 'pass',
      },
    ];
    store.dispatch(action)
      .then(() => {
        const result = store.getActions();
        expect(result.slice(0, 2)).to.eql(expectedActions);
        expect(result.length).to.equal(3);
        expect(result[2].type).to.equal(VALIDATE_SELECTIONS);
      });
  });
  it('unloadImage does the proper clean-up on the rest of redux state', () => {
    const action = unloadImage();
    const expectedActions = [
      { type: SET_ACTIVE_SELECTION, id: undefined },
      { type: CLEAR_SELECTIONS },
      { type: UNLOAD_OBFUSCATED_IMAGE },
      { type: UNLOAD_IMAGE },
    ];
    store.dispatch(action)
      .then(() => expect(store.getActions()).to.eql(expectedActions));
  });
});
