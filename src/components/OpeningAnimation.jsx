import React, { useRef, useState } from 'react';
import videoSrc from '../assets/opening-animation.mp4';

/**
 * Opening Animation Video Component
 * - Pure video presentation with zero overlay, text, or blur
 * - Controls strictly hidden across all devices
 * - Clicking/tapping the screen plays the video once
 * - Freezes on final frame upon completion
 * - Color matched to eliminate any subpixel dark seams
 */
export default function OpeningAnimation({ onEnded }) {
  const videoRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);

  const handleScreenClick = () => {
    if (hasStarted) return; // Plays only for one time

    if (videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setHasStarted(true);
          })
          .catch((err) => {
            console.warn('Audio policy blocked unmuted playback, retrying muted:', err);
            if (videoRef.current) {
              videoRef.current.muted = true;
              videoRef.current.play();
              setHasStarted(true);
            }
          });
      }
    }
  };

  const handleVideoEnded = () => {
    if (onEnded) {
      onEnded();
    }
  };

  return (
    <div
      onClick={handleScreenClick}
      className="relative w-full h-full bg-[#e4b19e] select-none cursor-pointer overflow-hidden flex items-center justify-center gpu-layer"
      style={{
        transform: 'translate3d(0, 0, 0)',
        backfaceVisibility: 'hidden',
        willChange: 'transform, opacity',
      }}
    >
      <video
        ref={videoRef}
        src={videoSrc}
        playsInline
        webkit-playsinline="true"
        x5-playsinline="true"
        disablePictureInPicture
        disableRemotePlayback
        controls={false}
        loop={false}
        preload="auto"
        onEnded={handleVideoEnded}
        className="w-full h-full object-cover pointer-events-none gpu-layer"
        style={{
          width: '100%',
          height: 'calc(100% + 3px)',
          display: 'block',
        }}
      />
    </div>
  );
}
