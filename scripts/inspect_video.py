#!/usr/bin/env python3
"""Inspect character.mp4: frame count, timeline, background color, motion."""

from __future__ import annotations

from collections import Counter
from pathlib import Path

import cv2
import numpy as np

ROOT = Path(__file__).resolve().parents[1]
VIDEO = ROOT / "public" / "character.mp4"
OUT = ROOT / "scripts" / "inspect_samples"
OUT.mkdir(parents=True, exist_ok=True)


def hex_color(bgr: np.ndarray) -> str:
    b, g, r = [int(round(x)) for x in bgr]
    return f"#{r:02x}{g:02x}{b:02x}"


def corner_bg(frame: np.ndarray, pad: int = 8, size: int = 24) -> np.ndarray:
    h, w = frame.shape[:2]
    patches = [
        frame[pad : pad + size, pad : pad + size],
        frame[pad : pad + size, w - pad - size : w - pad],
        frame[h - pad - size : h - pad, pad : pad + size],
        frame[h - pad - size : h - pad, w - pad - size : w - pad],
    ]
    return np.mean(np.concatenate([p.reshape(-1, 3) for p in patches], axis=0), axis=0)


def head_centroid(frame: np.ndarray, bg: np.ndarray, thresh: int = 28) -> tuple[float, float] | None:
    """Centroid of non-background pixels in the upper 55% of the frame (head region)."""
    h, w = frame.shape[:2]
    crop = frame[: int(h * 0.55)]
    dist = np.linalg.norm(crop.astype(np.float32) - bg.astype(np.float32), axis=2)
    mask = dist > thresh
    ys, xs = np.where(mask)
    if len(xs) < 80:
        return None
    return float(xs.mean()), float(ys.mean())


def main() -> None:
    cap = cv2.VideoCapture(str(VIDEO))
    if not cap.isOpened():
        raise SystemExit(f"Could not open {VIDEO}")

    fps = cap.get(cv2.CAP_PROP_FPS) or 30
    reported = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

    frames = []
    while True:
        ok, frame = cap.read()
        if not ok:
            break
        frames.append(frame)
    cap.release()

    n = len(frames)
    print(f"path: {VIDEO}")
    print(f"size: {width}x{height}")
    print(f"fps: {fps:.4f}")
    print(f"reported_frames: {reported}")
    print(f"actual_frames: {n}")
    print(f"duration_s: {n / fps:.4f}")

    bg = corner_bg(frames[0])
    print(f"bg_bgr: {bg.tolist()}")
    print(f"bg_hex: {hex_color(bg)}")

    # Sample every ~N frames plus first/last
    step = max(1, n // 40)
    centroids = []
    for i, frame in enumerate(frames):
        c = head_centroid(frame, bg)
        centroids.append(c)
        if i % step == 0 or i == n - 1:
            if c:
                print(f"frame {i:04d}  t={i/fps:6.3f}s  centroid=({c[0]:7.1f},{c[1]:6.1f})")
            else:
                print(f"frame {i:04d}  t={i/fps:6.3f}s  centroid=None")
            path = OUT / f"frame_{i:04d}.jpg"
            cv2.imwrite(str(path), frame, [int(cv2.IMWRITE_JPEG_QUALITY), 88])

    # Motion energy between consecutive frames (head crop)
    energies = [0.0]
    for i in range(1, n):
        a = frames[i - 1][: int(height * 0.55)].astype(np.float32)
        b = frames[i][: int(height * 0.55)].astype(np.float32)
        energies.append(float(np.mean(np.abs(a - b))))

    # Find hold poses: local minima of energy after motion bursts
    print("\n--- motion energy (sampled) ---")
    for i in range(0, n, step):
        print(f"frame {i:04d}  energy={energies[i]:.3f}")

    # Estimate pose holds: energy below threshold for consecutive frames
    thr = float(np.percentile(energies, 35))
    holds = []
    start = None
    for i, e in enumerate(energies):
        if e < thr:
            if start is None:
                start = i
        else:
            if start is not None and i - start >= 3:
                holds.append((start, i - 1, (start + i - 1) // 2))
            start = None
    if start is not None and n - start >= 3:
        holds.append((start, n - 1, (start + n - 1) // 2))

    print(f"\nenergy_hold_threshold: {thr:.3f}")
    print("hold_ranges (start,end,mid):")
    for h in holds:
        print(f"  {h}")

    # Direction from centroid vs median (neutral-ish)
    valid = [c for c in centroids if c]
    mx = float(np.median([c[0] for c in valid]))
    my = float(np.median([c[1] for c in valid]))
    print(f"\nmedian_centroid: ({mx:.1f},{my:.1f})")
    print("hold pose directions (atan2, degrees; 0=RIGHT, 90=DOWN, -90=UP):")
    for start_i, end_i, mid in holds:
        c = centroids[mid]
        if not c:
            continue
        dx = c[0] - mx
        dy = c[1] - my
        ang = float(np.degrees(np.arctan2(dy, dx)))
        print(f"  mid={mid:04d} dx={dx:7.1f} dy={dy:6.1f} ang={ang:7.1f}")

    # Last 15% likely center
    last = centroids[-1]
    print(f"\nlast_frame_centroid: {last}")
    print(f"last_frame_index: {n - 1}")


if __name__ == "__main__":
    main()
