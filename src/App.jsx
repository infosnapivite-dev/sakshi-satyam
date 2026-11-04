import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Lenis from 'lenis';
import IPhoneFrame from './components/Chassis/IPhoneFrame';
import OpeningAnimation from './components/OpeningAnimation';
import HomeCard from './components/HomeCard';
import EventCard from './components/EventCard';
import bgImage from './assets/background.webp';
import './styles/iphone-mockup.css';

/**
 * Main Application Shell — Sakshi & Satyam Engagement Invitation
 *
 * Smooth Scrolling powered by Lenis:
 * 1. Page 1: Opening Animation Video Page (locked, no scroll while playing)
 * 2. When video ends: Scroll is unlocked and Lenis smoothly glides to Page 2
 * 3. User Scrolling: Full momentum, silky inertia smooth scroll between all cards via Lenis
 */
export default function App() {
  const scrollContainerRef = useRef(null);
  const contentWrapperRef = useRef(null);
  const backgroundPageRef = useRef(null);
  const eventPageRef = useRef(null);
  const lenisRef = useRef(null);
  const [isScrollable, setIsScrollable] = useState(false);

  // Initialize Lenis Smooth Scroll Engine
  useEffect(() => {
    const container = scrollContainerRef.current;
    const content = contentWrapperRef.current;
    if (!container || !content) return;

    const lenis = new Lenis({
      wrapper: container,
      content: content,
      smoothWheel: true,
      syncTouch: true,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      touchMultiplier: 1.35,
    });

    lenisRef.current = lenis;

    // Lock scrolling initially while video animation is playing
    lenis.stop();

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Keep Lenis dimensions updated on viewport resize
    const handleResize = () => {
      lenis.resize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // When video completes, transition to Page 2 smoothly via Lenis
  const handleVideoEnded = () => {
    // 1. Brief elegant pause on the open envelope (500ms)
    setTimeout(() => {
      setIsScrollable(true);
      const lenis = lenisRef.current;
      const targetElement = backgroundPageRef.current;

      if (lenis) {
        lenis.resize();
        lenis.start();

        if (targetElement) {
          // Velvety ease-in-out cubic glide to Page 2 driven by Lenis
          lenis.scrollTo(targetElement, {
            duration: 1.4,
            easing: (t) =>
              t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
          });
        }
      }
    }, 500);
  };

  // Smoothly scroll down from Home Page to Event Details Page (Page 3)
  const scrollToEventPage = () => {
    const lenis = lenisRef.current;
    const targetElement = eventPageRef.current;

    if (lenis && targetElement) {
      lenis.scrollTo(targetElement, {
        duration: 1.3,
        easing: (t) =>
          t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
      });
    } else if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="desktop-viewport-container">
      <IPhoneFrame>
        <main
          ref={scrollContainerRef}
          className="inner-app-scroll relative w-full h-full bg-[#e4b19e] select-none"
          style={{
            overflowY: isScrollable ? 'auto' : 'hidden',
            touchAction: isScrollable ? 'pan-y' : 'none',
          }}
        >
          {/* Unified Content Wrapper for Lenis Smooth Scroll Engine */}
          <div ref={contentWrapperRef} className="flex flex-col relative w-full min-h-full">
            {/* Page 1: Opening Animation Video View */}
            <div className="relative w-full h-full min-h-full shrink-0 basis-full overflow-hidden bg-[#e4b19e]">
              <OpeningAnimation onEnded={handleVideoEnded} />
            </div>

            {/* Page 2: Home Page (Background + Sakshi's Family Invitation Card) */}
            <section
              ref={backgroundPageRef}
              className="relative z-10 w-full h-full min-h-full shrink-0 basis-full -mt-[3px] overflow-hidden bg-[#e4b19e] gpu-layer"
              style={{
                transform: 'translate3d(0, 0, 0)',
                backfaceVisibility: 'hidden',
                height: 'calc(100% + 3px)',
              }}
            >
              {/* Background Image */}
              <img
                src={bgImage}
                alt="Engagement Invitation Background"
                loading="eager"
                fetchPriority="high"
                decoding="sync"
                className="w-full h-full object-cover object-center pointer-events-none select-none gpu-layer block"
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'block',
                }}
              />

              {/* Home Page Invitation Card */}
              <HomeCard scrollContainerRef={scrollContainerRef} />

              {/* Elegant Scroll Down Indication (Bottom Center of Home Page) */}
              <div className="absolute bottom-2.5 sm:bottom-4 left-1/2 -translate-x-1/2 z-30 pointer-events-auto select-none">
                <motion.button
                  type="button"
                  onClick={scrollToEventPage}
                  initial={{ opacity: 0, y: 8 }}
                  animate={
                    isScrollable
                      ? {
                          opacity: 1,
                          y: [0, -3.5, 0],
                        }
                      : { opacity: 0, y: 8 }
                  }
                  transition={{
                    opacity: { delay: 0.8, duration: 0.8 },
                    y: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' },
                  }}
                  aria-label="Scroll down to view event details"
                  className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-[#fbf6f0]/85 hover:bg-[#fbf6f0] backdrop-blur-md border border-[#80484e]/20 shadow-[0_3px_12px_rgba(102,48,55,0.14)] cursor-pointer group transition-all duration-200 active:scale-95"
                >
                  <motion.svg
                    animate={{ y: [0, 2.5, 0] }}
                    transition={{ duration: 1.3, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-4 h-4 text-[#80484e] group-hover:text-[#52252a] transition-colors"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </motion.svg>
                </motion.button>
              </div>
            </section>

            {/* Page 3: Second Page (Event Itinerary Card) */}
            <section
              ref={eventPageRef}
              className="relative z-10 w-full h-full min-h-full shrink-0 basis-full -mt-[3px] overflow-hidden bg-[#e4b19e] gpu-layer"
              style={{
                transform: 'translate3d(0, 0, 0)',
                backfaceVisibility: 'hidden',
                height: 'calc(100% + 3px)',
              }}
            >
              {/* Background Image */}
              <img
                src={bgImage}
                alt="Engagement Invitation Background"
                loading="eager"
                fetchPriority="high"
                decoding="sync"
                className="w-full h-full object-cover object-center pointer-events-none select-none gpu-layer block"
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'block',
                }}
              />

              {/* Event Itinerary Card */}
              <EventCard scrollContainerRef={scrollContainerRef} />

              {/* Minimal Snapivite Instagram Redirect Link (Bottom Center of Event Page) */}
              <div className="absolute bottom-2.5 sm:bottom-3.5 left-1/2 -translate-x-1/2 z-30 pointer-events-auto select-none">
                <a
                  href="https://www.instagram.com/snapivite/"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Follow Snapivite on Instagram"
                  className="inline-flex items-center gap-1.5 text-[#80484e]/75 hover:text-[#52252a] hover:opacity-100 transition-all duration-300 no-underline group cursor-pointer py-1 px-2.5"
                >
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-3 h-3 text-[#80484e]/80 group-hover:text-[#52252a] transition-colors"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                  <span className="font-cormorant text-[12.5px] sm:text-[13.5px] font-semibold tracking-[0.14em] lowercase">
                    snapivite
                  </span>
                </a>
              </div>
            </section>
          </div>
        </main>
      </IPhoneFrame>
    </div>
  );
}
