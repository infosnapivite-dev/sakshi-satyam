import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import logoImg from '../assets/logo.png';
import paperTexture from '../assets/paper-texture.svg';
import sakshiTitleImg from '../assets/sakshi-title.png';

// Gentle luxury ease curve (velvety editorial deceleration)
const luxuryEase = [0.16, 1, 0.3, 1];

// 1. Main Card Surface Variant (Appear & Disappear)
const cardVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 28,
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
      duration: 1.7,
      ease: luxuryEase,
    },
  },
};

// 2. Content Stagger Coordinator (Cascades in on appear, reverse cascades out on disappear)
const contentStaggerVariants = {
  hidden: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.35,
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
    amount: 0.35,
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
        className="relative w-full h-full overflow-hidden flex flex-col items-center justify-between px-3 sm:px-5 pt-5 sm:pt-6 pb-5 sm:pb-6 text-center"
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

        {/* Content Container with Cascading Staggered Children — Equal Balanced Gap Between All Lines */}
        <motion.div
          className="relative z-10 w-full h-full flex flex-col items-center justify-between py-1 sm:py-2 text-center"
          variants={contentStaggerVariants}
        >
          {/* 1. Top Rose Gold SS Monogram Logo with 3D Embossed Paper Shadow */}
          <motion.div
            variants={logoVariants}
            className="shrink-0 flex items-center justify-center"
          >
            <img
              src={logoImg}
              alt="Sakshi & Satyam Monogram"
              loading="eager"
              fetchPriority="high"
              decoding="sync"
              className="w-[100px] sm:w-[108px] h-auto object-contain select-none pointer-events-none"
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

          {/* 2. Blessing Intro Line */}
          <motion.p
            variants={textItemVariants}
            className="font-cormorant italic font-bold text-[17.5px] sm:text-[19.5px] text-[#80484e] leading-none text-center"
          >
            With the blessings of
          </motion.p>

          {/* 3. Grandparents Names */}
          <motion.div
            variants={textItemVariants}
            className="font-cormorant font-bold uppercase tracking-[0.04em] text-[16.5px] sm:text-[18px] text-[#80484e] leading-tight text-center flex flex-col items-center"
          >
            <p className="whitespace-nowrap">LATE SHRI SATISH KR. KESHRI</p>
            <p className="font-cormorant italic font-bold text-[16px] sm:text-[17.5px] text-[#80484e] my-0.5 sm:my-1 normal-case leading-tight">&amp;</p>
            <p className="whitespace-nowrap">SMT. RITA KESHRI</p>
          </motion.div>

          {/* 4. Host Family Request — Strictly 3 Rows */}
          <motion.div
            variants={textItemVariants}
            className="font-cormorant text-[16.5px] sm:text-[18px] text-[#80484e] leading-[1.32] font-bold text-center flex flex-col items-center"
          >
            <p className="whitespace-nowrap">together with their loved ones,</p>
            <p className="whitespace-nowrap">the Keshri family requests the honour of</p>
            <p className="whitespace-nowrap">your presence at the</p>
          </motion.div>

          {/* 5. Event Climax: Engagement */}
          <motion.h1
            variants={heroTitleVariants}
            className="font-cormorant font-bold text-[25px] sm:text-[28px] text-[#80484e] tracking-wide leading-none text-center"
          >
            Engagement
          </motion.h1>

          {/* 6. Granddaughter Subtitle */}
          <motion.p
            variants={textItemVariants}
            className="font-cormorant italic font-bold text-[16.5px] sm:text-[18px] text-[#80484e] leading-none text-center"
          >
            of their beloved granddaughter
          </motion.p>

          {/* 7. Bride Name: SAKSHI with connected SH ligature matching Reference */}
          <motion.div
            variants={heroTitleVariants}
            className="flex items-center justify-center w-full"
          >
            <img
              src={sakshiTitleImg}
              alt="Sakshi"
              className="w-[108px] sm:w-[116px] h-auto object-contain select-none pointer-events-none drop-shadow-sm mx-auto"
              draggable="false"
            />
          </motion.div>

          {/* 8. Lineage Block (Parents & Siblings) — Reduced Intimate Gap */}
          <motion.div
            variants={textItemVariants}
            className="flex flex-col items-center gap-1 sm:gap-1.5 w-full"
          >
            <p className="font-cormorant text-[16px] sm:text-[17.5px] font-bold text-[#80484e] leading-tight text-center whitespace-nowrap">
              (D/o Mrs. Sangeeta &amp; Mr. Shekhar Keshri)
            </p>
            <p className="font-cormorant text-[16px] sm:text-[17.5px] font-bold text-[#80484e] leading-tight text-center whitespace-nowrap">
              (Sister of Shradha &amp; Shreshth Keshri)
            </p>
          </motion.div>

          {/* 10. Delicate Antique Gold Bottom Ornament Divider */}
          <motion.div
            variants={ornamentVariants}
            className="flex items-center justify-center gap-1.5 w-[42%] opacity-80"
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

        </motion.div>
      </motion.div>
    </div>
  );
}
