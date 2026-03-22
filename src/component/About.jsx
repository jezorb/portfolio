import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const component = useRef(null);
  const headerRef = useRef(null);
  const contentRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        x: -100,
        opacity: 0,
        duration: 0.8,
        ease: "power4.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
          once: true,
        },
      });

      gsap.from(contentRef.current, {
        y: 50,
        opacity: 0,
        scale: 0.95,
        duration: 1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 80%",
          once: true,
        },
      });

      gsap.from(".highlight-tag", {
        opacity: 0,
        y: 10,
        stagger: 0.2,
        duration: 0.5,
        delay: 0.5,
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 70%",
          once: true,
        },
      });
    }, component);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={component}
      className="relative flex items-center justify-center py-16 px-10 selection:bg-amber-200 overflow-hidden"
    >
      <div className="relative z-10 flex flex-col items-start gap-8 w-[90%]">

        {/* Header */}
        <div ref={headerRef} className="group">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter p-4 bg-amber-300 border-[3px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all group-hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-[2px] group-hover:translate-y-[2px]">
            ABOUT
          </h2>
        </div>

        {/* Content */}
        <div
          ref={contentRef}
          className="flex flex-col gap-8 p-8 md:p-12 bg-white border-[3px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] leading-relaxed text-lg md:text-xl text-gray-900"
        >
          <p className="first-letter:text-5xl first-letter:font-bold first-letter:mr-3 first-letter:float-left">
            I’m a passionate <span className="highlight-tag inline-block bg-amber-300 px-2 py-0.5 border border-black font-bold transform -rotate-1">Full-Stack Developer</span> currently pursuing my degree in Information Technology. 
            I enjoy building real-world applications using modern technologies like{" "}
            <span className="highlight-tag inline-block bg-pink-400 px-2 py-0.5 border border-black text-white font-medium transform rotate-1">
              React, Node.js, and Spring Boot
            </span>. 
            I’ve worked on multiple projects including{" "}
            <span className="highlight-tag underline decoration-sky-400 decoration-[4px] underline-offset-4 font-semibold text-sky-800">
              real-time chat apps and full-stack platforms
            </span>, 
            focusing on performance, scalability, and clean architecture.
          </p>

          <p>
            I’ve actively participated in hackathons where I built innovative solutions like a{" "}
            <span className="px-2 py-1 bg-emerald-100 border-b-4 border-emerald-400 font-semibold">
              blockchain-based supply chain system
            </span>{" "}
            and an{" "}
            <span className="bg-pink-100 text-pink-700 px-1 border-b-2 border-pink-400 font-semibold">
              AI-powered system monitoring tool
            </span>. 
            These experiences helped me improve problem-solving skills and build impactful solutions under pressure.
          </p>

          <p className="border-l-8 border-amber-400 pl-6 py-2 italic text-2xl md:text-3xl font-light text-gray-700">
            I love working on <span className="font-bold text-black not-italic">backend systems</span>,{" "}
            creating <span className="font-bold text-black not-italic">scalable architectures</span>, and delivering{" "}
            <span className="text-sky-600 font-bold not-italic">smooth user experiences</span>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;