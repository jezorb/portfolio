import React, { useState, useRef } from "react";
import "./Terminal.css";
import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ================= FILE SYSTEM =================
const fileSystem = {
  "~": {
    type: "dir",
    children: {
      about: {
        type: "dir",
        children: {
          "info.txt": {
            type: "file",
            content: `I am a Full-Stack developer specializing in building
            high-performance web applications. I love turning complex problems
            into simple digital experiences.`,
          },
        },
      },
      skills: {
        type: "dir",
        children: {
          "tech.txt": {
            type: "file",
            content: JSON.stringify([
              { name: "Frontend", level: 89 },
              { name: "Backend", level: 82 },
              { name: "Languages", level: 78 },
              { name: "Database", level: 75 },
              { name: "Tool & More", level: 90 },
            ]),
          },
        },
      },
      contact: {
        type: "dir",
        children: {
          "details.txt": {
            type: "file",
            content:
              "Email: yatuljaat0212@gmail.com\nGitHub: github.com/jezorb",
          },
        },
      },
      projects: {
        type: "dir",
        children: {
          AgriTech: {
            type: "dir",
            children: {
              "tech.txt": {
                type: "file",
                content: "React.js, Solidity, IPFS",
              },
              "desc.txt": {
                type: "file",
                content:
                  "As a finalist in AgriTech 2025 held at KJ Somaiya College of Engineering, Mumbai (March 2025), I developed a blockchain-based supply chain platform to enable end-to-end traceability of agricultural products from farm to consumer. The system leveraged Solidity, IPFS, and React to ensure transparent, tamper-proof tracking of crop data. The project was recognized among the top 10 out of 1000+ participants for its innovation in improving agriculture supply chain transparency. It significantly enhanced traceability efficiency by reducing data inconsistencies and strengthening trust between farmers and consumers.",
              },
              "link.txt": {
                type: "file",
                content: "https://github.com/jezorb",
              },
            },
          },

          SolveX: {
            type: "dir",
            children: {
              "tech.txt": {
                type: "file",
                content: "Flask, React.js, AI/ML Model",
              },
              "desc.txt": {
                type: "file",
                content:
                  "As a finalist in SolveX Hackathon at Army Institute of Technology, Pune, I developed an intelligent system monitoring tool to track real-time PC metrics and logs. The application was built using Flask and React, enabling seamless full-stack development with real-time hardware data visualization. It featured smart alert mechanisms to detect anomalies in RAM usage and system temperature, improving overall system reliability. Additionally, an integrated AI model was used to predict system performance and assist in diagnosing log-related issues, making the tool proactive and efficient.",
              },
              "link.txt": {
                type: "file",
                content: "https://github.com/jezorb",
              },
            },
          },

          ChatApp: {
            type: "dir",
            children: {
              "tech.txt": {
                type: "file",
                content:
                  "React.js, Node.js, Express.js, MongoDB, Socket.io, JWT",
              },
              "desc.txt": {
                type: "file",
                content:
                  "Built a real-time chat application using the MERN stack with Socket.io to enable low-latency communication between users. Implemented secure user authentication using JWT with protected routes and session management. Designed responsive UI and developed backend APIs to handle messaging, user data, and real-time interactions efficiently.",
              },
              "link.txt": {
                type: "file",
                content: "https://github.com/jezorb",
              },
            },
          },

          NotesHandler: {
            type: "dir",
            children: {
              "tech.txt": {
                type: "file",
                content:
                  "React.js, Node.js, Express.js, MongoDB, Multer, NodeMailer",
              },
              "desc.txt": {
                type: "file",
                content:
                  "Developed a web platform for students to upload, download, and manage notes efficiently. Implemented file handling using Multer and integrated NodeMailer to send email notifications for newly uploaded content. Designed a user-friendly interface and ensured smooth backend operations for content storage and retrieval.",
              },
              "link.txt": {
                type: "file",
                content: "https://github.com/jezorb",
              },
            },
          },

          PlaceRental: {
            type: "dir",
            children: {
              "tech.txt": {
                type: "file",
                content: "React.js, Spring Boot, MySQL",
              },
              "desc.txt": {
                type: "file",
                content:
                  "Built a full-stack property rental platform for listing and booking accommodations. Developed REST APIs using Spring Boot to manage users, listings, and bookings, and integrated a MySQL database for data persistence. Collaborated in a team of four and secured 3rd place in the Project-Based Learning competition.",
              },
              "link.txt": {
                type: "file",
                content: "https://github.com/jezorb",
              },
            },
          },
        },
      },
    },
  },
};

