/**
 * Math utilities for 360° circular head tracking and canvas rendering
 */

export const BG_HEX = '#e65656';
export const TOTAL_FRAMES = 64;
export const DEADZONE_RATIO = 0.12; // ~12% screen radius
export const LERP_FACTOR = 0.26;    // ~35ms response time for zero lag
export const FACE_CENTER_X_RATIO = 0.50; // Face is horizontally centered in frame
export const FACE_CENTER_Y_RATIO = 0.42; // Face eyes/glasses level (~42% from top)

/**
 * Shortest-path circular angular lerp
 * Interpolates between current and target angles along the shortest circular arc.
 * @param {number} current - Current angle in radians
 * @param {number} target - Target angle in radians
 * @param {number} factor - Lerp smoothing factor (0..1)
 * @returns {number} Interpolated angle
 */
export function lerpAngle(current, target, factor) {
  let diff = (target - current) % (Math.PI * 2);
  if (diff > Math.PI) {
    diff -= Math.PI * 2;
  } else if (diff < -Math.PI) {
    diff += Math.PI * 2;
  }
  return current + diff * factor;
}

/**
 * Map an angle in radians to the nearest frame index [0..totalFrames-1]
 * 0 radians = RIGHT (index 0)
 * PI/2 radians = DOWN (index 16)
 * PI radians = LEFT (index 32)
 * 3*PI/2 radians = UP (index 48)
 * @param {number} angle - Angle in radians
 * @param {number} totalFrames - Total number of rotation frames (default: 64)
 * @returns {number} Frame index (0 to totalFrames - 1)
 */
export function angleToFrameIndex(angle, totalFrames = TOTAL_FRAMES) {
  const normalized = (angle % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
  return Math.round((normalized / (Math.PI * 2)) * totalFrames) % totalFrames;
}
