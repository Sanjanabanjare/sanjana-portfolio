import { useState } from 'react';
import CharacterCanvas from './CharacterCanvas';

export default function Hero({ onStateUpdate }) {
  const [characterState, setCharacterState] = useState({
    isEyeContact: true,
    frame: 'center',
    angleDeg: 0,
    isLoaded: false,
    loadProgress: 0,
  });

  const handleStateChange = (state) => {
    setCharacterState(state);
    if (onStateUpdate) {
      onStateUpdate(state);
    }
  };

  return (
    <section className="hero-section" id="home">
      {/* 360° Zero-Lag Character Canvas (Motionless Body, Head Rotation Only) */}
      <CharacterCanvas onStateChange={handleStateChange} />

      {/* Decorative Hand-Drawn Doodles matching the uploaded reference design */}
      <div className="hero-doodles-layer" aria-hidden="true">
        {/* Heart with rays above/right of Sanjana */}
        <div className="doodle-heart-rays">
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
            <path
              d="M14 16C10 12 7 15 7 19C7 26 19 32 21 33C23 32 35 26 35 19C35 15 32 12 28 16C26 18 23 18 21 16L14 16Z"
              stroke="#ffffff"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Small accent ray lines */}
            <line x1="37" y1="17" x2="42" y2="16" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" />
            <line x1="36" y1="23" x2="41" y2="24" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" />
            <line x1="34" y1="28" x2="38" y2="30" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </div>

        {/* 3 Accent lines near character's hair */}
        <div className="doodle-accent-lines">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <line x1="12" y1="36" x2="4" y2="44" stroke="#ffffff" strokeWidth="2.6" strokeLinecap="round" />
            <line x1="20" y1="30" x2="16" y2="44" stroke="#ffffff" strokeWidth="2.6" strokeLinecap="round" />
            <line x1="28" y1="26" x2="32" y2="40" stroke="#ffffff" strokeWidth="2.6" strokeLinecap="round" />
          </svg>
        </div>

        {/* Cheek sparkle */}
        <div className="doodle-sparkle-cheek">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2C12 7.5 7.5 12 2 12C7.5 12 12 16.5 12 22C12 16.5 16.5 12 22 12C16.5 12 12 7.5 12 2Z"
              fill="#ffffff"
            />
          </svg>
        </div>

        {/* Bottom right hand-drawn heart & sparkle near shoulder */}
        <div className="doodle-bottom-right-heart">
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
            <path
              d="M20 22C15 17 11 20 11 25C11 34 26 43 29 44C32 43 47 34 47 25C47 20 43 17 38 22C35 25 32 25 29 22L20 22Z"
              stroke="#ffffff"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="doodle-sparkle-mini">✦</span>
        </div>

        {/* Stylized curved brush cradle beneath character bust */}
        <div className="character-cradle-swoosh" />
      </div>

      {/* Floating Eye Contact / Head Tracking Telemetry Pill */}
      <div className="hero-telemetry-badge" aria-live="polite">
        <span
          className={`telemetry-dot ${
            characterState.isEyeContact ? 'dot-eye-contact' : 'dot-tracking'
          }`}
        />
        <span className="telemetry-text">
          {characterState.isEyeContact
            ? 'DIRECT EYE CONTACT'
            : `TRACKING GAZE · ${characterState.angleDeg}°`}
        </span>
      </div>

      {/* Hero Typography — Exactly matching uploaded reference image */}
      <div className="hero-content-left">
        <p className="hero-eyebrow">
          <span className="eyebrow-dash" />
          DEVELOPER · CREATIVE THINKER
        </p>

        <div className="hero-headline-group">
          <span className="hero-salutation">Hi, I'm</span>
          <h1 className="hero-name-cursive">Sanjana</h1>
          <span className="hero-surname">Banjare.</span>
        </div>

        <p className="hero-bio-text">
          I build thoughtful digital experiences by combining technology,
          creativity, and curiosity.
        </p>

        <div className="hero-actions-row">
          {/* Solid white pill button */}
          <a href="#projects" className="btn-solid-pill interactive">
            <span>Explore my work</span>
            <span className="btn-arrow">↗</span>
          </a>

          {/* Frosted / translucent red pill with crisp white border */}
          <a href="#contact" className="btn-outline-pill interactive">
            <span>Let's connect</span>
          </a>
        </div>
      </div>

      {/* Bottom Status & Navigation Bar matching reference image */}
      <div className="hero-bottom-bar">
        <div className="bottom-col-left">
          <span>BASED IN INDIA</span>
        </div>

        <div className="bottom-col-center">
          <a href="#about" className="scroll-indicator interactive">
            <span className="mouse-icon">
              <span className="mouse-wheel" />
            </span>
            <span className="scroll-label">SCROLL TO EXPLORE</span>
            <span className="scroll-chevron">↓</span>
          </a>
        </div>

        <div className="bottom-col-right">
          <span>MADE WITH CURIOSITY</span>
          <span className="bottom-heart">♡</span>
        </div>
      </div>
    </section>
  );
}
