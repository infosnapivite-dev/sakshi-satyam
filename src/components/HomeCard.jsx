import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import logoImg from '../assets/logo.png';
import paperTexture from '../assets/paper-texture.svg';

// Gentle luxury ease curve (velvety editorial deceleration)
const luxuryEase = [0.22, 1, 0.36, 1];

// 1. Main Card Surface Variant (Appear & Disappear)
const cardVariants = {
  hidden: {
    opacity: 0,
    scale: 0.94,
    y: 22,
    transition: {
      duration: 1.1,
      ease: luxuryEase,
    },
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 1.4,
      ease: luxuryEase,
    },
  },
};

// 2. Content Stagger Coordinator (Cascades in on appear, reverse cascades out on disappear)
const contentStaggerVariants = {
  hidden: {
    opacity: 0,
    transition: {
      staggerChildren: 0.06,
      staggerDirection: -1,
    },
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.3,
    },
  },
};

// 3. 3D Embossed SS Monogram Logo Variant
const logoVariants = {
  hidden: {
    opacity: 0,
    scale: 0.86,
    y: -16,
    transition: {
      duration: 1.0,
      ease: luxuryEase,
    },
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 1.5,
      ease: luxuryEase,
    },
  },
};

// 4. Standard Typography Elements
const textItemVariants = {
  hidden: {
    opacity: 0,
    y: 12,
    transition: {
      duration: 0.85,
      ease: luxuryEase,
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: luxuryEase,
    },
  },
};

// 5. Hero Typography Elements (Engagement & SAKSHI)
const heroTitleVariants = {
  hidden: {
    opacity: 0,
    scale: 0.93,
    y: 14,
    transition: {
      duration: 0.95,
      ease: luxuryEase,
    },
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 1.35,
      ease: luxuryEase,
    },
  },
};

// 6. Antique Gold Bottom Ornament Divider
const ornamentVariants = {
  hidden: {
    opacity: 0,
    scale: 0.75,
    transition: {
      duration: 0.85,
      ease: luxuryEase,
    },
  },
  visible: {
    opacity: 0.85,
    scale: 1,
    transition: {
      duration: 1.25,
      ease: luxuryEase,
    },
  },
};

/**
 * Home Page Invitation Card — Sakshi & Satyam
 * - Prominent SS Monogram Logo with 3D Embossed Shadows
 * - All text bold in Cormorant Garamond typography
 * - Deep wine maroon tones (#6a3d42 / #734b4f)
 * - Textured luxury cardstock base (#dac8bc)
 * - Symmetrical Framer Motion appearing and disappearing animations
 */
