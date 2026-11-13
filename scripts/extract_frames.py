import os
import cv2
import json
import numpy as np

def make_transparent_frame(img):
    h, w, _ = img.shape
    # Sample corner pixels to find background color
    tl = img[5:35, 5:35]
    tr = img[5:35, -35:-5]
    bg_color = np.median(np.concatenate([tl.reshape(-1, 3), tr.reshape(-1, 3)]), axis=0)
    
    # Color distance from background
    diff = np.linalg.norm(img.astype(float) - bg_color.astype(float), axis=2)
    
    # Smooth feathering: < 14 is 0 alpha, > 32 is full alpha
    alpha = np.clip((diff - 14.0) / 18.0, 0, 1) * 255.0
    alpha = alpha.astype(np.uint8)
    
    bgra = cv2.cvtColor(img, cv2.COLOR_BGR2BGRA)
    bgra[:, :, 3] = alpha
    return bgra

def main():
    video_path = 'public/character.mp4'
    if not os.path.exists(video_path):
        video_path = 'public/Animated_character_tracking_cursor_20261004162711.mp4'
    
    print(f"Reading video: {video_path}")
    cap = cv2.VideoCapture(video_path)
    frames = []
    while True:
        ret, frame = cap.read()
        if not ret:
            break
        frames.append(frame)
    cap.release()
    print(f"Successfully loaded {len(frames)} frames.")
    
    # Construct 64 frame sequence (8 sectors of 8 frames each)
    sector_0 = [70, 73, 76, 79, 82, 85, 88, 91]         # 0..7: RIGHT -> DOWN_RIGHT
    sector_1 = [94, 98, 101, 105, 109, 113, 117, 121]    # 8..15: DOWN_RIGHT -> DOWN
    sector_2 = [124, 127, 131, 134, 138, 141, 145, 148] # 16..23: DOWN -> DOWN_LEFT
    sector_3 = [152, 156, 160, 165, 169, 173, 177, 182] # 24..31: DOWN_LEFT -> LEFT
    sector_4 = [186, 188, 190, 193, 195, 197, 200, 202] # 32..39: LEFT -> UP_LEFT
    sector_5 = [204, 206, 208, 210, 212, 43, 44, 45]     # 40..47: UP_LEFT -> UP
    sector_6 = [46, 47, 48, 50, 51, 52, 54, 55]         # 48..55: UP -> UP_RIGHT
    sector_7 = [56, 58, 60, 61, 63, 65, 67, 68]         # 56..63: UP_RIGHT -> RIGHT
    
    frame_indices_64 = sector_0 + sector_1 + sector_2 + sector_3 + sector_4 + sector_5 + sector_6 + sector_7
    
    out_dir = 'public/frames'
    os.makedirs(out_dir, exist_ok=True)
    
    quality = 92
    print("Exporting 64 transparent WebP frames...")
    for idx, f_num in enumerate(frame_indices_64):
        raw_img = frames[f_num]
        bgra = make_transparent_frame(raw_img)
        
        out_path = os.path.join(out_dir, f"{idx}.webp")
        cv2.imwrite(out_path, bgra, [cv2.IMWRITE_WEBP_QUALITY, quality])
        
        padded_path = os.path.join(out_dir, f"frame_{idx:02d}.webp")
        cv2.imwrite(padded_path, bgra, [cv2.IMWRITE_WEBP_QUALITY, quality])
    
    # Center frame (Frame 232)
    center_img = frames[232]
    center_bgra = make_transparent_frame(center_img)
    cv2.imwrite('public/center.webp', center_bgra, [cv2.IMWRITE_WEBP_QUALITY, quality])
    cv2.imwrite('public/frames/center.webp', center_bgra, [cv2.IMWRITE_WEBP_QUALITY, quality])
    
    print("Successfully exported all transparent WebP frames and center.webp!")

if __name__ == '__main__':
    main()
