"use client";

import Image from "next/image";
import Card from "../Card";
import ClickSpark from "@/Animations/ClickSpark/ClickSpark";
import Link from "next/link";
import config from "@/config";
import { TfiEmail } from "react-icons/tfi";
import { BsWhatsapp } from "react-icons/bs";

export default function Home() {
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
              <a href="/contact" className="hover:underline">
                Contact
              </a>
            </nav>
          </Card>

          <Image
            src="/profile-image.png"
            alt="Profile Picture"
            width={500}
            height={500}
            className="rounded-2xl shadow bg-[#cce0ff] col-span-1 h-full aspect-[4:5] object-cover"
          />

          {/* Contact Box */}
          <Card className="bg-[#99b3ff] p-6 flex flex-col md:col-span-2 justify-between min-h-56 overflow-hidden relative">
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold">Contact Me</h2>
              <p className="text-sm">
                I love connecting with people. Whether you have a question, want
                to collaborate, or just want to say hi, feel free to reach out!
              </p>
              <a
                href="mailto:mohiuddinlive@gmail.com
                "
                className="text-black hover:underline"
              >
                <TfiEmail className="inline-block mr-2" /> Email me
              </a>
                <a
                    href="https://wa.me/923218108000"
                    className="text-black hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <BsWhatsapp className="inline-block mr-2" /> WhatsApp me
                </a>
            </div>
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