export default function HomeCard({ scrollContainerRef }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, {
    root: scrollContainerRef,
    amount: 0.2,
    once: false,
  });

  return (
    <div
      ref={cardRef}
      className="absolute top-[10.2%] left-1/2 -translate-x-1/2 w-[79.3%] h-[79.6%] z-20 select-none gpu-layer"
      style={{
        transform: 'translate3d(-50%, 0, 0)',
        backfaceVisibility: 'hidden',
        willChange: 'transform',
      }}
    >
      {/* Main Card Surface with Symmetrical Appear & Disappear Animations */}
      <motion.div
        className="relative w-full h-full overflow-hidden flex flex-col items-center justify-between px-3.5 sm:px-5 pt-3.5 sm:pt-6 pb-3 sm:pb-6 text-center"
        variants={cardVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
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
        {/* Fine Tactile Paper Grain Noise Layer */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30 mix-blend-multiply z-0"
          style={{
            backgroundImage: `url(${paperTexture})`,
            backgroundRepeat: 'repeat',
            backgroundSize: '160px 160px',
          }}
        />

        {/* Ambient Soft Glow Sheen */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20 z-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 30%, rgba(240, 225, 215, 0.4) 0%, transparent 80%)',
          }}
        />

        {/* Content Container with Dynamic Equilibrium Spacing Across All Viewports */}
        <motion.div
          className="relative z-10 w-full h-full flex flex-col items-center justify-between py-0.5 sm:py-1"
          variants={contentStaggerVariants}
        >
          {/* Block 1: Top Rose Gold SS Monogram Logo */}
          <motion.div
            variants={logoVariants}
            className="mt-0 sm:pt-0.5 shrink-0 flex items-center justify-center"
          >
            <img
              src={logoImg}
              alt="Sakshi & Satyam Monogram"
              loading="eager"
              fetchPriority="high"
              decoding="sync"
              className="w-[94px] sm:w-[116px] h-auto object-contain select-none pointer-events-none"
              style={{
                filter: `
                  drop-shadow(0px 1.2px 1.8px rgba(55, 22, 16, 0.5))
                  drop-shadow(1.5px 3.5px 4.5px rgba(78, 36, 25, 0.36))
                  drop-shadow(3px 7px 9px rgba(98, 48, 34, 0.24))
                  drop-shadow(4px 11px 15px rgba(115, 58, 40, 0.15))
                `,
              }}
            />
          </motion.div>

          {/* Block 2: Blessings & Host Families Block */}
          <motion.div
            variants={textItemVariants}
            className="flex flex-col items-center w-full px-1"
          >
            <motion.p
              variants={textItemVariants}
              className="font-cormorant italic font-bold text-[14px] sm:text-[16px] text-[#734b4f] leading-none mb-1"
            >
              With the blessings of
            </motion.p>

            <motion.div
              variants={textItemVariants}
              className="font-cormorant font-bold uppercase tracking-[0.04em] text-[13.5px] sm:text-[15.5px] text-[#6d4246] leading-tight text-center my-0.5"
            >
              <p>LATE SHRI SATISH KUMAR</p>
              <p className="font-cormorant italic font-bold text-[13.5px] sm:text-[15.5px] text-[#734b4f] my-0.5 normal-case">&amp;</p>
              <p>SMT. RITA KESHRI</p>
            </motion.div>

            <motion.div
              variants={textItemVariants}
              className="font-cormorant text-[15px] sm:text-[17px] text-[#72484c] leading-[1.28] font-bold mt-1.5 sm:mt-2.5 text-center"
            >
              <p>together with their loved ones,</p>
              <p>the Keshri family requests the honour of</p>
              <p>your presence at the</p>
            </motion.div>
          </motion.div>

          {/* Block 3: Hero Climax (Engagement & Bride) */}
          <div className="flex flex-col items-center w-full">
            <motion.h1
              variants={heroTitleVariants}
              className="font-cormorant font-bold text-[34px] sm:text-[42px] text-[#6a3d42] tracking-wide leading-none mb-1 sm:mb-1.5"
            >
              Engagement
            </motion.h1>

            <motion.p
              variants={textItemVariants}
              className="font-cormorant italic font-bold text-[15.5px] sm:text-[18px] text-[#734b4f] leading-none mb-1.5 sm:mb-2"
            >
              of their beloved granddaughter
            </motion.p>

            <motion.h2
              variants={heroTitleVariants}
              className="font-cormorant font-bold text-[30px] sm:text-[38px] uppercase tracking-[0.22em] text-[#6a3d42] leading-none pl-[0.22em]"
            >
              SAKSHI
            </motion.h2>
          </div>

          {/* Block 4: Lineage & Bottom Ornament */}
          <div className="flex flex-col items-center w-full px-1">
            <motion.div
              variants={textItemVariants}
              className="flex flex-col items-center gap-0.5 w-full"
            >
              <p className="font-cormorant text-[13px] sm:text-[15px] font-bold text-[#734b4f] leading-tight whitespace-nowrap">
                (D/o Mrs. Sangeeta &amp; Mr. Shekhar Keshri)
              </p>
              <p className="font-cormorant text-[13px] sm:text-[15px] font-bold text-[#734b4f] leading-tight whitespace-nowrap">
                (Sister of Shradha &amp; Shreshth Keshri)
              </p>
            </motion.div>

            {/* Delicate Antique Gold Bottom Ornament Divider */}
            <motion.div
              variants={ornamentVariants}
              className="mt-2 sm:mt-3 flex items-center justify-center gap-1.5 w-[42%] opacity-80"
            >
              <div className="h-[0.75px] flex-1 bg-gradient-to-r from-transparent via-[#bfa682] to-[#bfa682]" />
              <div className="w-[3.5px] h-[3.5px] rotate-45 bg-[#bfa682]" />
              <svg
                className="w-3 h-3 fill-[#bfa682] text-[#bfa682] shrink-0"
                viewBox="0 0 24 24"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <div className="w-[3.5px] h-[3.5px] rotate-45 bg-[#bfa682]" />
              <div className="h-[0.75px] flex-1 bg-gradient-to-l from-transparent via-[#bfa682] to-[#bfa682]" />
            </motion.div>
          </div>

        </motion.div>
      </motion.div>
    </div>
  );
}
