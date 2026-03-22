import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { FaCode } from "react-icons/fa";
import { PiCodeBlockBold } from "react-icons/pi";
import { MdOutlineFileDownloadDone } from "react-icons/md";

const LoadingPage = ({onComplete}) => {
  const containerRef = useRef(null);
  const barRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
  // Logo pop animation
  gsap.from(".logo-letter", {
    scale: 0,
    rotation: -45,
    opacity: 0,
    stagger: 0.15,
    duration: 0.6,
    ease: "back.out(2)",
  });

  // Logo floating
  gsap.to(".logo-letter", {
    y: -5,
    repeat: -1,
    yoyo: true,
    duration: 1.2,
    ease: "sine.inOut",
    stagger: 0.2,
  });

  // Loading bar (2 sec)
  gsap.fromTo(
    barRef.current,
    { width: "0%" },
    {
      width: "100%",
      duration: 2,
      ease: "power1.inOut",
    }
  );

  // Floating icons
  gsap.to(".floating-icon", {
    y: -15,
    repeat: -1,
    yoyo: true,
    duration: 1.5,
    ease: "sine.inOut",
    stagger: 0.2,
  });

  // 🚀 EXIT ANIMATION
  gsap.delayedCall(1.5, () => {
    gsap.to(containerRef.current, {
      y: -100,
      opacity: 0,
      duration: 0.8,
      ease: "power2.inOut",
      onComplete: onComplete,
    });
  });

}, containerRef);


    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="w-full h-screen flex flex-col items-center justify-center gap-6 bg-yellow-400 relative overflow-hidden"
    >
      {/* Floating Icons (FIXED POSITIONS) */}

      {/* Top Left */}
      <div className="floating-icon absolute left-[10%] top-[15%] p-4 rotate-[-10deg] border-[3px] border-black rounded-xl bg-sky-400 text-3xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <FaCode />
      </div>

      {/* Top Right */}
      <div className="floating-icon absolute right-[12%] top-[20%] p-4 rotate-[8deg] border-[3px] border-black rounded-xl bg-amber-300 text-3xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <PiCodeBlockBold />
      </div>

      {/* Bottom Left */}
      <div className="floating-icon absolute left-[12%] bottom-[18%] p-4 rotate-[-6deg] border-[3px] border-black rounded-xl bg-pink-400 text-3xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <MdOutlineFileDownloadDone />
      </div>

      {/* Logo */}
      <div className="flex justify-center items-center gap-3 lg:text-5xl text-3xl z-10">
        <p className="logo-letter lg:h-20 lg:w-20 h-12 w-12 flex items-center justify-center font-black bg-[#45B1E8] border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          Y
        </p>
        <p className="logo-letter lg:h-20 lg:w-20 h-12 w-12 flex items-center justify-center font-black bg-[#FF6666] border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          J
        </p>
      </div>

      {/* Loading Bar */}
      <div className="w-48 h-3 border-2 border-black bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] overflow-hidden z-10">
        <div
          ref={barRef}
          className="h-full bg-amber-300"
          style={{ width: "0%" }}
        ></div>
      </div>
    </div>
  );
};

export default LoadingPage;