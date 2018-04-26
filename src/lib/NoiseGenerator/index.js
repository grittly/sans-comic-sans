import seedrandom from 'seedrandom';

/**
 *  Helper function to generate a sequence of random numbers from 0 to 255
 *  to be used for every pixel (4 channels per pixel) in a given image
 *  @param {string} key - a string that is used as seed for the pseudo random number generator
 *  @param {number} width - width of image in pixels
 *  @param {number} height - height of image in pixels
 */
function generateNoise(key, width, height) {
  const rng = seedrandom(key);
  const randomSequence = [];
  for (let i = 0; i < width * height * 4; i += 4) {
    // Red channel
    randomSequence[i] = Math.round(rng() * 255);
    // Green channel
    randomSequence[i + 1] = Math.round(rng() * 255);
    // Blue channel
    randomSequence[i + 2] = Math.round(rng() * 255);
    // Alpha channel
    randomSequence[i + 3] = 255;
  }
  return randomSequence;
}

/**
 *  Add pixels from noiseMap to pixel data from imageData or encryptedData in modulo 255
 *  @param {Uint8ClampedArray} imageData - image data to add noise too
 *  @param {Uint8ClampedArray} encryptedData - image data layer that already
 *  contains previously encrypted areas. Default is an empty array. This is
 *  necessary for encrypting overlapping areas. Noise is added using values of
 *  this layer if there non transparent values at a given pixel.
 *  @param {Uint8CalampedArray} noiseData - noise data to be added to pixels
 *  @param {boolean} decrypt - if true, noise map is subtracted, otherwise it is added
 *  @return {Uint8ClampedArray} - image data that is to be added to the encryptedData layer
 */
export function mergeNoiseAndImageData(imageData, encryptedData, noiseData, decrypt = false) {
  const newData = new Uint8ClampedArray(imageData);
  const modulo = 256;
  const direction = decrypt ? -1 : 1;
  for (let i = 0; i < newData.length; i += 4) {
    // Red channel
    newData[i] = (
      (encryptedData[i + 3] ? encryptedData[i] : newData[i])
      + (noiseData[i] * direction)) % modulo;
    // Green channel
    newData[i + 1] = (
      (encryptedData[i + 3] ? encryptedData[i + 1] : newData[i + 1])
      + (noiseData[i + 1] * direction)) % modulo;
    // Blue channel
    newData[i + 2] = ((encryptedData[i + 3] ? encryptedData[i + 2] : newData[i + 2])
      + (noiseData[i + 2] * direction)) % modulo;
    // Alpha channel
    newData[i + 3] = 255;
  }
  return newData;
}

export default function encryptArea(key, imageData, encryptedData, decrypt) {
  const noiseMap = generateNoise(key, imageData.width, imageData.height);
  return mergeNoiseAndImageData(imageData, encryptedData, noiseMap, decrypt);
}
