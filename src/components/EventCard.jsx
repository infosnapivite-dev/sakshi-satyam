import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import paperTexture from '../assets/paper-texture.svg';
import sakshiTitleImg from '../assets/sakshi-title.png';
import ampersandDividerImg from '../assets/ampersand-divider.png';
import satyamTitleImg from '../assets/satyam-title.png';

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

// 3. Hero Names Typography (SAKSHI & SATYAM)
const heroTitleVariants = {
  hidden: {
    opacity: 0,
    scale: 0.94,
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

// 4. Ampersand Flourish Divider
const flourishVariants = {
  hidden: {
    opacity: 0,
    scaleX: 0.6,
    transition: {
      duration: 0.85,
      ease: luxuryEase,
    },
  },
  visible: {
    opacity: 0.85,
    scaleX: 1,
    transition: {
      duration: 1.25,
      ease: luxuryEase,
    },
  },
};

// 5. Standard Text Elements (Dates, Venue Lines)
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

// 6. Timeline Container
const timelineContainerVariants = {
  hidden: {
    opacity: 0,
    y: 14,
    transition: {
      duration: 0.85,
      ease: luxuryEase,
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.25,
      ease: luxuryEase,
    },
  },
};

// 7. Timeline Line-Art Icons
const iconSlideVariants = {
  hidden: {
    opacity: 0,
    x: -10,
    scale: 0.75,
    transition: {
      duration: 0.8,
      ease: luxuryEase,
    },
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 1.15,
      ease: luxuryEase,
    },
  },
};

// 8. Vertical Gold Divider (Grows downward smoothly, recedes upward on exit)
const verticalLineVariants = {
  hidden: {
    scaleY: 0,
    opacity: 0,
    transition: {
      duration: 0.95,
      ease: luxuryEase,
    },
  },
  visible: {
    scaleY: 1,
    opacity: 1,
    transition: {
      duration: 1.4,
      ease: luxuryEase,
    },
  },
};

// 9. Timeline Event Detail Items
const eventDetailSlideVariants = {
  hidden: {
    opacity: 0,
    x: 10,
    transition: {
      duration: 0.8,
      ease: luxuryEase,
    },
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.15,
      ease: luxuryEase,
    },
  },
};

// 10. Map Pin Icon
const pinVariants = {
  hidden: {
    opacity: 0,
    scale: 0.4,
    y: -6,
    transition: {
      duration: 0.75,
      ease: luxuryEase,
    },
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 1.1,
      ease: luxuryEase,
    },
  },
};

// 11. Antique Gold Bottom Ornament Divider
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

