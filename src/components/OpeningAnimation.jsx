import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import videoSrc from '../assets/opening-animation.mp4';
import waxSealImg from '../assets/wax-seal-maroon.png';

/**
 * Synthesizes a crisp, physical wax-seal crack/snap sound via Web Audio API.
 * Requires zero external audio files and triggers with zero latency.
 */
function playWaxCrackSound() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    const now = ctx.currentTime;

    // 1. Crisp initial crack/pop (damped oscillator)
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(680, now);
    osc.frequency.exponentialRampToValueAtTime(110, now + 0.08);

    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.09);

    // 2. Parchment / wax peel rustle (bandpass filtered noise burst)
    const bufferSize = Math.floor(ctx.sampleRate * 0.09);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1600, now);
    filter.Q.setValueAtTime(3.0, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.22, now + 0.02);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noise.start(now + 0.015);
  } catch (e) {
    // Audio is a purely optional enhancement; gracefully ignore if blocked
  }
}

// Framer motion variants for the physical wax seal removal
const sealVariants = {
  idle: {
    scale: 1,
    y: 0,
    rotate: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
  hover: {
    scale: 1.06,
    y: -3,
    transition: {
      duration: 0.22,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  tap: {
    scale: 0.94,
    y: 1,
    transition: {
      duration: 0.08,
    },
  },
  break: {
    scale: [0.94, 1.18, 1.38],
    y: [1, -16, -42],
    rotate: [0, -10, -22],
    opacity: [1, 0.92, 0],
    filter: [
      'drop-shadow(0 10px 20px rgba(90, 55, 45, 0.45)) blur(0px)',
      'drop-shadow(0 20px 35px rgba(90, 55, 45, 0.5)) blur(1px)',
      'drop-shadow(0 25px 45px rgba(90, 55, 45, 0)) blur(8px)',
    ],
    transition: {
      duration: 0.48,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/**
 * Opening Animation Video Component with Interactive Wax Seal
 * - Displays the closed envelope with a photorealistic 3D Rose/Terracotta (#ae8273) Wax Seal
 * - Features the couple's monogram logo embossed in antique gold
 * - User clicks/taps the seal to break/peel it off with lifelike physics & audio
 * - Seamlessly transitions into playing the opening animation video
 * - Freezes on final frame upon completion and triggers onEnded()
 */
export default function OpeningAnimation({ onEnded }) {
  const videoRef = useRef(null);
  const [isBreaking, setIsBreaking] = useState(false);
  const [isSealRemoved, setIsSealRemoved] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  // Prime and preload video on iOS immediately when mounted
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.defaultMuted = true;
      videoRef.current.load();
    }
  }, []);

  const handleBreakSeal = (e) => {
    if (e) e.stopPropagation();
    if (isBreaking || hasStarted) return;

    setIsBreaking(true);
    playWaxCrackSound();

    // CRITICAL FOR IOS: Call play() synchronously inside the user touch/click event handler.
    // iOS Safari revokes media playback permissions if play() is deferred into a setTimeout callback!
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.defaultMuted = true;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setHasStarted(true);
          })
          .catch((err) => {
            console.warn('Playback error:', err);
          });
      }
    }

    // Remove seal from DOM after break animation completes
    setTimeout(() => {
      setIsSealRemoved(true);
    }, 480);
  };

  const handleVideoEnded = () => {
    if (onEnded) {
      onEnded();
    }
  };

  return (
    <div
      onClick={handleBreakSeal}
      className="relative w-full h-full bg-[#e4b19e] select-none cursor-pointer overflow-hidden flex items-center justify-center gpu-layer"
      style={{
        transform: 'translate3d(0, 0, 0)',
        backfaceVisibility: 'hidden',
        willChange: 'transform, opacity',
      }}
    >
      {/* Opening Envelope Video */}
      <video
        ref={videoRef}
        src={videoSrc}
        muted
        defaultMuted
        playsInline
        webkit-playsinline="true"
        x5-playsinline="true"
        disablePictureInPicture
        disableRemotePlayback
        controls={false}
        loop={false}
        preload="auto"
        autoPlay={false}
        onEnded={handleVideoEnded}
        className="w-full h-full object-cover pointer-events-none gpu-layer"
        style={{
          width: '100%',
          height: 'calc(100% + 3px)',
          display: 'block',
        }}
      />

      {/* Red Maroon Wax Seal Overlay with Logo */}
      <AnimatePresence>
        {!isSealRemoved && (
          <div
            className="absolute inset-0 pointer-events-none z-20 flex flex-col items-center justify-center"
            style={{
              perspective: '1000px',
            }}
          >
            {/* Wax Seal Positioning Container — Exactly Centered on Flap Junction */}
            <div
              className="absolute pointer-events-auto cursor-pointer flex items-center justify-center select-none"
              style={{
                left: '50%',
                top: '63.8%',
                transform: 'translate(-50%, -50%)',
                width: '118px',
                height: '118px',
              }}
            >
              <motion.div
                onClick={handleBreakSeal}
                variants={sealVariants}
                initial="idle"
                animate={isBreaking ? 'break' : 'idle'}
                whileHover={!isBreaking ? 'hover' : undefined}
                whileTap={!isBreaking ? 'tap' : undefined}
                className="relative w-full h-full flex items-center justify-center select-none"
                aria-label="Break seal to open invitation"
                role="button"
              >
                {/* Ultra-realistic 3D Wax Seal Image */}
                <img
                  src={waxSealImg}
                  alt="Sakshi & Satyam Royal Wax Seal"
                  className="w-full h-full object-contain pointer-events-none select-none drop-shadow-[0_12px_24px_rgba(80,45,38,0.44)]"
                  draggable="false"
                />

                {/* Ambient Pulsing Glow around Seal (idle only) */}
                {!isBreaking && (
                  <motion.div
                    animate={{
                      scale: [1, 1.08, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#ae8273]/30 via-[#d4a359]/25 to-transparent blur-md pointer-events-none -z-10"
                  />
                )}
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
