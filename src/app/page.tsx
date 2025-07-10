"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Card from "./Card";
import { FcMindMap } from "react-icons/fc";
import { IoIosFlower } from "react-icons/io";
import ClickSpark from "@/Animations/ClickSpark/ClickSpark";
import Link from "next/link";
import config from "@/config";

export default function Home() {
  const [pinned, setPinned] = useState([]);

  useEffect(() => {
    fetch("/api/github/pinned")
      .then((res) => res.json())
      .then((data) => setPinned(data));
  }, []);
  return (
    <ClickSpark
      sparkColor="tomato"
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
    >
      <main className="min-h-screen bg-[#e6f4ff] text-[#1a1a1a] font-sans p-6 ">
        <div className="mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl bg-[#e6f4ff]">
          {/* Header */}
          <Card className="bg-[#cce0ff] col-span-1 md:col-span-3 flex justify-between items-center pb-4">
            <Link href="/">
              <h1 className="text-lg font-medium tracking-wide uppercase">
                Ahmed <span className="font-bold uppercase">Mohiuddin</span>{" "}
                Shah
              </h1>
            </Link>
            <nav className="space-x-6 uppercase flex flex-wrap gap-y-2">
              <a href="/projects" className="hover:underline">
                Projects
              </a>
              <a href={config.no_content_message} className="hover:underline">
                Resume
              </a>
              <a href={config.no_content_message} className="hover:underline">
                CV
              </a>
              <a href={config.no_content_message} className="hover:underline">
                Contact
              </a>
            </nav>
          </Card>

          <div className="flex flex-col md:flex-row gap-4 col-span-1 md:col-span-2">
            {/* Left Top Text */}
            <Card className="bg-[#cce0ff] p-6 flex flex-col justify-between flex-1 min-w-0">
              <IoIosFlower className="text-9xl fill-blue-400" />
              <h2 className="text-2xl font-bold leading-snug">
                Bridging <em className="italic font-medium">software</em> and{" "}
                <em className="italic font-medium">hardware</em> — where{" "}
                <strong>smart code</strong> meets{" "}
                <strong>creative hands</strong>.
              </h2>
            </Card>

            {/* Profile Picture */}
            <div className="bg-white rounded-2xl shadow overflow-hidden flex-1 min-w-0 flex items-center justify-center">
              <Image
                src="/profile-image.png"
                alt="Ahmed Mohiuddin Shah"
                width={600}
                height={600}
                className="object-cover w-full h-full rounded-2xl"
                priority
              />
            </div>
          </div>

          {/* Project Feature */}
          <Card className="bg-[#cce0ff] p-4 row-span-2 flex flex-col min-h-[80vh]">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-semibold">Featured Projects</h3>
                <a
                  href="/projects"
                  className="text-5xl hover:text-blue-600 transition-colors"
                >
                  ↗
                </a>
              </div>
              <Image
                src="/projects-image.png"
                alt="Projects Cover"
                width={400}
                height={200}
                className="rounded-lg object-cover w-full h-auto max-h-40"
              />
            </div>
            <div className="flex flex-col justify-center items-center mt-4 h-full max-h-full">
              {pinned.map((item, idx) => (
                <a
                  key={idx}
                  className="bg-[#99b3ff] rounded-lg shadow p-4 mb-4 h-full w-full group"
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="flex flex-col justify-around min-h-full w-full relative">
                    {/* Title & Description (centered, visible when not hovered) */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-300 opacity-100 group-hover:opacity-0">
                      <h4 className="text-lg font-semibold text-center">
                        {item.name}
                      </h4>
                      <p className="text-sm text-center">
                        {item.languages.nodes[0].name} - {item.stargazerCount} stars
                      </p>
                    </div>
                    {/* Content (centered, visible on hover) */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                      <p className="text-black text-center text-sm break-all truncate max-w-xs">
                        {item.description || "No description available."}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </Card>

          {/* Bio */}
          <Card className="bg-[#cce0ff] p-4 text-sm leading-relaxed">
            <FcMindMap className="text-4xl mb-10" />
            <p className="text-sm leading-relaxed">
              Hi, I’m <strong>Ahmed Mohiuddin Shah</strong> — a hands-on
              Computer Science major who loves building things, whether it’s
              full-stack web apps, IoT systems, or creative hardware projects.
              <br />
              <br />I work comfortably with <strong>C/C++</strong>,{" "}
              <strong>Python</strong>, <strong>Java</strong>, and tools like{" "}
              <strong>Next.js</strong> and the <strong>MERN stack</strong>. I’ve
              also got a thing for embedded electronics and blending tech with
              creativity — from AI-driven systems to hand-crafted designs.
              <br />
              <br />
              If it challenges me and lets me create something cool, I’m in.
            </p>
          </Card>

          {/* Contact Box */}
          <Card className="bg-[#99b3ff] p-6 flex flex-col justify-between min-h-56 overflow-hidden relative">
            <div className="flex flex-row justify-between items-start mb-4">
              <p className="text-xl text-gray-700 mb-2">Have some questions?</p>
              <a
                href={config.no_content_message}
                className="text-5xl hover:text-blue-600 transition-colors"
              >
                ↗
              </a>
            </div>
            <h3 className="text-5xl font-bold">Contact me</h3>
          </Card>

          {/* Footer Socials */}
          <Card className="bg-[#cce0ff] md:col-span-3 flex justify-end space-x-4 text-sm pt-4 uppercase">
            <a
              href="https://github.com/Ahmed-Mohiuddin-Shah"
              className="hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              href="https://www.instagram.com/ahmed_mohiuddin_shah/"
              className="hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
            <a
              href="https://www.linkedin.com/in/ahmed-mohiuddin-shah/"
              className="hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a
              href="https://www.youtube.com/@ahmedmohiuddin3017"
              className="hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Youtube
            </a>
          </Card>
        </div>
      </main>
    </ClickSpark>
  );
}