// 12. Bottom Tagline
const taglineVariants = {
  hidden: {
    opacity: 0,
    scale: 0.94,
    y: 10,
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

/**
 * Event / Itinerary Card (Page 2 Card) — Sakshi & Satyam
 * - Prominent, bold Cormorant Garamond typography
 * - Couple names header with stylized ampersand flourish
 * - Sunday, 13TH DECEMBER 2026
 * - Event timeline with Diya (Tilak), Rings (Engagement), and Cutlery (Dinner) beside a vertical gold divider
 * - Location pin & Poolside, Hotel Maurya, Patna
 * - Antique gold heart ornament
 * - "Reflections of our love" tagline
 * - Symmetrical Framer Motion appearing and disappearing animations
 */
export default function EventCard({ scrollContainerRef }) {
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
        className="relative w-full h-full overflow-hidden flex flex-col items-center justify-between px-4 sm:px-5 pt-5 sm:pt-6 pb-5 sm:pb-6 text-center"
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
          className="relative z-10 w-full h-full flex flex-col items-center justify-between py-1.5 sm:py-2 text-center"
          variants={contentStaggerVariants}
        >
          {/* 1. Header Block: Couple Names & Flourish */}
          <div
            className="flex flex-col items-center w-full"
            role="heading"
            aria-level="1"
            aria-label="Sakshi and Satyam"
          >
            {/* Bride Name: SAKSHI with connected SH ligature */}
            <motion.img
              variants={heroTitleVariants}
              src={sakshiTitleImg}
              alt="Sakshi"
              className="w-[112px] sm:w-[122px] h-auto object-contain select-none pointer-events-none drop-shadow-sm mx-auto"
              draggable="false"
            />

            {/* Ampersand Flourish Divider with delicate lines and hearts */}
            <motion.img
              variants={flourishVariants}
              src={ampersandDividerImg}
              alt="&"
              className="w-[146px] sm:w-[158px] h-auto object-contain my-0.5 sm:my-1 opacity-90 select-none pointer-events-none origin-center mx-auto"
              draggable="false"
            />

            {/* Groom Name: SATYAM with looped M terminal */}
            <motion.img
              variants={heroTitleVariants}
              src={satyamTitleImg}
              alt="Satyam"
              className="w-[122px] sm:w-[132px] h-auto object-contain select-none pointer-events-none drop-shadow-sm mx-auto"
              draggable="false"
            />
          </div>

          {/* 2. Date Section (Bold & Staggered) */}
          <motion.div
            variants={textItemVariants}
            className="flex flex-col items-center gap-1 sm:gap-1.5"
          >
            <motion.p
              variants={textItemVariants}
              className="font-cormorant font-bold text-[19px] sm:text-[21px] text-[#80484e] tracking-wide leading-none"
            >
              Sunday
            </motion.p>
            <motion.h2
              variants={textItemVariants}
              className="font-cormorant font-bold uppercase tracking-[0.08em] text-[18px] sm:text-[19.5px] text-[#80484e] leading-none"
            >
              13<span className="text-[12px] sm:text-[13px] align-super uppercase font-bold">th</span> DECEMBER 2026
            </motion.h2>
          </motion.div>

          {/* Timeline Grid: Icons | Vertical Divider | Event Details */}
          <motion.div
            variants={timelineContainerVariants}
            className="w-full flex items-center justify-center py-0.5"
          >
            <div className="flex items-center justify-center gap-4 max-w-[295px]">
              
              {/* Left Column: 3 Line-Art Icons */}
              <div className="flex flex-col items-center justify-between h-[122px] sm:h-[126px] text-[#80484e]">
                
                {/* 1. Diya / Sacred Aarti Lamp for Tilak */}
                <motion.div
                  variants={iconSlideVariants}
                  className="w-6 h-6 flex items-center justify-center"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-[25px] h-[25px]"
                    fill="none"
                    stroke="#80484e"
                    strokeWidth="1.6"
                  >
                    {/* Sacred Flame */}
                    <path
                      d="M12 2c-.9 2-1.8 3.5-1.8 5 0 1.2.8 2.2 1.8 2.2s1.8-1 1.8-2.2C13.8 5.5 12.9 4 12 2z"
                      fill="#80484e"
                      stroke="none"
                    />
                    {/* Lamp Lip */}
                    <path d="M4.5 13.5h15" strokeLinecap="round" />
                    {/* Diya Bowl */}
                    <path
                      d="M5.5 13.5c.8 3.2 3.5 4.5 6.5 4.5s5.7-1.3 6.5-4.5"
                      strokeLinecap="round"
                    />
                    {/* Pedestal Stand */}
                    <path d="M10 18v2.5M14 18v2.5" strokeLinecap="round" />
                    <path d="M8 20.5h8" strokeLinecap="round" />
                  </svg>
                </motion.div>

                {/* 2. Interlocking Wedding Rings for Engagement */}
                <motion.div
                  variants={iconSlideVariants}
                  className="w-6 h-6 flex items-center justify-center"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-[26px] h-[26px]"
                    fill="none"
                    stroke="#80484e"
                    strokeWidth="1.6"
                  >
                    {/* Ring 1 (with diamond) */}
                    <circle cx="9" cy="14" r="5" strokeLinecap="round" />
                    {/* Solitaire diamond atop Ring 1 */}
                    <path
                      d="M9 7.2l-1.5 1.8h3z"
                      fill="#80484e"
                      stroke="none"
                    />
                    {/* Ring 2 (interlocking) */}
                    <circle cx="15.5" cy="14" r="5" strokeLinecap="round" />
                  </svg>
                </motion.div>

                {/* 3. Fork & Knife for Dinner */}
                <motion.div
                  variants={iconSlideVariants}
                  className="w-6 h-6 flex items-center justify-center"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-[23px] h-[23px]"
                    fill="#80484e"
                    stroke="#80484e"
                    strokeWidth="0.6"
                  >
                    {/* Fork */}
                    <path d="M7 3v6a1.5 1.5 0 0 0 1.5 1.5V20a1 1 0 0 0 2 0v-9.5A1.5 1.5 0 0 0 12 9V3h-1v5h-1V3H9v5H8V3H7z" />
                    {/* Knife */}
                    <path d="M15 3c-1.8 0-2.5 2.5-2.5 6v2a1.5 1.5 0 0 0 1.5 1.5V20a1 1 0 0 0 2 0V3h-1z" />
                  </svg>
                </motion.div>

              </div>

              {/* Center Vertical Gold Divider Line (Grows downward smoothly) */}
              <motion.div
                variants={verticalLineVariants}
                className="w-[1.2px] h-[126px] sm:h-[132px] bg-gradient-to-b from-[#d5bea0]/40 via-[#bfa682] to-[#d5bea0]/40 shrink-0 origin-top"
              />

              {/* Right Column: Event Titles & Timings */}
              <div className="flex flex-col justify-between text-left h-[126px] sm:h-[132px]">
                
                {/* 1. Tilak */}
                <motion.div
                  variants={eventDetailSlideVariants}
                  className="flex flex-col leading-tight"
                >
                  <h3 className="font-cormorant font-bold uppercase tracking-[0.06em] text-[17px] sm:text-[18.5px] text-[#80484e]">
                    TILAK
                  </h3>
                  <span className="font-cormorant font-bold text-[15.5px] sm:text-[16.5px] text-[#80484e]">
                    5:00 pm
                  </span>
                </motion.div>

                {/* 2. Engagement */}
                <motion.div
                  variants={eventDetailSlideVariants}
                  className="flex flex-col leading-tight"
                >
                  <h3 className="font-cormorant font-bold uppercase tracking-[0.06em] text-[17px] sm:text-[18.5px] text-[#80484e]">
                    ENGAGEMENT
                  </h3>
                  <span className="font-cormorant font-bold text-[15.5px] sm:text-[16.5px] text-[#80484e]">
                    7:00 pm
                  </span>
                </motion.div>

                {/* 3. Followed by dinner */}
                <motion.div
                  variants={eventDetailSlideVariants}
                  className="flex flex-col leading-tight"
                >
                  <span className="font-cormorant italic font-bold text-[17px] sm:text-[18.5px] text-[#80484e]">
                    Followed by dinner
                  </span>
                </motion.div>

              </div>

            </div>
          </motion.div>

          {/* 4. Venue Destination Section (Clickable Google Maps link) */}
          <motion.a
            href="https://maps.google.com/?q=Hotel+Maurya,+Patna"
            target="_blank"
            rel="noopener noreferrer"
            title="Open Hotel Maurya, Patna in Google Maps"
            variants={textItemVariants}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex flex-col items-center text-center group cursor-pointer no-underline focus:outline-none transition-transform select-none gap-0.5 sm:gap-1"
          >
            {/* Map Pin Icon */}
            <motion.div
              variants={pinVariants}
              className="text-[#80484e] group-hover:scale-115 group-hover:text-[#52252a] transition-all duration-200"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-[22px] h-[22px] fill-[#80484e] text-[#80484e]"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
            </motion.div>
            <motion.p
              variants={textItemVariants}
              className="font-cormorant font-bold text-[17.5px] sm:text-[19px] text-[#80484e] group-hover:text-[#52252a] group-hover:underline underline-offset-4 decoration-[#bfa682]/60 transition-colors leading-tight whitespace-nowrap"
            >
              Poolside, Hotel Maurya,
            </motion.p>
            <motion.p
              variants={textItemVariants}
              className="font-cormorant font-bold text-[17.5px] sm:text-[19px] text-[#80484e] group-hover:text-[#52252a] group-hover:underline underline-offset-4 decoration-[#bfa682]/60 transition-colors leading-tight"
            >
              Patna
            </motion.p>
          </motion.a>

          {/* 5. Delicate Antique Gold Bottom Ornament Divider */}
          <motion.div
            variants={ornamentVariants}
            className="flex items-center justify-center gap-1.5 w-[140px] opacity-80"
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

          {/* 6. Bottom Tagline */}
          <motion.div
            variants={taglineVariants}
          >
            <p className="font-cormorant font-bold text-[22px] sm:text-[24px] text-[#80484e] tracking-wide leading-none">
              Reflections of our love
            </p>
          </motion.div>

        </motion.div>
      </motion.div>
    </div>
  );
}