// ================= HELPER =================
const getNode = (pathArr) => {
  let node = fileSystem["~"];
  for (let part of pathArr.slice(1)) {
    if (!node.children?.[part]) return null;
    node = node.children[part];
  }
  return node;
};

// ================= LINE RENDER =================
const Line = ({ line }) => {
  if (/^yatul@portfolio:/.test(line)) {
    const [left, cmd] = line.split("$");
    return (
      <div className="flex flex-wrap items-center gap-2 mb-1">
        <span className="px-2 py-1 bg-[#66CDAA] border-2 border-black shadow-[_2px_2px_rgb(0,0,0)]">
          {left}
        </span>
        <span className="font-bold">$</span>
        <span className="bg-[#45B1E8] px-2 py-1 border-2 border-black shadow-[_2px_2px_rgb(0,0,0)]">
          {cmd}
        </span>
      </div>
    );
  }

  // SKILLS UI
  try {
    const parsed = JSON.parse(line);
    if (Array.isArray(parsed)) {
      return (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 my-3">
          {parsed.map((skill, i) => (
            <div
              key={i}
              className="p-3 bg-[#fffafa] border-2 border-black shadow-[_4px_4px_rgb(0,0,0)]"
            >
              <p className="font-bold mb-2">{skill.name}</p>
              <div className="w-full h-3 bg-gray-200 border border-black">
                <div
                  className="h-full bg-[#45B1E8]"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      );
    }
  } catch (e) {}

  if (line.includes("not found") || line.includes("No such")) {
    return <div className="text-red-600 font-medium">{line}</div>;
  }

  if (line.includes("  ")) {
    return (
      <div className="flex flex-wrap gap-3 my-1">
        {line.split("  ").map((item, i) => (
          <span
            key={i}
            className={`px-2 py-1 border-2 border-black shadow-[_2px_2px_rgb(0,0,0)] ${
              item.includes(".") ? "bg-[#fffafa]" : "bg-[#45B1E8]"
            }`}
          >
            {item}
          </span>
        ))}
      </div>
    );
  }
  if (line.startsWith("http")) {
    return (
      <a
        href={line}
        target="_blank"
        rel="noreferrer"
        className="text-blue-600 underline"
      >
        {line}
      </a>
    );
  }
  return <div className="text-gray-800 whitespace-pre-wrap my-1">{line}</div>;
};

// ================= MAIN =================
export default function Terminal() {
  const [history, setHistory] = useState([
    "Welcome to my Portfolio",
    "Type 'help' to explore.",
  ]);
  const [input, setInput] = useState("");
  const [pathArr, setPathArr] = useState(["~"]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const inputRef = useRef(null);
  const component = useRef(null);
  const headerRef = useRef(null);
  const contentRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // 🔹 Heading (About jaisa left slide)
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

      // 🔹 Terminal (About content box jaisa)
      gsap.from(contentRef.current, {
        y: 80,
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
    }, component);

    return () => ctx.revert();
  }, []);

  const path = pathArr.join("/");

  const push = (cmd, output = "", customPath = path) => {
    const lines = output ? output.split("\n") : [];
    setHistory((prev) => [
      ...prev,
      `yatul@portfolio:${customPath}$ ${cmd}`,
      ...lines,
    ]);
  };

  const baseCommands = ["ls", "cd", "pwd", "cat", "clear", "help"];

  const handleTab = (e) => {
    e.preventDefault();
    const parts = input.split(" ");
    const lastWord = parts[parts.length - 1].toLowerCase();

    if (parts.length === 1) {
      const cmdMatch = baseCommands.find((cmd) => cmd.startsWith(lastWord));
      if (cmdMatch) return setInput(cmdMatch);
    }

    const node = getNode(pathArr);
    if (!node) return;

    const match = Object.keys(node.children).find((item) =>
      item.toLowerCase().startsWith(lastWord),
    );

    if (match) {
      parts[parts.length - 1] = match;
      setInput(parts.join(" "));
    }
  };

  const handleCommand = (raw) => {
    if (!raw) return;

    setCommandHistory((prev) =>
      prev[prev.length - 1] === raw ? prev : [...prev, raw],
    );
    setHistoryIndex(-1);

    const [cmdRaw, ...argsRaw] = raw.trim().split(" ");
    const cmd = cmdRaw.toLowerCase();
    const args = argsRaw;
    let output = "";

    if (cmd === "clear") {
      setHistory([]);
      return;
    }

    if (cmd === "help") {
      output = `Commands:
- ls
- cd <dir>
- pwd
- cat <file>
- clear`;
    } else if (cmd === "pwd") {
      output = path;
    } else if (cmd === "ls") {
      const node = getNode(pathArr);
      output =
        node?.type === "dir"
          ? Object.keys(node.children).join("  ")
          : "Not a directory";
    } else if (cmd === "cd") {
      const target = args[0];

      if (!target || target === "~") {
        setPathArr(["~"]);
        push(raw);
        return;
      }

      if (target === "..") {
        if (pathArr.length > 1) {
          const newPathArr = pathArr.slice(0, -1);
          setPathArr(newPathArr);
          push(raw, "", newPathArr.join("/"));
          return;
        }
        push(raw);
        return;
      }

      const node = getNode([...pathArr, target]);

      if (node && node.type === "dir") {
        const newPathArr = [...pathArr, target];
        setPathArr(newPathArr);
        push(raw, "", newPathArr.join("/"));
        return;
      } else {
        output = `cd: no such directory: ${target}`;
      }
    } else if (cmd === "cat") {
      const file = args[0];
      const node = getNode([...pathArr, file]);

      output =
        node?.type === "file" ? node.content : `cat: ${file}: No such file`;
    } else {
      output = `command not found: ${cmd}`;
    }

    push(raw, output);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
    }

    if (e.key === "Tab") handleTab(e);

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHistoryIndex((prev) => {
        const newIndex =
          prev === -1 ? commandHistory.length - 1 : Math.max(prev - 1, 0);

        setInput(commandHistory[newIndex] || "");
        return newIndex;
      });
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHistoryIndex((prev) => {
        if (prev === -1) return -1;

        const newIndex = prev + 1;

        if (newIndex >= commandHistory.length) {
          setInput("");
          return -1;
        }

        setInput(commandHistory[newIndex] || "");
        return newIndex;
      });
    }
  };

  return (
    <div
      id="terminal"
      ref={component}
      className="z-1 min-h-screen flex items-center justify-center p-10 font-mono flex-col gap-4"
    >
      <div
        ref={headerRef}
        className="text-start text-4xl lg:text-5xl font-medium py-4 border-3 w-[90%] flex justify-center items-center shadow-[_5px_5px_rgb(0,0,0)] bg-amber-300"
      >
        <p>System Status</p>
      </div>

      {/* ✅ CLICK TO FOCUS ADDED */}
      <div
        ref={contentRef}
        onClick={(e) => {
          if (e.target.tagName !== "INPUT") {
            inputRef.current?.focus();
          }
        }}
        className="w-[90%] h-[75vh] flex flex-col border-3 border-black bg-amber-300 shadow-[_7px_7px_rgb(0,0,0)] lg:shadow-[_8px_8px_rgb(0,0,0)]"
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-4 py-2 border-b-3 border-black bg-[#45B1E8]">
          <div className="flex gap-2">
            <div className="w-3 h-3 bg-red-500 border border-black" />
            <div className="w-3 h-3 bg-yellow-400 border border-black" />
            <div className="w-3 h-3 bg-green-500 border border-black" />
          </div>
          <p className="font-bold">yatul@portfolio</p>
        </div>

        {/* BODY */}
        <div className="flex-1 overflow-y-auto p-4 text-sm bg-[#fffafa]">
          {history.map((line, i) => (
            <Line key={i} line={line} />
          ))}

          <div className="flex items-center mt-3">
            <span className="px-2 py-1 bg-[#66CDAA] border-2 border-black shadow-[_2px_2px_rgb(0,0,0)]">
              yatul@portfolio
            </span>

            <span className="px-2 py-1 bg-amber-300 border-2 border-black ml-2 shadow-[_2px_2px_rgb(0,0,0)]">
              {path}
            </span>

            <span className="mx-2 font-bold">$</span>

            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-transparent outline-none flex-1 text-black caret-black"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
