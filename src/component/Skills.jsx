import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Icons
import { FaHtml5, FaCss3, FaReact, FaBootstrap, FaNode, FaJava, FaPython, FaDatabase, FaGitAlt, FaGithub, FaLinux, FaTools } from "react-icons/fa";
import { RiTailwindCssFill } from "react-icons/ri";
import { IoLogoJavascript } from "react-icons/io5";
import { BsTypescript } from "react-icons/bs";
import { SiGsap, SiExpress, SiSocketdotio, SiMongodb, SiPostman, SiIntellijidea, SiMongoose, SiH2Database } from "react-icons/si";
import { TbBrandFramerMotion, TbBrandOauth, TbBrandCpp } from "react-icons/tb";
import { BiLogoSpringBoot } from "react-icons/bi";
import { FaRegFileCode } from "react-icons/fa6";
import { VscVscode } from "react-icons/vsc";
import { DiMysql } from "react-icons/di";
import { HiCodeBracket } from "react-icons/hi2"; // Languages icon

gsap.registerPlugin(ScrollTrigger);

// Custom color maps for easier management
const textColors = {
  sky: "text-sky-600",
  pink: "text-pink-600",
  amber: "text-amber-600",
  emerald: "text-emerald-600",
  violet: "text-violet-600",
};

const borderColors = {
  sky: "border-sky-600",
  pink: "border-pink-600",
  amber: "border-amber-600",
  emerald: "border-emerald-600",
  violet: "border-violet-600",
};

const SkillCard = ({ title, icon: Icon, skills, colorKey }) => {
  const iconColor = textColors[colorKey]; // Colored Icon
  const borderColor = borderColors[colorKey]; // Colored Line

  return (
    <div className="skill-card bg-white border-[3px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col h-full overflow-hidden">
      {/* Card Header - Only large icon colored */}
      <div className={`flex items-center gap-4 p-5 `}>
        {/* Adjusted size: text-4xl/h-10 to make it visually prominent */}
        <Icon className={`h-10 w-10 text-4xl ${iconColor}`} />
        {/* Category title is now standard black (text-gray-950) */}
        <h3 className={`text-2xl font-black uppercase tracking-tight text-gray-950`}>
          {title}
        </h3>
      </div>

      {/* Colored and Thick Separator Line */}
      <div className={`border-t-[4px] ${borderColor} mx-5`}></div>

      {/* Card Body - Tags with compress shadow on hover */}
      <div className="p-6 flex flex-wrap gap-3">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="flex items-center gap-2 px-3 py-2 bg-white border-2 border-black 
                       shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
                       hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] 
                       transition-all duration-100 cursor-default cursor-pointer"
          >
            <span className="text-xl">{skill.icon}</span>
            <span className="font-bold text-sm uppercase text-gray-900">
              {skill.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const Skills = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);

  useLayoutEffect(() => {
  let ctx = gsap.context(() => {
    // 1. Header Slide-in (Identical to About component)
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

    // 2. Skill Cards Entrance
    gsap.from(".skill-card", {
      y: 60,
      opacity: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        once: true,
      },
    });

    // 3. Staggered Skill Tags (The "Pop" effect)
    
  }, sectionRef);
  return () => ctx.revert();
}, []);

  const skillGroups = [
    {
      title: "Frontend",
      icon: FaReact, // Large icon for header
      colorKey: "sky", // Matches screenshot
      skills: [
        { name: "HTML", icon: <FaHtml5 className="text-orange-500" /> },
        { name: "CSS", icon: <FaCss3 className="text-blue-500" /> },
        { name: "Tailwind", icon: <RiTailwindCssFill className="text-cyan-400" /> },
        { name: "JavaScript", icon: <IoLogoJavascript className="text-yellow-400" /> },
        { name: "TypeScript", icon: <BsTypescript className="text-blue-600" /> },
        { name: "React", icon: <FaReact className="text-sky-400" /> },
        { name: "GSAP", icon: <SiGsap className="text-green-500" /> },
        { name: "Motion", icon: <TbBrandFramerMotion /> },
        { name: "Bootstrap", icon: <FaBootstrap className="text-purple-600" /> },
      ],
    },
    {
      title: "Backend",
      icon: FaNode,
      colorKey: "pink",
      skills: [
        { name: "Node", icon: <FaNode className="text-green-600" /> },
        { name: "Express", icon: <SiExpress /> },
        { name: "Socket.IO", icon: <SiSocketdotio /> },
        { name: "Spring Boot", icon: <BiLogoSpringBoot className="text-green-500" /> },
        { name: "Multer", icon: <FaRegFileCode /> },
        { name: "OAuth", icon: <TbBrandOauth /> },
      ],
    },
    {
      title: "Languages",
      icon: HiCodeBracket, // Matches standard 'languages' icon
      colorKey: "amber",
      skills: [
        { name: "HTML", icon: <FaHtml5 className="text-orange-500" /> },
        { name: "CSS", icon: <FaCss3 className="text-blue-500" /> },
        { name: "JavaScript", icon: <IoLogoJavascript className="text-yellow-400" /> },
        { name: "TypeScript", icon: <BsTypescript className="text-blue-600" /> },
        { name: "Java", icon: <FaJava className="text-red-600" /> },
        { name: "Python", icon: <FaPython className="text-blue-500" /> },
        { name: "C++", icon: <TbBrandCpp className="text-blue-700" /> },
        { name: "SQL", icon: <DiMysql /> },
      ],
    },
    {
      title: "Databases",
      icon: FaDatabase,
      colorKey: "emerald",
      skills: [
        { name: "MongoDB", icon: <SiMongodb className="text-green-500" /> },
        { name: "MySQL", icon: <DiMysql /> },
        { name: "H2", icon: <SiH2Database /> },
        { name: "Mongoose", icon: <SiMongoose className="text-red-800" /> },
      ],
    },
    {
      title: "Tools & More",
      icon: FaTools,
      colorKey: "violet",
      skills: [
        { name: "VS Code", icon: <VscVscode className="text-blue-500" /> },
        { name: "Postman", icon: <SiPostman className="text-orange-500" /> },
        { name: "IntelliJ", icon: <SiIntellijidea /> },
        { name: "Linux", icon: <FaLinux /> },
        { name: "Git", icon: <FaGitAlt className="text-orange-600" /> },
        { name: "GitHub", icon: <FaGithub /> },
      ],
    },
  ];

  return (
    <section id='skills' ref={sectionRef} className="py-20 px-6 md:px-12 selection:bg-amber-200 z-10">
      <div className="w-[90%] mx-auto">
        {/* Section Header - Neobrutalist Box */}
        <div ref={headerRef} className="inline-block mb-12">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter p-4 bg-amber-300 border-[3px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] uppercase">
            Skills
          </h2>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {skillGroups.map((group, index) => (
            <SkillCard key={index} {...group} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;