#!/usr/bin/env python3
"""Refine compass keyframes using a tight face crop."""

from pathlib import Path

import cv2
import numpy as np

ROOT = Path(__file__).resolve().parents[1]
VIDEO = ROOT / "public" / "character.mp4"
OUT = ROOT / "scripts" / "face_samples"
OUT.mkdir(parents=True, exist_ok=True)


def face_crop(frame):
    h, w = frame.shape[:2]
    # Character is centered; face occupies roughly this box
    x0, x1 = int(w * 0.32), int(w * 0.68)
    y0, y1 = int(h * 0.08), int(h * 0.52)
    return frame[y0:y1, x0:x1], (x0, y0)


def dark_centroid(crop):
    gray = cv2.cvtColor(crop, cv2.COLOR_BGR2GRAY)
    # Eyes/brows/iris are darker than skin
    mask = gray < 90
    ys, xs = np.where(mask)
    if len(xs) < 40:
        return None
    return xs.mean(), ys.mean()


def main():
    cap = cv2.VideoCapture(str(VIDEO))
    frames = []
    while True:
        ok, f = cap.read()
        if not ok:
            break
        frames.append(f)
    cap.release()
    n = len(frames)
    fps = 24.0

    center = frames[-1]
    ccrop, _ = face_crop(center)
    ccent = dark_centroid(ccrop)
    print(f"center dark centroid: {ccent} crop={ccrop.shape}")

    rows = []
    for i, frame in enumerate(frames):
        crop, _ = face_crop(frame)
        d = dark_centroid(crop)
        if d and ccent:
            dx = d[0] - ccent[0]
            dy = d[1] - ccent[1]
            ang = np.degrees(np.arctan2(dy, dx))
        else:
            dx = dy = ang = float("nan")
        energy = float(np.mean(np.abs(crop.astype(np.float32) - ccrop.astype(np.float32))))
        rows.append((i, dx, dy, ang, energy))

    print("frame   t      dx      dy     ang    vs_center")
    for i in range(0, n, 3):
        fr, dx, dy, ang, e = rows[i]
        print(f"{fr:04d}  {fr/fps:5.2f}  {dx:7.2f} {dy:7.2f} {ang:7.1f}  {e:6.1f}")

    # Save every 6th face crop
    for i in range(0, n, 6):
        crop, _ = face_crop(frames[i])
        cv2.imwrite(str(OUT / f"face_{i:04d}.jpg"), crop, [int(cv2.IMWRITE_JPEG_QUALITY), 90])
    cv2.imwrite(str(OUT / "face_0239.jpg"), face_crop(frames[-1])[0], [int(cv2.IMWRITE_JPEG_QUALITY), 90])


if __name__ == "__main__":
    main()
