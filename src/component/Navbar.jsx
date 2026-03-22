import React, { useLayoutEffect, useRef } from "react";

import gsap from "gsap";
import { FaGithub } from "react-icons/fa";

const Navbar = () => {
  const navRef = useRef(null);
  const logoRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // 1. Entrance Animation: Slide navbar down and fade in
      tl.from(navRef.current, {
        y: -50,
        opacity: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
      })
        // 2. Staggered Logo Pop
        .from(
          ".logo-letter",
          {
            scale: 0,
            rotation: -45,
            stagger: 0.1,
            duration: 0.5,
            ease: "back.out(2)",
          },
          "-=0.4",
        )
        // 3. Menu Items reveal
        .from(
          ".nav-item",
          {
            opacity: 0,
            y: -10,
            stagger: 0.1,
            duration: 0.4,
          },
          "-=0.2",
        );

      // Continuous subtle "float" for logo to make it more attractive
      gsap.to(".logo-letter", {
        y: -3,
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: "sine.inOut",
        stagger: 0.2,
      });
    }, navRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div
      ref={navRef}
      className="relative z-5 flex justify-between items-center p-5 mx-4 my-5 bg-amber-300 h-16 lg:h-18 border-3 border-black lg:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
    >
      {/* Logo Section */}
      <div
        ref={logoRef}
        className="flex justify-center items-center gap-2 lg:text-4xl text-3xl cursor-pointer"
      >
        <p className="logo-letter lg:h-12 lg:w-12 h-10 w-10 flex items-center justify-center font-black bg-[#45B1E8] border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-white transition-colors duration-200">
          Y
        </p>
        <p className="logo-letter lg:h-12 lg:w-12 h-10 w-10 flex items-center justify-center font-black bg-[#FF6666] border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-white transition-colors duration-200">
          J
        </p>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden lg:flex justify-center items-center gap-6 text-xl ">
        <li onClick={() => scrollToSection("home")} className="nav-item transition-colors cursor-pointer hover:text-white  uppercase">
          Home
        </li>
        <li onClick={() => scrollToSection("about")} className="nav-item hover:text-white transition-colors cursor-pointer  uppercase">
          About
        </li>
        <li onClick={() => scrollToSection("skills")} className="nav-item hover:text-white transition-colors cursor-pointer  uppercase">
          Skills
        </li>
        <li onClick={() => scrollToSection("projects")} className="nav-item hover:text-white transition-colors cursor-pointer  uppercase">
          Projects
        </li>

        <li className="nav-item">
          <div className="flex gap-5 items-center *:cursor-pointer">
            <p onClick={() => scrollToSection("terminal")} className="py-2 px-4 bg-[#fffafa] border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]   duration-100">
              Terminal
            </p>

            <p onClick={() => scrollToSection("touch")} className="p-2 bg-[#45B1E8] rounded-md border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px]  hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] duration-100 d">
              Get in Touch!
            </p>

            <p onClick={() => window.open("https://github.com/jezorb", "_blank")} className="p-3 text-center bg-[#45B1E8] rounded-md border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]  transition-colors duration-200 ">
              <FaGithub />
            </p>
          </div>
        </li>
      </ul>

      {/* Mobile Dark Mode Toggle */}
      <p onClick={() => window.open("https://github.com/jezorb", "_blank")} className="p-3 text-center bg-[#45B1E8] rounded-md border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] lg:hidden hover:translate-y-[-2px] duration-100 cursor-pointer ">
        <FaGithub />
      </p>
    </div>
  );
};

export default Navbar;
