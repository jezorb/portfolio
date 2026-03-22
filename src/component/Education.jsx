import React, { useLayoutEffect, useRef } from 'react'
import { MdLocationPin } from "react-icons/md";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Education = () => {
  const component = useRef(null);
  const headerRef = useRef(null);
  const contentRef = useRef(null);

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

      // Content box animation
      gsap.from(contentRef.current, {
        y: 50,
        opacity: 0,
        scale: 0.96,
        duration: 0.9,
        ease: "back.out(1.6)",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 85%",
          once: true,
        },
      });

      // Inner items stagger
      gsap.from(contentRef.current.children, {
        opacity: 0,
        y: 20,
        stagger: 0.15,
        duration: 0.5,
        delay: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 80%",
          once: true,
        },
      });

    }, component);

    return () => ctx.revert();
  }, []);

  return (
    <div id='education' ref={component} className="flex flex-col gap-4 m-auto p-4 w-full h-[50vh]">
      
      {/* Header */}
      <p
        ref={headerRef}
        className="text-3xl w-full md:text-4xl font-black tracking-tighter p-4 bg-amber-300 border-[3px] border-black shadow-[6px_6px_0px_black] uppercase"
      >
        Education
      </p>

      {/* Content */}
      <ul
        ref={contentRef}
        className="font-semibold p-5 flex flex-col justify-between border-[3px] border-black shadow-[6px_6px_0px_black] h-full bg-white"
      >
        
        {/* Degree */}
        <li className='flex flex-col items-start gap-2'>
          <p className='text-xl md:text-2xl font-bold'>
            Bachelor's Degree in Information Technology
          </p>

          <p className='text-gray-600 font-medium'>
            Army Institute of Technology
          </p>

          <p className='border-[3px] border-black px-3 py-2 bg-[#45B1E8] mt-2 shadow-[3px_3px_0px_black]'>
            2023–2027
          </p>
        </li>

        {/* Location */}
        <li className='text-gray-600 flex items-center gap-2 text-sm font-medium'>
          <MdLocationPin className="text-lg" />
          <p>Pune, India</p>
        </li>

      </ul>
    </div>
  );
}

export default Education;