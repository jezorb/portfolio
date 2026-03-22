import React, { useLayoutEffect, useRef } from 'react'
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const component = useRef(null);
  const headerRef = useRef(null);
  const textRef = useRef(null);
  const cardsRef = useRef([]);

  const fullText = "Let's build something amazing together";

  // ================= HOVER FUNCTIONS =================
  const handleHover = (el) => {
    gsap.to(el, {
      y: -10,
      scale: 1.05,
      rotate: 0,
      duration: 0.3,
      ease: "power2.out"
    });

    gsap.to(el.querySelector(".sticker"), {
      rotate: 15,
      scale: 1.1,
      duration: 0.3
    });
  };

  const handleLeave = (el, rotateVal) => {
    gsap.to(el, {
      y: 0,
      scale: 1,
      rotate: rotateVal,
      duration: 0.3,
      ease: "power2.out"
    });

    gsap.to(el.querySelector(".sticker"), {
      rotate: 7,
      scale: 1,
      duration: 0.3
    });
  };

  // ================= ANIMATIONS =================
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {

      // Heading animation
      gsap.from(headerRef.current, {
        x: -100,
        opacity: 0,
        rotate: -10,
        scale: 0.8,
        duration: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
          once: true,
        }
      });

      // Typing effect
      let obj = { count: 0 };

      gsap.to(obj, {
        count: fullText.length,
        duration: 2,
        delay: 0.3,
        ease: "none",
        snap: { count: 1 },
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 85%",
          once: true,
        },
        onUpdate: () => {
          textRef.current.textContent = fullText.slice(0, obj.count);
        }
      });

      // Cards entry animation
      gsap.from(cardsRef.current, {
        y: 80,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: component.current,
          start: "top 80%",
          once: true,
        }
      });

      // Sticker pop animation
      gsap.from(".sticker", {
        scale: 0,
        rotate: 45,
        duration: 0.5,
        stagger: 0.2,
        ease: "back.out(2)",
        scrollTrigger: {
          trigger: component.current,
          start: "top 80%",
          once: true,
        }
      });

    }, component);

    return () => ctx.revert();
  }, []);

  return (
    <div
      id='touch'
      ref={component}
      className='z-10 w-[90%] flex flex-col justify-center items-start m-auto gap-4 mt-15 mb-25'
    >
      {/* Heading */}
      <h1
        ref={headerRef}
        className="text-xl md:text-2xl font-black p-3 bg-amber-300 border-3 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] uppercase"
      >
        get in touch
      </h1>

      <div className='flex flex-col items-center justify-center gap-16 w-full p-5'>
        
        {/* Typing Text */}
        <p ref={textRef} className='text-xl min-h-[28px]'></p>

        {/* Cards */}
        <ul className='flex justify-center items-center gap-12 flex-wrap *:cursor-pointer'>

          {/* LinkedIn */}
          <li
            onClick={() => window.open("https://github.com/jezorb", "_blank")}
            ref={el => cardsRef.current[0] = el}
            onMouseEnter={(e) => handleHover(e.currentTarget)}
            onMouseLeave={(e) => handleLeave(e.currentTarget, -3)}
            className='relative flex flex-col items-center justify-center gap-2 bg-[#45B1E8] w-50 h-35 border-3 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] -rotate-3'
          >
            <FaLinkedin className='text-5xl' />
            <p>LinkedIn</p>
            <div className='sticker absolute -top-4 right-3 rotate-7 h-7 w-16 bg-amber-300 opacity-60 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]'></div>
          </li>

          {/* GitHub */}
          <li
            onClick={() => window.open("https://github.com/jezorb", "_blank")}
            ref={el => cardsRef.current[1] = el}
            onMouseEnter={(e) => handleHover(e.currentTarget)}
            onMouseLeave={(e) => handleLeave(e.currentTarget, 3)}
            className='relative flex flex-col items-center justify-center gap-2 bg-amber-300 w-50 h-35 border-3 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] rotate-3'
          >
            <FaGithub className='text-5xl' />
            <p>GitHub</p>
            <div className='sticker absolute -top-4 right-3 rotate-7 h-7 w-16 bg-amber-300 opacity-60 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]'></div>
          </li>

          {/* Instagram */}
          <li
            onClick={() => window.open("https://github.com/jezorb", "_blank")}
            ref={el => cardsRef.current[2] = el}
            onMouseEnter={(e) => handleHover(e.currentTarget)}
            onMouseLeave={(e) => handleLeave(e.currentTarget, -3)}
            className='relative flex flex-col items-center justify-center gap-2 bg-pink-400 w-50 h-35 border-3 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] -rotate-3'
          >
            <FaInstagram className='text-5xl' />
            <p>Instagram</p>
            <div className='sticker absolute -top-4 right-3 rotate-7 h-7 w-16 bg-amber-300 opacity-60 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]'></div>
          </li>

        </ul>
      </div>
    </div>
  )
}

export default Footer