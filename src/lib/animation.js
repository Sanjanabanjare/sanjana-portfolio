export const FRAME_COUNT = 64
export const ANGLE_RESPONSE = 0.26
export const DEADZONE = 0.12
export const DEADZONE_EXIT = 0.16
export const SCENE_BG = '#e65455'
export const IMAGE_WIDTH = 1280
export const IMAGE_HEIGHT = 720
export const FACE_ANCHOR = { x: 0.5, y: 0.38 }

export function lerpAngle(a, b, t) {
  let diff = b - a
  while (diff > Math.PI) diff -= Math.PI * 2
  while (diff < -Math.PI) diff += Math.PI * 2
  return a + diff * t
}

export function angleToFrame(angle) {
  const tau = Math.PI * 2
  let t = angle / tau
  t -= Math.floor(t)
  return Math.round(t * FRAME_COUNT) % FRAME_COUNT
}

export function coverRect(
  canvasW,
  canvasH,
  imgW = IMAGE_WIDTH,
  imgH = IMAGE_HEIGHT,
  posX = 0.5,
  posY = 0.28,
) {
  const scale = Math.max(canvasW / imgW, canvasH / imgH)
  const w = imgW * scale
  const h = imgH * scale
  const x = (canvasW - w) * posX
  const y = (canvasH - h) * posY
  return { x, y, w, h, scale }
}

export function faceCenter(rect) {
  return {
    x: rect.x + FACE_ANCHOR.x * rect.w,
    y: rect.y + FACE_ANCHOR.y * rect.h,
  }
}
