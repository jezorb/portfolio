import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const MaskWrapper = ({ children }) => {
  const cursorRef = useRef(null);

  useEffect(() => {
    // 1. Mouse move tracking (Optimized with GSAP)
    const xSet = gsap.quickSetter(cursorRef.current, "x", "px");
    const ySet = gsap.quickSetter(cursorRef.current, "y", "px");

    const moveCursor = (e) => {
      xSet(e.clientX);
      ySet(e.clientY);
    };

    // 2. Global Hover Logic for all your components
    const handleMouseOver = (e) => {
      // Ye selector tere saare components (Hero, Skills, Terminal, Projects) ko cover karega
      const isHoverable = e.target.closest(
        'button, a, li, .skill-pill, .group, input, .timeline-item, .map-btn, .nav-item, .logo-letter'
      );
      
      if (isHoverable) {
        gsap.to(cursorRef.current, {
          scale: 4,
          backgroundColor: "white",
          duration: 0.3,
          ease: "power2.out"
        });
      }
    };

    const handleMouseOut = (e) => {
      const isHoverable = e.target.closest(
        'button, a, li, .skill-pill, .group, input, .timeline-item, .map-btn, .nav-item, .logo-letter'
      );
      
      if (isHoverable) {
        gsap.to(cursorRef.current, {
          scale: 1,
          backgroundColor: "white", // Mix-blend handle karega color
          duration: 0.3,
          ease: "power2.out"
        });
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Custom Cursor:
         - mix-blend-difference: Text aur colors ko invert karega (Spotlight feel)
         - z-[9999]: Sabse upar rahega
      */}
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 w-6 h-6 rounded-full border-2 border-black pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
        style={{ transform: 'translate(-50%, -50%)', left: 0, top: 0 }}
      >
        <div className="w-1 h-1 bg-black rounded-full"></div>
      </div>

      {/* Main Content (Layout) */}
      <div className="relative">
        {children}
      </div>
    </div>
  );
};

export default MaskWrapper;