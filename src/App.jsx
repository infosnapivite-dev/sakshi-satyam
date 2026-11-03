import React, { useRef, useState } from 'react';
import IPhoneFrame from './components/Chassis/IPhoneFrame';
import OpeningAnimation from './components/OpeningAnimation';
import HomeCard from './components/HomeCard';
import EventCard from './components/EventCard';
import bgImage from './assets/background.webp';
import './styles/iphone-mockup.css';

/**
 * Main Application Shell — Sakshi & Satyam Engagement Invitation
 *
 * Sequence:
 * 1. Page 1: Opening Animation Video Page (locked, no scroll while playing)
 * 2. When video ends: Scroll is unlocked and container smoothly scrolls to Page 2
 * 3. Page 2: Home Page with Sakshi's family invitation card & SS monogram logo
 * 4. Page 3: Second Page with matching background and blank card
 */
export default function App() {
  const scrollContainerRef = useRef(null);
  const backgroundPageRef = useRef(null);
  const [isScrollable, setIsScrollable] = useState(false);

  // When video completes, unlock scroll and auto-scroll to Page 2
  const handleVideoEnded = () => {
    setIsScrollable(true);

    setTimeout(() => {
      if (backgroundPageRef.current) {
        backgroundPageRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({
          top: scrollContainerRef.current.clientHeight - 3,
          behavior: 'smooth',
        });
      }
    }, 350);
  };

  return (
    <div className="desktop-viewport-container">
      <IPhoneFrame>
        <main
          ref={scrollContainerRef}
          className="inner-app-scroll flex flex-col relative w-full h-full bg-[#e4b19e] select-none"
          style={{
            overflowY: isScrollable ? 'auto' : 'hidden',
            touchAction: isScrollable ? 'pan-y' : 'none',
            scrollBehavior: 'smooth',
          }}
        >
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
          </section>

          {/* Page 3: Second Page (Same Background + Blank Card) */}
          <section
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
        </main>
      </IPhoneFrame>
    </div>
  );
}
