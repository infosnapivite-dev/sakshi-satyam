import React from 'react';
import paperTexture from '../assets/paper-texture.svg';

/**
 * Blank Textured Invitation Card (for Page 3 / upcoming sections)
 */
export default function BlankCard() {
  return (
    <div
      className="absolute top-[8.7%] left-1/2 -translate-x-1/2 w-[79.3%] h-[82.3%] z-20 select-none pointer-events-none gpu-layer"
      style={{
        transform: 'translate3d(-50%, 0, 0)',
        backfaceVisibility: 'hidden',
        willChange: 'transform',
      }}
    >
      <div
        className="relative w-full h-full overflow-hidden"
        style={{
          backgroundColor: '#dac8bc',
          backgroundImage: 'linear-gradient(175deg, #dfcebf 0%, #dac8bc 50%, #d4c2b6 100%)',
          borderRadius: '1px',
          border: '1px solid rgba(165, 138, 122, 0.4)',
          boxShadow: `
            0 16px 36px -6px rgba(90, 50, 38, 0.28),
            0 6px 14px -3px rgba(90, 50, 38, 0.16),
            0 1px 2px rgba(90, 50, 38, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.35),
            inset 1px 0 0 rgba(255, 255, 255, 0.2)
          `,
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-30 mix-blend-multiply"
          style={{
            backgroundImage: `url(${paperTexture})`,
            backgroundRepeat: 'repeat',
            backgroundSize: '160px 160px',
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            background: 'radial-gradient(ellipse at 50% 30%, rgba(240, 225, 215, 0.4) 0%, transparent 80%)',
          }}
        />
      </div>
    </div>
  );
}

