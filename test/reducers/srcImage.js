import { expect } from 'chai';
import reducer from '../../src/reducers/srcImage';
import {
  LOAD_IMAGE,
  IMAGE_STATUS,
} from '../../src/constants';

import { srcImage } from '../../src/store/defaultState';

describe('srcImage reducer', () => {
  it('Sets image src if all other params are provided');
  it('Should leave image src as null if status is anything but LOADING');
  it('Should clear image src and reset status if UNLOAD_IMAGE action is received');
  it('Should only accept 2 types of statuses - LOADING and DONE');
  it('Should return default state if no width or height are provided');
});
