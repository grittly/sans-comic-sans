/* globals document, URL */
import {
  VALIDATE_PRESENCE,
  VALIDATE_ALLOWED_CHARACTERS,
  VALIDATE_CHAR_LENGTH_RANGE,
  VALIDATE_INTEGER,
  VALIDATE_NUMERIC_RANGE,
  RULE_ALLOWED_CHARACTERS,
  RULE_NUMERIC_RANGE,
  RULE_CHAR_LENGTH_RANGE,
} from '../constants';
import Validator from '../lib/Validator';
import noiseGenerator from '../lib/NoiseGenerator';

const rules = {
  [RULE_CHAR_LENGTH_RANGE]: { minLength: 0, maxLength: 100 },
  [RULE_NUMERIC_RANGE]: { minNum: 4, maxNum: 100 },
  [RULE_ALLOWED_CHARACTERS]: { allowedCharsRe: /^\S+$/ },
};

const validations = {
  id: [],
  x: [VALIDATE_PRESENCE, VALIDATE_INTEGER, VALIDATE_NUMERIC_RANGE],
  y: [VALIDATE_PRESENCE, VALIDATE_INTEGER, VALIDATE_NUMERIC_RANGE],
  width: [VALIDATE_PRESENCE, VALIDATE_INTEGER, VALIDATE_NUMERIC_RANGE],
  height: [VALIDATE_PRESENCE, VALIDATE_INTEGER, VALIDATE_NUMERIC_RANGE],
  password: [VALIDATE_CHAR_LENGTH_RANGE, VALIDATE_ALLOWED_CHARACTERS],
};

const Validate = Validator(rules, validations);

export function runSelectionValidator(selections, imgWidth, imgHeight) {
  return new Promise((resolve) => {
    const validatedCollection = selections.map((selection) => {
      const validated = {
        x: Validate('x', selection.x, {
          RULE_NUMERIC_RANGE: { minNum: 0, maxNum: imgWidth - selection.width.value },
        }),
        y: Validate('y', selection.y, {
          RULE_NUMERIC_RANGE: { minNum: 0, maxNum: imgHeight - selection.height.value },
        }),
        width: Validate('width', selection.width, {
          RULE_NUMERIC_RANGE: { minNum: 0, maxNum: imgWidth - selection.x.value },
        }),
        height: Validate('height', selection.height, {
          RULE_NUMERIC_RANGE: { minNum: 0, maxNum: imgHeight - selection.y.value },
        }),
        password: Validate('password', selection.password),
      };
      return {
        ...selection,
        ...validated,
        hasErrors: Object.keys(validated)
          .reduce((acc, key) => validated[key].errors.length + acc, 0) > 0,
      };
    });
    resolve(validatedCollection);
  });
}

/**
 *  Adds noise to the srcImage and returns an obfuscated image
 *  @param {ImageData} originalImage - original image source
 *  @param {ImageData} encryptedImage - image layer with already encrypted areas
 *  @param {boolean} decrypt - subtract noise from image if true
 *  @return {ImageData} - Return same sized ImageData with noise added/subtracted,
 *  depending on value of decrypt
 */
export function obfuscateSelectedArea({
  originalImage,
  encryptedImage,
  password,
  decrypt = false,
}) {
  const result = noiseGenerator(password, originalImage, encryptedImage, decrypt);
  // eslint-disable-next-line no-undef
  return new ImageData(result, originalImage.width, originalImage.height);
}


/**
 *  Resize image so longest edge is at most maxSize
 *  @param {HTMLImageElement} img - Image being loaded
 *  @param {number} maxSize - maximum size for any one dimension of img
 *
 */
export function resizeImage(img, maxSize = 1000) {
  return Promise.resolve()
    .then(() => {
      let maxWidth = img.width;
      let maxHeight = img.height;
      if (maxSize < img.width || maxSize < img.height) {
        [maxWidth, maxHeight] = img.width > img.height ?
          [maxSize, Math.round((img.height * maxSize) / img.width)] :
          [Math.round((img.width * maxSize) / img.height), maxSize];
      }
      if (maxWidth < img.width) {
        const canvasResize = document.createElement('canvas');
        const ctxResize = canvasResize.getContext('2d');
        canvasResize.width = maxWidth;
        canvasResize.height = maxHeight;
        ctxResize.drawImage(img, 0, 0, maxWidth, maxHeight);
        return new Promise((resolve) => {
          canvasResize.toBlob((blob) => {
            resolve(blob);
          });
        })
          .then((blob) => {
            const tmpImg = document.createElement('img');
            tmpImg.src = URL.createObjectURL(blob);
            return new Promise((resolve) => {
              tmpImg.onload = () => resolve(tmpImg);
            });
          });
      }
      return img;
    });
}
