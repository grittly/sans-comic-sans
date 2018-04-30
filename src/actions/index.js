/* global atob, document, URL */
import {
  LOAD_IMAGE,
  UNLOAD_IMAGE,
  IMAGE_STATUS,
  ADD_SELECTION,
  MODIFY_SELECTION,
  DELETE_SELECTION,
  RESIZE_CANVAS_CONTAINER,
  SET_ACTIVE_SELECTION,
  VALIDATE_SELECTIONS,
  IMAGE_OBFUSCATING,
  IMAGE_OBFUSCATING_STATUS,
  UNLOAD_OBFUSCATED_IMAGE,
  SCALE_SELECTIONS,
  CLEAR_SELECTIONS,
  CHANGE_OBFUSCATION_DIRECTION,
} from '../constants';
import {
  runSelectionValidator,
  obfuscateSelectedArea,
} from './helpers';

// Actions related to loading source image

/**
 * Initialize app (for use in development)
 */
export function init() {
  /* eslint-disable */
  return (dispatch) => {
    const image = new window.Image();
    image.src = 'http://via.placeholder.com/700x500';
    return new Promise((resolve) => image.onload = resolve)
      .then(() => dispatch(loadImage(IMAGE_STATUS.DONE, image, image.width, image.height)))
      .then(() => dispatch(addAndValidateSelection()));
  };
  /* eslint-enable */
}


/**
 *  Set decrypt to false or true in settings reducer
 */
export function changeObfuscationDirection(decrypt = false) {
  return {
    type: CHANGE_OBFUSCATION_DIRECTION,
    decrypt,
  };
}

/**
 *  Scale all selections by a factor.
 *  Needed when obfuscated image is scaled down
 *  @param {number} scale - scale factor
 */
export function scaleSelections(scale) {
  return {
    type: SCALE_SELECTIONS,
    scale,
  };
}

/**
 * Load image into redux store
 */
export function loadImage(status, src, width, height) {
  return (dispatch) => {
    dispatch({
      type: LOAD_IMAGE,
      status,
      src,
      width,
      height,
    });
  };
}

/**
 *  Run image obfuscation
 */
export function obfuscateImage() {
  return (dispatch, getState) => {
    const srcImage = getState().srcImage.src;
    const { decrypt } = getState().settings;

    const canvasOriginal = document.createElement('canvas');
    const ctxOriginal = canvasOriginal.getContext('2d');
    const canvasEncrypted = document.createElement('canvas');
    const ctxEncrypted = canvasEncrypted.getContext('2d');
    let maxWidth = srcImage.width;
    let maxHeight = srcImage.height;

    Promise.resolve()
      .then(() => dispatch({ type: IMAGE_OBFUSCATING, status: IMAGE_OBFUSCATING_STATUS.LOADING }))
      .then(() => {
        const MAX_SIZE = 3000;
        if (MAX_SIZE < srcImage.width || MAX_SIZE < srcImage.height) {
          [maxWidth, maxHeight] = srcImage.width > srcImage.height ?
            [MAX_SIZE, Math.round((srcImage.height * MAX_SIZE) / srcImage.width)] :
            [Math.round((srcImage.width * MAX_SIZE) / srcImage.height), MAX_SIZE];
        }
        const scale = maxWidth / srcImage.width;
        canvasOriginal.width = maxWidth;
        canvasOriginal.height = maxHeight;

        canvasEncrypted.width = maxWidth;
        canvasEncrypted.height = maxHeight;
        ctxOriginal.drawImage(srcImage, 0, 0, maxWidth, maxHeight);

        return dispatch(scaleSelections(scale));
      })
      .then(() => {
        console.log("Decrypt is", decrypt)
        const selections = getState().selections.collection;
        selections.forEach(({
          x, y, width, height, password,
        }) => {
          ctxEncrypted.putImageData(
            obfuscateSelectedArea({
              originalImage: ctxOriginal.getImageData(
                x.value,
                y.value,
                width.value,
                height.value,
              ),
              encryptedImage: ctxEncrypted.getImageData(
                x.value,
                y.value,
                width.value,
                height.value,
              ),
              password,
              decrypt,
            }),
            Math.round(x.value),
            Math.round(y.value),
          );
        });
        ctxOriginal.drawImage(canvasEncrypted, 0, 0, maxWidth, maxHeight);
        return new Promise((resolve) => {
          canvasOriginal.toBlob((blob) => {
            resolve(blob);
          });
        });
      })
      .then((blob) => {
        const img = document.createElement('img');
        img.src = URL.createObjectURL(blob);
        return new Promise((resolve) => {
          img.onload = () => resolve(img);
        });
      })
      .then((obfuscatedSrc) => {
        dispatch({
          type: IMAGE_OBFUSCATING,
          status: IMAGE_OBFUSCATING_STATUS.DONE,
          obfuscatedSrc,
        });
        return obfuscatedSrc;
      })
      .then(obfuscatedSrc => dispatch(loadImage(
        IMAGE_STATUS.DONE,
        obfuscatedSrc,
        obfuscatedSrc.width,
        obfuscatedSrc.height,
      )));
  };
}

