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
          </section>
        </main>
      </IPhoneFrame>
    </div>
  );
}
