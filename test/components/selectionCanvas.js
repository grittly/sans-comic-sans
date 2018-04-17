/* globals describe it */
/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import { setBoundaries } from '../../src/components/SelectionCanvas/_helpers';

describe('SelectionCanvas component', () => {
  describe('helpers', () => {
    describe('setBoundaries', () => {
      it('Returns same position if both position and width are within boundaries', () => {
        const [position, size, min, max] = [10, 10, 5, 100];
        expect(setBoundaries(position, size, min, max)).to.equal(position);
      });
      it('Returning min if position is less than min', () => {
        const [position, size, min, max] = [5, 10, 10, 100];
        expect(setBoundaries(position, size, min, max)).to.equal(min);
      });
      it('Returning (max - size) if (position + size) is greater than max', () => {
        const [position, size, min, max] = [110, 10, 5, 100];
        expect(setBoundaries(position, size, min, max)).to.equal(max - size);
      });
      it('Returns undefined if size greater than max or min is greater than max', () => {
        let [position, size, min, max] = [0, 21, 0, 20];
        expect(setBoundaries(position, size, min, max)).to.be.undefined;

        [position, size, min, max] = [0, 5, 21, 20];
        expect(setBoundaries(position, size, min, max)).to.be.undefined;
      });
      it('If size, min or max are negative, return undefined', () => {
        let [position, size, min, max] = [5, -1, 0, 20];
        expect(setBoundaries(position, size, min, max)).to.be.undefined;

        [position, size, min, max] = [5, 5, -1, 20];
        expect(setBoundaries(position, size, min, max)).to.be.undefined;

        [position, size, min, max] = [5, 5, 0, -1];
        expect(setBoundaries(position, size, min, max)).to.be.undefined;
      });
    });
  });
});
