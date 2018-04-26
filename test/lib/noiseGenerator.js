/* globals describe it */
import { expect } from 'chai';
import { mergeNoiseAndImageData } from '../../src/lib/NoiseGenerator';


// Generate a typed array equivalent to a 25 by 25 pixels image,
// where every pixel equals RGBA(100,100, 255)
const pixelsArray = Array.from({ length: 25 * 25 }, () => [100, 100, 100, 255])
  .reduce((acc, pixel) => [...acc, ...pixel]);
const emptyMap = Uint8ClampedArray
  .from(pixelsArray, () => 0);


const dataImageRegular = Uint8ClampedArray
  .from(Array.from(
    { length: 25 * 25 },
    () => [100, 100, 100, 255],
  )
    .reduce((acc, pixel) => [...acc, ...pixel]));

const dataImagePlus = Uint8ClampedArray
  .from(Array.from(
    { length: 25 * 25 },
    () => [100 + 10, 100 + 10, 100 + 10, 255],
  )
    .reduce((acc, pixel) => [...acc, ...pixel]));

const dataImageMinus = Uint8ClampedArray
  .from(Array.from(
    { length: 25 * 25 },
    () => [100 - 10, 100 - 10, 100 - 10, 255],
  )
    .reduce((acc, pixel) => [...acc, ...pixel]));

const noiseMap = Uint8ClampedArray
  .from(Array.from(
    { length: 25 * 25 },
    () => [10, 10, 10, 255],
  )
    .reduce((acc, pixel) => [...acc, ...pixel]));

describe('Validator', () => {
  it('Validate that adding noise works', () => {
    const imagePlusNoise = mergeNoiseAndImageData(
      { data: dataImageRegular },
      { data: emptyMap },
      noiseMap,
      false,
    );
    expect(imagePlusNoise.slice(0, 100)).to.eql(dataImagePlus.slice(0, 100));
  });
  it('Validate that subtracting noise works', () => {
    const imageMinusNoise = mergeNoiseAndImageData(
      { data: dataImageRegular },
      { data: emptyMap },
      noiseMap,
      true,
    );
    expect(imageMinusNoise.slice(0, 100)).to.eql(dataImageMinus.slice(0, 100));
  });
  it('Validate that noise map adds to pixels in encryptedLayer if they are present', () => {
    const imagePlusNoise = mergeNoiseAndImageData(
      { data: dataImageRegular },
      { data: dataImageMinus },
      noiseMap,
      false,
    );
    expect(imagePlusNoise.slice(0, 100)).to.eql(dataImageRegular.slice(0, 100));
  });
});
