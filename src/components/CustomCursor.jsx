import { useEffect, useRef, useState } from 'react';

export default function CustomCursor({ isEyeContact }) {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const posRef = useRef({ x: -100, y: -100 });
  const ringPosRef = useRef({ x: -100, y: -100 });
  const hoverCenterRef = useRef(null);

  useEffect(() => {
    // Check if device supports fine pointer (mouse/trackpad)
    if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    let rafId;

    function onPointerMove(e) {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Check if hovering over interactive element
      const target = e.target;
      const interactive = target?.closest(
        'a, button, .interactive, [data-cursor="hover"], input, textarea, select'
      );
      if (interactive) {
        setIsHovering(true);
        const bounds = interactive.getBoundingClientRect();
        hoverCenterRef.current = {
          x: bounds.left + bounds.width / 2,
          y: bounds.top + bounds.height / 2,
        };
      } else {
        setIsHovering(false);
        hoverCenterRef.current = null;
      }
    }

    function onMouseLeave() {
      setIsVisible(false);
      hoverCenterRef.current = null;
    }

    function onMouseEnter() {
      setIsVisible(true);
    }

    function loop() {
      // Lerp aura ring position for buttery trailing physics
      const hoverCenter = hoverCenterRef.current;
      let ringTargetX = posRef.current.x;
      let ringTargetY = posRef.current.y;
      if (hoverCenter) {
        const dx = hoverCenter.x - posRef.current.x;
        const dy = hoverCenter.y - posRef.current.y;
        const distance = Math.hypot(dx, dy) || 1;
        const pull = Math.min(6, distance * 0.045);
        ringTargetX += (dx / distance) * pull;
        ringTargetY += (dy / distance) * pull;
      }
      const factor = hoverCenter ? 0.18 : 0.22;
      ringPosRef.current.x += (ringTargetX - ringPosRef.current.x) * factor;
      ringPosRef.current.y += (ringTargetY - ringPosRef.current.y) * factor;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0) translate(-50%, -50%)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPosRef.current.x}px, ${ringPosRef.current.y}px, 0) translate(-50%, -50%)`;
      }

      rafId = requestAnimationFrame(loop);
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(rafId);
    };
  }, [isVisible]);

  return (
    <div
      className={`custom-cursor-wrap ${isVisible ? 'visible' : ''} ${
        isHovering ? 'hovering' : ''
      } ${isEyeContact ? 'eye-contact' : ''}`}
      aria-hidden="true"
    >
      {/* Sharp glowing white inner dot */}
      <div ref={dotRef} className="cursor-dot" />

      {/* Trailing soft aura ring */}
      <div ref={ringRef} className="cursor-aura-ring">
        {isEyeContact && <span className="cursor-eye-beacon" />}
      </div>
    </div>
  );
}
