"use client";

import React, { useEffect, useState } from "react";
import Card from "../Card";
import ClickSpark from "@/Animations/ClickSpark/ClickSpark";
import Link from "next/link";
import Masonry from "@/Components/Masonry/Masonry";
import config from "@/config";
import { FaSpinner } from "react-icons/fa6";

type Project = {
  id: number;
  name: string;
  description: string;
  language: string;
  img: string;
  url: string;
  height: number;
};

export default function Home() {
  const [, setRepos] = useState<Project[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [shouldShowProjects, setShouldShowProjects] = useState(false);

  useEffect(() => {
    fetch("/api/github/repos")
      .then((res) => res.json())
      .then((data) => {
        setRepos(data);
        // map repos to projects
        const mappedProjects = data.map(
          (
            repo: Project & {
              stargazers_count?: number;
              image?: string;
              svn_url?: string;
            }
          ) => {
            let height = Math.floor(Math.random() * (600 - 350 + 1)) + 350;
            if (repo.stargazers_count && repo.stargazers_count > 0) {
              height = 500;
            }
            return {
              id: String(repo.id), // Ensure id is a string
              name: repo.name,
              description: repo.description,
              language: repo.language,
              img: repo.image || "/projects-image.png",
              url: repo.svn_url,
              height,
            };
          }
        );
        setProjects(mappedProjects);
        setShouldShowProjects(true);
      });
  }, []);
  useEffect(() => {
    // Preload images
    projects.forEach((project) => {
      const img = new Image();
      img.src = project.img;
    });
  }, [projects]);
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
              <a href={config.resume} className="hover:underline">
                Resume
              </a>
              <a href={config.cv} className="hover:underline">
                CV
              </a>
              <a href="/contact" className="hover:underline">
                Contact
              </a>
            </nav>
          </Card>

          <Card className="bg-[#cce0ff] md:col-span-3 h-fit">
            {!shouldShowProjects ? (
              <div className="flex items-center justify-center h-full">
                <FaSpinner className="animate-spin text-4xl text-blue-500" />
                <span className="ml-2 text-lg">Loading projects...</span>
              </div>
            ) : projects.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">No projects available.</p>
              </div>
            ) : (
              <Masonry
                items={projects}
                ease="power3.out"
                duration={1}
                stagger={0.1}
                animateFrom="bottom"
                scaleOnHover={true}
                hoverScale={1.1}
                blurToFocus={false}
                colorShiftOnHover={false}
                className={`${shouldShowProjects ? "" : "hidden"}`}
              />
            )}
          </Card>

          {/* Footer Socials */}
          <Card className="bg-[#cce0ff] md:col-span-3 flex justify-end space-x-4 text-sm pt-4 uppercase animate-fadeInUp">
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
