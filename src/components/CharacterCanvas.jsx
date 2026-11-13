import { useEffect, useRef, useState } from 'react';
import {
  TOTAL_FRAMES,
  DEADZONE_RATIO,
  LERP_FACTOR,
  FACE_CENTER_X_RATIO,
  FACE_CENTER_Y_RATIO,
  lerpAngle,
  angleToFrameIndex,
} from '../utils/math';

export default function CharacterCanvas({ onStateChange }) {
  const canvasRef = useRef(null);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // References to keep RAF loop at steady 60 FPS without React re-render overhead
  const imagesRef = useRef([]);
  const centerImageRef = useRef(null);
  const smoothedAngleRef = useRef(0);
  const cursorPosRef = useRef({
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0,
    active: false,
  });
  const stateRef = useRef({
    isEyeContact: true,
    currentFrame: 'center',
    angleDeg: 0,
  });

  // Preload all 64 WebP frames and center.webp
  useEffect(() => {
    let mounted = true;
    let loadedCount = 0;
    const totalToLoad = TOTAL_FRAMES + 1; // 64 frames + center

    const checkComplete = () => {
      loadedCount++;
      if (mounted) {
        setLoadProgress(Math.round((loadedCount / totalToLoad) * 100));
        if (loadedCount >= totalToLoad) {
          setIsLoaded(true);
        }
      }
    };

    // Preload center.webp
    const centerImg = new Image();
    centerImg.src = '/center.webp';
    centerImg.onload = () => {
      centerImageRef.current = centerImg;
      checkComplete();
    };
    centerImg.onerror = () => {
      centerImg.src = '/frames/center.webp';
      checkComplete();
    };

    // Preload 64 rotation frames
    const imgs = [];
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `/frames/${i}.webp`;
      img.onload = checkComplete;
      img.onerror = () => {
        img.src = `/frames/frame_${String(i).padStart(2, '0')}.webp`;
        checkComplete();
      };
      imgs.push(img);
    }
    imagesRef.current = imgs;

    return () => {
      mounted = false;
    };
  }, []);

  // Listen to cursor / touch movement
  useEffect(() => {
    function handlePointerMove(e) {
      cursorPosRef.current = {
        x: e.clientX,
        y: e.clientY,
        active: true,
      };
    }

    function handleTouchMove(e) {
      if (e.touches && e.touches[0]) {
        cursorPosRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
          active: true,
        };
      }
    }

    function handleMouseLeave() {
      cursorPosRef.current.active = false;
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // 60 FPS requestAnimationFrame canvas rendering loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    let animationFrameId;

    function render() {
      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Ensure canvas backing store matches retina display resolution
      const targetCanvasWidth = Math.floor(width * dpr);
      const targetCanvasHeight = Math.floor(height * dpr);

      if (canvas.width !== targetCanvasWidth || canvas.height !== targetCanvasHeight) {
        canvas.width = targetCanvasWidth;
        canvas.height = targetCanvasHeight;
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      // Clear canvas cleanly to let rich red-pink gradient shine through
      ctx.clearRect(0, 0, width, height);

      // Determine available reference frame dimensions (default: 1280x720)
      const refImg = centerImageRef.current || imagesRef.current[0];
      const imgW = (refImg && refImg.naturalWidth) || 1280;
      const imgH = (refImg && refImg.naturalHeight) || 720;

      // Use a square portrait window on larger screens so the image fills
      // the right half instead of spreading across the copy column.
      const sourceX = width >= 640 ? imgW * (280 / 1280) : 0;
      const sourceW = width >= 640 ? imgW * (720 / 1280) : imgW;
      const faceCenterX = (imgW * FACE_CENTER_X_RATIO - sourceX) / sourceW;
      let drawW, drawH, drawX, drawY;
      if (width >= 992) {
        const scale = Math.max((height * 0.82) / imgH, (width * 0.43) / sourceW);
        drawW = sourceW * scale;
        drawH = imgH * scale;
        drawX = width * 0.75 - drawW * faceCenterX;
        drawY = height * 0.5 - drawH * 0.5;
      } else if (width >= 640) {
        const scale = Math.max((height * 0.82) / imgH, (width * 0.43) / sourceW);
        drawW = sourceW * scale;
        drawH = imgH * scale;
        drawX = width * 0.75 - drawW * faceCenterX;
        drawY = height * 0.46 - drawH * 0.5;
      } else {
        // Leave room for the hero copy while making the portrait easy to see.
        const scale = Math.min((width * 0.88) / imgW, (height * 0.46) / imgH);
        drawW = imgW * scale;
        drawH = imgH * scale;
        drawX = (width - drawW) / 2;
        drawY = height * 0.36 - drawH * 0.5;
      }

      const sideMargin = Math.min(24, width * 0.04);
      const topMargin = Math.min(88, height * 0.12);
      const bottomMargin = width < 640 ? 20 : 0;
      if (width < 640) {
        drawX = Math.max(sideMargin, Math.min(drawX, width - drawW - sideMargin));
        drawY = Math.max(topMargin, Math.min(drawY, height - drawH - bottomMargin));
      } else {
        ctx.beginPath();
        ctx.rect(width * 0.5, 0, width * 0.5, height);
        ctx.clip();
      }

      // Calculate character face center in screen coordinates
      const faceX = drawX + drawW * faceCenterX;
      const faceY = drawY + drawH * FACE_CENTER_Y_RATIO;

      // Cursor delta relative to face center
      const cursor = cursorPosRef.current;
      const dx = cursor.x - faceX;
      const dy = cursor.y - faceY;
      const distance = Math.hypot(dx, dy);

      // Center eye contact deadzone (~12% screen radius)
      const deadzoneRadius = Math.min(width, height) * DEADZONE_RATIO;
      const inDeadzone = !cursor.active || distance < deadzoneRadius;

      let selectedImg = null;
      let currentFrameName = 'center';
      let currentAngleDeg = 0;

      if (inDeadzone) {
        selectedImg = centerImageRef.current || imagesRef.current[0];
        currentFrameName = 'center';
        stateRef.current.isEyeContact = true;
      } else {
        stateRef.current.isEyeContact = false;

        // Angle in radians: 0 = RIGHT, PI/2 = DOWN, PI = LEFT, -PI/2 = UP
        const targetAngle = Math.atan2(dy, dx);

        // Shortest-path circular angular lerp (~0.26 factor for ~35ms zero-lag tracking)
        smoothedAngleRef.current = lerpAngle(
          smoothedAngleRef.current,
          targetAngle,
          LERP_FACTOR
        );

        // Map smoothed angle to nearest frame index [0..63]
        const frameIndex = angleToFrameIndex(smoothedAngleRef.current, TOTAL_FRAMES);
        selectedImg = imagesRef.current[frameIndex] || centerImageRef.current;
        currentFrameName = `${frameIndex}.webp`;

        currentAngleDeg = Math.round(
          (((smoothedAngleRef.current % (Math.PI * 2)) + Math.PI * 2) %
            (Math.PI * 2)) *
            (180 / Math.PI)
        );
      }

      stateRef.current.currentFrame = currentFrameName;
      stateRef.current.angleDeg = currentAngleDeg;

      // Draw EXACTLY ONE crisp frame at 100% opacity (ZERO GHOSTING)
      if (selectedImg && selectedImg.complete && selectedImg.naturalWidth > 0) {
        ctx.globalAlpha = 1.0;
        ctx.drawImage(
          selectedImg,
          sourceX,
          0,
          sourceW,
          imgH,
          drawX,
          drawY,
          drawW,
          drawH
        );
        if (width >= 640) {
          ctx.globalCompositeOperation = 'destination-in';
          const edgeFade = ctx.createLinearGradient(width * 0.5, 0, width * 0.5 + 88, 0);
          edgeFade.addColorStop(0, 'rgba(255,255,255,0)');
          edgeFade.addColorStop(1, 'rgba(255,255,255,1)');
          ctx.fillStyle = edgeFade;
          ctx.fillRect(width * 0.5, 0, width * 0.5, height);
          ctx.globalCompositeOperation = 'source-over';
        }
      }

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    }

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Periodic notification to parent
  useEffect(() => {
    if (!onStateChange) return;
    const interval = setInterval(() => {
      onStateChange({
        isEyeContact: stateRef.current.isEyeContact,
        frame: stateRef.current.currentFrame,
        angleDeg: stateRef.current.angleDeg,
        isLoaded,
        loadProgress,
      });
    }, 100);
    return () => clearInterval(interval);
  }, [onStateChange, isLoaded, loadProgress]);

  return (
    <div className="character-canvas-container">
      <canvas
        ref={canvasRef}
        className="character-canvas"
        aria-label="Interactive character head-tracking canvas"
      />

      {/* Preload progress indicator */}
      {!isLoaded && (
        <div className="canvas-loader-overlay">
          <div className="canvas-loader-card">
            <div className="loader-spinner" />
            <div className="loader-text">Loading Character Experience</div>
            <div className="loader-bar">
              <div
                className="loader-bar-fill"
                style={{ width: `${loadProgress}%` }}
              />
            </div>
            <span className="loader-percent">{loadProgress}%</span>
          </div>
        </div>
      )}
    </div>
  );
}
