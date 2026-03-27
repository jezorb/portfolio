import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Languages = () => {
  const component = useRef(null);
  const headerRef = useRef(null);
  const listRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {

      // Header animation
      gsap.from(headerRef.current, {
        y: -40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
          once: true,
        },
      });

      // 🔥 Timeline (FIX)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: listRef.current,
          start: "top 85%",
          once: true,
        },
      });

      // Container first
      tl.from(listRef.current, {
        y: 50,
        opacity: 0,
        scale: 0.96,
        duration: 0.8,
        ease: "back.out(1.6)",
      });

      // Then children stagger (no separate trigger now)
      tl.from(
        listRef.current.children,
        {
          opacity: 0,
          y: 20,
          stagger: 0.15,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.3" // overlap thoda smooth feel ke liye
      );

    }, component);

    return () => ctx.revert();
  }, []);

  return (
    <div id='languages' ref={component} className="flex flex-col gap-4 m-auto p-4 w-full h-[50vh]">
      
      <p
        ref={headerRef}
        className="text-3xl w-full md:text-4xl font-black tracking-tighter p-4 bg-amber-300 border-[3px] border-black shadow-[6px_6px_0px_black] uppercase group"
      >
        Languages
      </p>

      <ul
        ref={listRef}
        className="font-semibold p-4 flex flex-col gap-4 border-[3px] border-black shadow-[6px_6px_0px_black] h-full bg-white"
      >
        
        <li className="p-4 flex justify-between items-center gap-4 border-[3px] rounded-md border-black shadow-[3px_3px_0px_black]">
          <p className="font-bold text-lg">English</p>
          <ul className="flex gap-2 *:h-4 *:w-4 *:bg-amber-300 *:border-2 *:border-black *:shadow-[1px_1px_0px_black]">
            <li></li><li></li><li></li>
          </ul>
        </li>

        <li className="p-4 flex justify-between items-center gap-4 border-[3px] rounded-md border-black shadow-[3px_3px_0px_black]">
          <p className="font-bold text-lg">Hindi</p>
          <ul className="flex gap-2 *:h-4 *:w-4 *:bg-amber-300 *:border-2 *:border-black *:shadow-[1px_1px_0px_black]">
            <li></li><li></li><li></li>
          </ul>
        </li>

      </ul>
    </div>
  );
};

export default Languages;