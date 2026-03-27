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

      // Continuous subtle "float" for logo
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
      className="relative z-50 flex justify-between items-center p-3 sm:p-5 mx-2 sm:mx-4 my-2 sm:my-5 bg-amber-300 h-14 sm:h-16 lg:h-18 border-2 sm:border-3 border-black lg:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
    >
      {/* Logo Section */}
      <div
        ref={logoRef}
        className="flex justify-center items-center gap-1 sm:gap-2 text-2xl sm:text-3xl lg:text-4xl cursor-pointer"
      >
        <p className="logo-letter h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 flex items-center justify-center font-black bg-[#45B1E8] border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-white transition-colors duration-200">
          Y
        </p>
        <p className="logo-letter h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 flex items-center justify-center font-black bg-[#FF6666] border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-white transition-colors duration-200">
          J
        </p>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden lg:flex flex-wrap justify-center items-center gap-4 lg:gap-6 text-base sm:text-xl">
        <li
          onClick={() => scrollToSection("home")}
          className="nav-item transition-colors cursor-pointer uppercase"
        >
          Home
        </li>
        <li
          onClick={() => scrollToSection("about")}
          className="nav-item  transition-colors cursor-pointer uppercase"
        >
          About
        </li>
        <li
          onClick={() => scrollToSection("skills")}
          className="nav-item  transition-colors cursor-pointer uppercase"
        >
          Skills
        </li>
        <li
          onClick={() => scrollToSection("projects")}
          className="nav-item  transition-colors cursor-pointer uppercase"
        >
          Projects
        </li>

        <li className="nav-item flex flex-wrap gap-2 sm:gap-5 items-center">
          <p
            onClick={() => scrollToSection("terminal")}
            className="py-1 px-3 sm:py-2 sm:px-4 bg-[#fffafa] border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] duration-100"
          >
            Terminal
          </p>

          <p
            onClick={() => scrollToSection("touch")}
            className="py-1 px-2 sm:py-2 sm:px-3 bg-[#45B1E8] rounded-md border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] duration-100"
          >
            Get in Touch!
          </p>

          <p
            onClick={() => window.open("https://github.com/jezorb", "_blank")}
            className="p-2 sm:p-3 text-center bg-[#45B1E8] rounded-md border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-colors duration-200"
          >
            <FaGithub />
          </p>
        </li>
      </ul>

      {/* Mobile GitHub Icon */}
      <p
        onClick={() => window.open("https://github.com/jezorb", "_blank")}
        className="p-2 sm:p-3 text-center bg-[#45B1E8] rounded-md border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] lg:hidden hover:-translate-y-0.5 duration-100 cursor-pointer"
      >
        <FaGithub />
      </p>
    </div>
  );
};

export default Navbar;
