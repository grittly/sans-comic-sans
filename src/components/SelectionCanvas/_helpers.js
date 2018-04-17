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
