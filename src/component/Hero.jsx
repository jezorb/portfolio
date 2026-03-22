import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Icons
import {
  FaCode,
  FaNodeJs,
  FaReact,
  FaHtml5,
  FaTerminal,
  FaLaptopCode,
  FaRocket,
} from "react-icons/fa6";
import { PiCodeBlockBold } from "react-icons/pi";
import { MdOutlineFileDownloadDone } from "react-icons/md";
import { IoLogoJavascript } from "react-icons/io5";
import { BiLogoTypescript } from "react-icons/bi";
import { SiMongodb } from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [index, setIndex] = useState(0);
  const containerRef = useRef(null);
  const cardRef = useRef(null);

  const characters = [
    { icon: <FaTerminal className="text-emerald-400" />, label: "Initializing..." },
    { icon: <FaLaptopCode className="text-sky-400" />, label: "Coding..." },
    { icon: <FaRocket className="text-pink-500" />, label: "Launching..." },
    { icon: "👋", label: "Hi there!" },
  ];

  const skillData = [
    { icon: <FaNodeJs />, name: "Node", color: "hover:bg-green-400" },
    { icon: <FaReact />, name: "React", color: "hover:bg-sky-400" },
    { icon: <IoLogoJavascript />, name: "JavaScript", color: "hover:bg-yellow-400" },
    { icon: <BiLogoTypescript />, name: "TypeScript", color: "hover:bg-blue-500" },
    { icon: <FaHtml5 />, name: "HTML", color: "hover:bg-orange-500" },
    { icon: <SiMongodb />, name: "MongoDB", color: "hover:bg-emerald-500" },
  ];

  useEffect(() => {
    if (index < characters.length - 1) {
      const timer = setTimeout(() => setIndex(index + 1), 800);
      return () => clearTimeout(timer);
    }
  }, [index]);

  useLayoutEffect(() => {
    const q = gsap.utils.selector(containerRef);
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from(q(".hero-text-item"), {
        x: -100,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power4.out",
      })
        .from(
          cardRef.current,
          { scale: 0.5, opacity: 0, rotate: -15, duration: 1, ease: "back.out(1.7)" },
          "-=0.6"
        )
        .from(
          q(".skill-pill"),
          { y: 30, opacity: 0, stagger: 0.08, duration: 0.5, ease: "back.out(1.4)" },
          "-=0.4"
        );

      gsap.to(cardRef.current, {
        yPercent: 40,
        rotate: -2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div
      id="home"
      ref={containerRef}
      className="z-1 flex flex-col justify-center items-center overflow-hidden"
    >
      <div className="flex flex-col-reverse lg:flex-row justify-center items-center gap-6 lg:gap-10 p-5 sm:p-10 my-6">
        {/* Left Side */}
        <div className="flex flex-col gap-4 sm:gap-5 p-4 sm:p-8 w-full lg:w-1/2">
          <div className="flex items-center gap-2 sm:gap-3 h-8 hero-text-item">
            <span className="text-xl sm:text-2xl animate-pulse">{characters[index].icon}</span>
            <p className="text-[#45B1E8] font-mono text-sm sm:text-lg lg:text-xl tracking-widest uppercase">
              {characters[index].label}
            </p>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black hero-text-item uppercase leading-snug sm:leading-tight">
            I'm Yatul Jaat.
          </h1>

          <p className="text-gray-700 font-medium hero-text-item leading-relaxed text-sm sm:text-base lg:text-lg">
            I am a Full-Stack developer specializing in building
            high-performance web applications. I love turning complex problems
            into simple digital experiences.
          </p>

          <div className="hero-text-item pt-3 sm:pt-4">
            <button
              onClick={() => scrollToSection("touch")}
              className="p-2 sm:p-3 px-6 sm:px-8 bg-[#45B1E8] rounded-md border-[3px] border-black font-bold shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] duration-100 cursor-pointer uppercase text-sm sm:text-base"
            >
              Get in Touch!
            </button>
          </div>
        </div>

        {/* Right Side Card */}
        <div className="flex w-full lg:w-1/2 justify-center items-center">
          <div
            ref={cardRef}
            className="relative h-64 sm:h-72 lg:h-80 w-52 sm:w-60 lg:w-64 bg-slate-800 border-[3px] border-black rotate-3 shadow-[15px_15px_0px_0px_rgba(251,191,36,0.3)] group transition-transform hover:rotate-0 duration-500"
          >
            <img
              src="./home_img.PNG"
              alt="Home"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <p className="absolute right-[-25px] sm:right-[-30px] -bottom-3 sm:-bottom-4 px-4 sm:px-6 py-2 sm:py-3 border-[3px] border-black bg-emerald-400 text-black font-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] -rotate-3 group-hover:rotate-0 transition-transform text-xs sm:text-sm">
              Full-Stack Ninja
            </p>
            <div className="absolute left-[-20px] sm:left-[-25px] top-[-16px] sm:top-[-20px] p-3 sm:p-4 rotate-[-12deg] border-[3px] border-black rounded-xl bg-sky-400 text-black text-2xl sm:text-3xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] animate-bounce">
              <FaCode />
            </div>
            <div className="absolute right-[-16px] sm:right-[-20px] top-[18%] p-3 sm:p-4 rotate-[8deg] border-[3px] border-black rounded-xl bg-amber-300 text-black text-2xl sm:text-3xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <PiCodeBlockBold />
            </div>
            <div className="absolute left-[-28px] sm:left-[-35px] bottom-[12%] p-3 sm:p-4 rotate-[-6deg] border-[3px] border-black rounded-xl bg-pink-400 text-black text-2xl sm:text-3xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <MdOutlineFileDownloadDone />
            </div>
          </div>
        </div>
      </div>

      {/* Skills List */}
      <ul className="z-2 flex p-5 sm:p-10 gap-3 sm:gap-5 flex-wrap justify-center mb-10">
        {skillData.map((skill, i) => (
          <li
            onClick={() => scrollToSection("skills")}
            key={i}
            className="skill-pill flex items-center gap-2 py-2 px-3 sm:py-2 sm:px-5 bg-white rounded-lg border-[3px] border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:bg-amber-300 hover:translate-y-[2px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] duration-100 cursor-pointer transition-colors text-xs sm:text-sm"
          >
            <span className="text-lg sm:text-xl">{skill.icon}</span>
            <span className="font-bold uppercase tracking-tight">{skill.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Hero;