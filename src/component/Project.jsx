import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { FaHome } from "react-icons/fa";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Coordinates
const AIT_PUNE = [18.5971, 73.9097];
const SOMAIYA_MUMBAI = [19.0728, 72.8996];
const CENTER = [18.8, 73.4];

// Full Timeline Data
const TIMELINE_ITEMS = [
  {
    id: "agritech",
    type: "HACKATHON FINALIST",
    title: "AgriTech 2025 @ Mumbai",
    date: "March 2025",
    desc: "Developed a blockchain-based supply chain platform using Solidity, IPFS, and React to enable end-to-end traceability of agricultural products. Achieved Top 10 ranking among 1000+ teams.",
    loc: "KJ Somaiya College of Engineering, Mumbai",
    coords: SOMAIYA_MUMBAI,
    showOnMap: true,
    repo: "https://github.com/jezorb",
  },

  {
    id: "solvex",
    type: "HACKATHON FINALIST",
    title: "SolveX @ AIT Pune",
    date: "April 2025",
    desc: "Built an intelligent system monitoring tool using Flask and React with real-time hardware visualization, anomaly alerts, and AI-based performance prediction.",
    loc: "Army Institute of Technology, Pune",
    coords: AIT_PUNE,
    showOnMap: true,
    repo: "https://github.com/jezorb",
  },

  {
    id: "chat",
    type: "PROJECT",
    title: "Real-Time Chat Application (MERN)",
    date: "Feb 2025",
    desc: "Developed a real-time chat app using MERN stack and Socket.io with JWT-based authentication and low-latency messaging between users.",
    loc: "Personal Project",
    coords: null,
    showOnMap: false,
    repo: "https://github.com/jezorb",
  },

  {
    id: "notes",
    type: "PROJECT",
    title: "Notes Handler Platform",
    date: "May 2025",
    desc: "Built a platform for students to upload and access notes with file handling via Multer and email notifications using NodeMailer.",
    loc: "Personal Project",
    coords: null,
    showOnMap: false,
    repo: "https://github.com/jezorb",
  },

  {
    id: "rental",
    type: "PROJECT",
    title: "Place Rental Platform (Spring Boot)",
    date: "June 2025",
    desc: "Created a full-stack property rental system with Spring Boot REST APIs and MySQL database, secured 3rd place in PBL(Project Based Learning) competition.",
    loc: "Army Institute of Technology, Pune",
    coords: null,
    showOnMap: false,
    repo: "https://github.com/jezorb",
  },
];

const markerIcon = L.divIcon({
  className: "bg-transparent",
  html: `<div class="w-8 h-8 bg-yellow-400 border-[3px] border-black rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center animate-bounce">
           <div class="w-3 h-3 bg-black rounded-full"></div>
         </div>`,
  iconSize: [32, 32],
});

function MapActions({ targetCoords }) {
  const map = useMap();
  window.zoomIn = () => map.zoomIn();
  window.zoomOut = () => map.zoomOut();
  window.goHome = () => map.flyTo(CENTER, 8);

  React.useEffect(() => {
    if (targetCoords) map.flyTo(targetCoords, 14, { duration: 1.5 });
  }, [targetCoords, map]);

  return null;
}

