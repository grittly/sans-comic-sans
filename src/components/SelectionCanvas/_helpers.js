/**
 * Calculate position of object with a given size within
 * a 1 dimensional boundary condition
 * @param {number} position - C
 * @param {number} size - size of object within the 1 dimension
 * @param {number} min - minimum position allowed
 * @param {number} max - maximum position allowed, taking into account size of object
 * @returns {number} Re-calculated position within the allowed boundaries
 */
export function setBoundaries(position = 0, size = 0, min = 0, max = 0) {
  if (min >= 0 && size >= 0 && min < max && size <= max) {
    return Math.min(
      Math.max(
        min,
        position,
      ),
      max - size,
    );
  }
  return undefined;
}

/**
 * Returns a new set of props where the coordinates are scaled.
 * The resize handle, however, is kept the same size
 * @param {Object} props - Props passed to the component
 * @param {number} props.x - x coordinate of the selection
 * @param {number} props.y - y coordinate of the selection
 * @param {number} props.containerWidth - the width of the canvas
 * @param {number} props.containerHeight - the height of the canvas
 * @param {number} props.scale - scale factor due to canvas resizing
 * @param {number} handleSize - width of the square resize handle
 */
export function scaleCoordinates({
  x,
  y,
  width,
  height,
  containerWidth,
  containerHeight,
  scale,
}, handleSize) {
  return {
    selection: {
      x: x * scale,
      y: y * scale,
      width: width * scale,
      height: height * scale,
    },
    handle: {
      x: ((x + width) * scale) - handleSize,
      y: ((y + height) * scale) - handleSize,
      width: handleSize,
      height: handleSize,
    },
    container: {
      width: containerWidth * scale,
      height: containerHeight * scale,
    },
  };
}

