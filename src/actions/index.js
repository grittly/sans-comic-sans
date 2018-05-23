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
  resizeImage,
} from './helpers';

// Actions related to loading source image

/**
 * Load example image
 */
export function loadExample() {
  /* eslint-disable */
  return (dispatch) => {
    const image = new window.Image();
    image.src = 'images/example.png';
    return new Promise((resolve, reject) => {
      image.onload = (img) => {
        dispatch(loadImage(IMAGE_STATUS.LOADING));
        resolve(img);
      }
      image.onerror = reject;
    })
      .then(() => dispatch(loadImage(IMAGE_STATUS.DONE, image, image.width, image.height)))
      .then(() => dispatch(addAndValidateSelection({
        x: 62,
        y: 112,
        width: 174,
        height: 69,
        password: "sanscomicsans",
      })))
      .then(() => dispatch(addAndValidateSelection({
        x: 42,
        y: 17,
        width: 215,
        height: 73,
        password: "sanscomicsans",
      })))
      .then(() => dispatch(changeObfuscationDirection(true)))
      .catch((e) => console.log('Problem loading example image'));
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
 * Load image into redux store and resize it if the longest dimension exceeds max allowed size
 */
export function loadImage(status, src) {
  return (dispatch) => {
    switch (status) {
      case IMAGE_STATUS.LOADING:
        return dispatch({
          type: LOAD_IMAGE,
          status,
        });
      case IMAGE_STATUS.DONE:
        return Promise.resolve()
          .then(() => {
            return resizeImage(src);
          })
          .then((img) => dispatch({
            type: LOAD_IMAGE,
            status,
            src: img,
            width: img.width,
            height: img.height,
          }));
      default:
    }
  };
}


/**
 *  Run image obfuscation
 */
export function obfuscateImage() {
  return (dispatch, getState) => {
    const srcImage = getState().srcImage.src;
    const { decrypt } = getState().settings;

    Promise.resolve()
      .then(() => dispatch({ type: IMAGE_OBFUSCATING, status: IMAGE_OBFUSCATING_STATUS.LOADING }))
      .then(() => {
        const canvasOriginal = document.createElement('canvas');
        const ctxOriginal = canvasOriginal.getContext('2d');
        const canvasEncrypted = document.createElement('canvas');
        const ctxEncrypted = canvasEncrypted.getContext('2d');
        const selections = getState().selections.collection;
        canvasOriginal.width = srcImage.width;
        canvasOriginal.height = srcImage.height;
        canvasEncrypted.width = srcImage.width;
        canvasEncrypted.height = srcImage.height;
        ctxOriginal.drawImage(srcImage, 0, 0, srcImage.width, srcImage.height);
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
        ctxOriginal.drawImage(canvasEncrypted, 0, 0, srcImage.width, srcImage.height);
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
 *  Clear all selections
 */
export function clearSelections() {
  return { type: CLEAR_SELECTIONS };
}

/**
 *  Unload image from redux store
 */
export function unloadImage() {
  return (dispatch) => {
    return Promise.resolve()
      .then(() => dispatch(setActiveSelection()))
      .then(() => dispatch(clearSelections()))
      .then(() => dispatch(unloadObfuscatedImage()))
      .then(() => dispatch({ type: UNLOAD_IMAGE }));
  };
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