export function unloadObfuscatedImage() {
  return {
    type: UNLOAD_OBFUSCATED_IMAGE,
  };
}

/**
 * Run the validator through the collection array inside selections reducer
 *
 */
export function validateSelections() {
  return (dispatch, getState) => {
    const selections = getState().selections.collection;
    const { width, height } = getState().srcImage;
    return runSelectionValidator(selections, width, height)
      .then(validatedCollection => dispatch({
        type: VALIDATE_SELECTIONS,
        validatedCollection,
      }));
  };
}

/**
 * Set or unset the id of the current selection
 * @param {number} id - Id corresponding to the id in collection
 * array inside selection reducer
 */
export function setActiveSelection(id) {
  return {
    type: SET_ACTIVE_SELECTION,
    id,
  };
}

/**
 * Modify canvas container dimensions in redux store in
 * response to the browser resizing
 */
export function resizeCanvas(containerWidth = 0) {
  return (dispatch) => {
    dispatch({
      type: RESIZE_CANVAS_CONTAINER,
      containerWidth,
    });
  };
}

/**
 *  Unload image from redux store
 */
export function unloadImage() {
  return { type: UNLOAD_IMAGE };
}

/**
 *  Clear all selections
 */
export function clearSelections() {
  return { type: CLEAR_SELECTIONS };
}

/**
 *
 */
export function addSelection({
  x, y, width, height, password, imageWidth, imageHeight,
}) {
  return {
    type: ADD_SELECTION,
    x,
    y,
    width,
    height,
    imageWidth,
    imageHeight,
    password,
  };
}

/**
 * Add a selection representing an area on the source image
 */
export function addAndValidateSelection({
  x, y, width, height, password,
} = {}) {
  return (dispatch, getState) => {
    const imageWidth = getState().srcImage.width;
    const imageHeight = getState().srcImage.height;
    return Promise.resolve()
      .then(() => dispatch(addSelection({
        x,
        y,
        width,
        height,
        imageWidth,
        imageHeight,
        password,
      })))
      .then(() => dispatch(validateSelections()));
  };
}

/**
 * Modify a selection
 */
export function modifySelection({
  id, x, y, width, height, password,
} = {}) {
  return dispatch => Promise.resolve()
    .then(() => dispatch({
      type: MODIFY_SELECTION,
      id,
      x,
      y,
      width,
      height,
      password,
    }))
    .then(() => dispatch(validateSelections()));
}

/**
 * Delete a selection
 */
export function deleteSelection(id) {
  return {
    type: DELETE_SELECTION,
    id,
  };
}

/**
 *  Import selections from base64 string
 *  @param {string} selectionsBase64 - base64 string of a json array with selection coordinates
 *  @param {Function} _customBase64Conversion - custom function for converting base64 to ascii.
 *  This is mostly for testing
 */
export function importSelections(selectionsBase64, _customBase64Conversion = atob) {
  return (dispatch, getState) => {
    const imageWidth = getState().srcImage.width;
    const imageHeight = getState().srcImage.height;
    try {
      const parsedSelections = JSON.parse(_customBase64Conversion(selectionsBase64));
      if (Array.isArray(parsedSelections)) {
        return Promise.all(parsedSelections.map(selection => dispatch(addSelection({
          x: selection.x,
          y: selection.y,
          width: selection.width,
          height: selection.height,
          password: selection.password,
          imageWidth,
          imageHeight,
        }))))
          .then(() => dispatch(validateSelections()));
      }
    } catch (e) {
      // TODO: dispatch error
    }
  };
}
