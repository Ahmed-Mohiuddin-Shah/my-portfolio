"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

import { motion, AnimatePresence } from "framer-motion";
import Card from "./Card";
import { FcMindMap } from "react-icons/fc";
import { IoIosFlower } from "react-icons/io";
import ClickSpark from "@/Animations/ClickSpark/ClickSpark";
import Link from "next/link";
import config from "@/config";
import { FaSpinner, FaStar } from "react-icons/fa6";

type PinnedRepo = {
  name: string;
  url: string;
  description?: string;
  stargazerCount: number;
  languages: {
    nodes: { name: string }[];
  };
};

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15, // Controls delay between children
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 }, // Start from bottom
  show: { opacity: 1, y: 0 },
};

export default function Home() {
  const [pinned, setPinned] = useState<PinnedRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/github/pinned")
      .then((res) => res.json())
      .then((data) => (setPinned(data), setLoading(false)));
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
        <div className="mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 max-w-[100rem] bg-[#e6f4ff]">
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
              <a href="/contact" className="hover:underline">
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
            <motion.div
              className="flex flex-col justify-center items-center mt-4 h-full max-h-full"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {loading ? (
                <FaSpinner className="text-4xl text-blue-500 animate-spin" />
              ) : pinned.length === 0 ? (
                <p className="text-gray-500">No pinned projects found.</p>
              ) : (
                <AnimatePresence>
                  {pinned.map((item, idx) => (
                    <motion.a
                      key={idx}
                      variants={itemVariants}
                      initial="hidden"
                      animate="show"
                      exit="hidden"
                      className="bg-[#99b3ff] rounded-lg shadow p-4 mb-4 h-full w-full group cursor-pointer"
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="flex flex-col justify-around min-h-full w-full relative">
                        <div className="absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-300 opacity-100 group-hover:opacity-0">
                          <h4 className="text-lg font-semibold text-center mb-2">
                            {item.name}
                          </h4>
                          <p className="text-sm text-center flex gap-4">
                            <div className="flex items-center">
                              {item.languages.nodes.map((lang, langIdx) => (
                                <span
                                  key={langIdx}
                                  className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-xs mr-1"
                                >
                                  {lang.name}
                                </span>
                              ))}
                            </div>
                            <div>
                              <span className="text-gray-600 flex items-center gap-1">
                                <FaStar className="text-yellow-500" />{" "}
                                {item.stargazerCount}
                              </span>
                            </div>
                          </p>
                        </div>
                        <div className="absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                          <div className="relative flex flex-row w-full justify-start gap-4 items-center">
                            <Image
                              src="/projects-image.png"
                              alt={item.name}
                              width={100}
                              height={100}
                              className="relative left-0 rounded-lg object-cover max-w-40 max-h-40"
                            />
                            <p className="relative right-0 text-black text-center text-sm break-all truncate max-w-xs">
                              {item.description || "No description available."}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </AnimatePresence>
              )}
            </motion.div>
          </Card>

          {/* Bio */}
          <Card className="bg-[#cce0ff] p-4 text-sm leading-relaxed row-span-2">
            <FcMindMap className="text-7xl mb-10" />
            <p className="text-xl leading-relaxed">
              Hi, I{"'"}m <strong>Ahmed Mohiuddin Shah</strong> — a hands-on
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
          <Card className="bg-[#99b3ff] p-6 flex flex-col justify-between min-h-56 overflow-hidden relative row-span-2">
            <div className="flex flex-row justify-between items-start mb-4">
              <p className="text-xl text-gray-700 mb-2">Have some questions?</p>
              <a
                href="/contact"
                className="text-5xl hover:text-blue-600 transition-colors"
              >
                ↗
              </a>
            </div>
            <h3 className="text-5xl font-bold">Contact me</h3>
          </Card>

          {/* Footer Socials */}
          <Card className="bg-[#cce0ff] md:col-span-1 flex justify-end space-x-4 text-lg pt-4 uppercase">
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