export default function Project() {
  const [activeCoords, setActiveCoords] = useState(null);
  const componentRef = useRef();
  const headerRef = useRef();
  const contentRef = useRef();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // 🔥 Header animation
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

      // 🔥 Whole container (timeline + map)
      gsap.from(contentRef.current, {
        y: 80,
        opacity: 0,
        scale: 0.96,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 80%",
          once: true,
        },
      });
      gsap.from(".map-decor", {
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 75%",
          once: true,
        },
        opacity: 0,
        y: 80, // niche se aayega
        x: -60, // left se thoda slide
        rotate: -10, // thoda tilt (🔥 feel)
        scale: 0.9,
        duration: 1,
        ease: "power3.out",
      });

      // 🔥 Map fade-in separately
      gsap.from(".map-section", {
        opacity: 0,
        x: 60,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 75%",
          once: true,
        },
      });
    }, componentRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      id='projects'
      ref={componentRef}
      className="z-10 flex flex-col items-center justify-center  p-4 font-mono gap-5 mb-12 overflow-hidden"
    >
      <div
        ref={headerRef}
        className="text-start text-4xl lg:text-5xl font-medium py-4 border-3 w-[90%] flex justify-center items-center shadow-[_6px_6px_rgb(0,0,0)] bg-amber-300 uppercase font-semibold"
      >
        <p>MY JOURNEY</p>
      </div>
      <div
        ref={contentRef}
        className="w-[90%] lg:h-[60vh] flex flex-col lg:flex-row bg-white border-3  border-black"
      >
        {/* LEFT: Journey Timeline (SS Style Refactored) */}
        <div className="w-full lg:w-[40%] border-b-[4px] md:border-b-0 md:border-r-[4px] border-black flex flex-col bg-[#fdfdfd] shadow-[7px_7px_0px_black]">
          {/* Timeline Scroll */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar space-y-2">
            {TIMELINE_ITEMS.map((item, idx) => (
              <div
                key={idx}
                onClick={() => {
                  if (item.repo) {
                    window.open(item.repo, "_blank");
                  } else if (item.coords) {
                    setActiveCoords(item.coords);
                  }
                }}
                className={`relative pl-12 pb-12 last:pb-0 group transition-all duration-300 ${
                  item.coords ? "cursor-pointer" : "cursor-default"
                } timeline-item`}
              >
                {/* Vertical Line */}
                <div className="absolute left-[8px] top-3 w-[2px] h-full bg-black/20 group-hover:bg-amber-400 transition-all duration-300"></div>

                {/* Bullet */}
                <div className="absolute left-0 top-3 w-5 h-5 bg-white border-[3px] border-black rounded-full shadow-[3px_3px_0px_black] group-hover:bg-amber-400 group-hover:scale-110 transition-all duration-300"></div>

                {/* Content Box */}
                <div className="flex flex-col gap-3 bg-white border-[3px] border-black p-4 md:p-5 shadow-[6px_6px_0px_black] group-hover:shadow-[3px_3px_0px_black] group-hover:translate-x-[3px] group-hover:translate-y-[3px] transition-all duration-200">
                  {/* Top Row */}
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    {/* Type Badge */}
                    <span className="text-[10px] font-black tracking-widest uppercase bg-amber-300 px-2 py-[3px] border border-black">
                      {item.type}
                    </span>

                    {/* Date */}
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                      {item.date}
                    </p>
                  </div>

                  {/* Title */}
                  <h3 className="text-[18px] md:text-[20px] font-black leading-tight tracking-tight text-black group-hover:text-amber-600 transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[13px] md:text-[14px] font-medium leading-relaxed text-gray-800">
                    {item.desc}
                  </p>

                  {/* Location */}
                  {item.loc && (
                    <div className="flex items-center gap-2 mt-2 text-[11px] font-bold text-sky-600 uppercase tracking-wide">
                      <span>📍</span>
                      <span className="border-b-2 border-sky-300">
                        {item.loc}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Map Section */}
        <div className="map-section hidden lg:flex w-[60%] relativeh-auto bg-stone-50 shadow-[7px_7px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
          <div className="absolute top-5 right-5 z-[1000] flex flex-col gap-3">
            <button onClick={() => window.goHome()} className="map-btn">
              <FaHome />
            </button>
          </div>
          <div className="absolute top-5 left-5 z-[1000] flex flex-col gap-3">
            <button onClick={() => window.zoomIn()} className="map-btn">
              +
            </button>
            <button onClick={() => window.zoomOut()} className="map-btn ">
              −
            </button>
          </div>
          <img
            src="./map_img.PNG"
            alt="map_img"
            className="map-decor  absolute bottom-0 left-0 w-40 md:w-50 z-[1000] pointer-events-none"
          />

          <MapContainer
            center={CENTER}
            zoom={8}
            zoomControl={false}
            className="h-full w-full grayscale-[15%]"
          >
            <TileLayer url="https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg" />
            {TIMELINE_ITEMS.filter((item) => item.showOnMap).map(
              (item, idx) => (
                <Marker key={idx} position={item.coords} icon={markerIcon}>
                  <Popup closeButton={false}>
                    <div className=" px-3 bg-[#fdfdfd] border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]  duration-100 ">
                      <p className=" font-semibold">{item.id.toUpperCase()}</p>
                    </div>
                  </Popup>
                </Marker>
              ),
            )}
            <MapActions targetCoords={activeCoords} />
          </MapContainer>
        </div>
      </div>

      <style>{`
        .map-btn {
          cursor:pointer;
          width: 44px; height: 44px;
          background: #fff; border: 3px solid black;
          font-weight: 900; font-size: 1.1rem;
          display: flex; align-items: center; justify-content: center;
          border-radius: 8px; box-shadow: 4px 4px 0px black;
          transition: all 0.1s ease;
        }
        .map-btn:hover { background: #facc15; transform: translate(1px, 1px); box-shadow: 3px 3px 0px black; }
        .map-btn:active { transform: translate(2px, 2px); box-shadow: 0px 0px 0px black; }
        
        
      `}</style>
    </div>
  );
}
