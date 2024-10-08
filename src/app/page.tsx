"use client";
import { useEffect, useState } from "react";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { AsciiRenderer, OrbitControls } from "@react-three/drei";
import Model from "./Model";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import Marquee from "react-fast-marquee";
import Image from "next/image";

export function Carousel() {
  const [width, setWidth] = useState(700);
  const [height, setHeight] = useState(500);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setWidth(isMobile ? 350 : 700);
      setHeight(isMobile ? 250 : 500);
    };

    handleResize(); // Set initial size
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Marquee style={{ width: "100%" }}>
      {[
        { src: "/text.png", alt: "text", caption: "Integrated text ads" },
        { src: "/image.png", alt: "image", caption: "Image based ads" },
        {
          src: "/recommendation.png",
          alt: "recommendation",
          caption: "Recommendation to nudge the user",
        },
        {
          src: "/gallery.png",
          alt: "gallery",
          caption: "Context relevant carousel ads",
        },
      ].map((item, index) => (
        <div key={index} className="flex flex-col items-start gap-1 ml-2">
          <Image
            src={item.src}
            alt={item.alt}
            width={width}
            height={height}
            style={{ width: width, height: height }}
          />
          <span className="text-muted-foreground text-sm sm:text-base">
            {item.caption}
          </span>
        </div>
      ))}
    </Marquee>
  );
}

function ChatBubble({
  side,
  content,
}: {
  side: "left" | "right";
  content: React.ReactNode;
}) {
  return (
    <div
      className={`flex ${side === "left" ? "justify-start" : "justify-end"}`}
    >
      <div
        className={`p-3 max-w-xs ${
          side === "left"
            ? "rounded-t-2xl rounded-br-2xl rounded-bl-sm bg-blue-500 text-white"
            : "rounded-t-2xl rounded-bl-2xl rounded-br-sm bg-slate-200 text-black"
        }`}
      >
        {content}
      </div>
    </div>
  );
}

export default function Home() {
  const isDarkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [currentWord, setCurrentWord] = useState("text");

  useEffect(() => {
    let index = 0;
    const words = ["text", "image", "video"];
    const intervalId = setInterval(() => {
      index = (index + 1) % words.length;
      setCurrentWord(words[index]);
    }, 2400);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col items-center justify-items-center font-[family-name:var(--font-geist-sans)] overflow-y-auto mt-10 px-4">
      <main className="flex flex-col gap-20 justify-center items-center w-full">
        <header className="flex items-center justify-center w-full fixed top-0 py-4 z-10 bg-card px-4 sm:px-0">
          <div className="flex items-center gap-2 max-w-xl w-full justify-between">
            <div className="text-2xl font-medium">MadLad</div>
            <button className="rounded-full text-sm font-medium transition-colors bg-foreground text-accent hover:bg-[#383838] dark:hover:bg-[#ccc] h-8 px-4">
              Get Started
            </button>
          </div>
        </header>

        <div className="flex flex-col justify-center mt-28 mb-12 max-w-xl w-full">
          <h1 className="text-4xl font-medium">
            Next-gen Ad Network for{" "}
            <AnimatePresence mode="wait">
              <motion.span
                key={currentWord}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-block"
              >
                {currentWord}
              </motion.span>
            </AnimatePresence>
            <br />
            AI Applications
          </h1>
          <br />
          <span className="text-lg">
            Let&apos;s unlock a new chapter in advertising.
          </span>

          <div className="flex gap-2 text-sm mt-8">
            <button className="flex rounded-full font-medium transition-colors items-center justify-center bg-foreground text-accent hover:bg-[#383838] dark:hover:bg-[#ccc] sm:h-10 h-8 px-4 sm:w-fit">
              Get Started
            </button>
          </div>
        </div>

        <Carousel />

        <div className="flex flex-col gap-8 max-w-xl w-full">
          <div className="font-medium text-3xl">
            Ads that feel like part of the conversation.
          </div>
          <span>
            MadLad ads feel natural. They don&apos;t look like ads, they look
            like responses. The result is a more streamlined experience for the
            user, and a better outcome for the advertiser.
            <br />
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            {[
              {
                icon: "💡",
                title: "Seamless Integration",
                description:
                  "Ads blend naturally with AI responses, enhancing user experience.",
              },
              {
                icon: "🎯",
                title: "Higher Engagement",
                description:
                  "Contextual relevance leads to increased user interaction and click-through rates.",
              },
              {
                icon: "🔍",
                title: "Precise Targeting",
                description:
                  "AI-driven ads match user intent, improving ad effectiveness.",
              },
              {
                icon: "📈",
                title: "Better ROI",
                description:
                  "Improved relevance and engagement lead to higher return on ad spend.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-secondary dark:bg-[#1C1C1C] border-secondary dark:border-[#262626] border p-4 rounded-lg flex flex-col gap-2"
              >
                <div className="text-2xl mb-4">{item.icon}</div>
                <h3 className="font-semibold mb-1">{item.title}</h3>
                <p className="text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 max-w-xl w-full">
          <div className="text-2xl font-semibold">
            Ads that enhance the app experience.
          </div>
          <span>
            Your app should not sacrifice user experience for ads. MadLad ads
            enhance the app experience, not degrade it.
          </span>

          <div className="flex flex-col gap-4 mt-6 p-4">
            <ChatBubble
              side="right"
              content="What kind of product should I get?"
            />
            <ChatBubble
              side="left"
              content={
                <>
                  Based on your interests, I&apos;d recommend the new XYZ
                  Smartwatch. It has great fitness tracking features and long
                  battery life <sub className="text-xs">Ad</sub>
                </>
              }
            />
            <ChatBubble side="right" content="Great, thank you!" />
          </div>
        </div>

        <div className="flex flex-col gap-2 max-w-xl w-full">
          <div className="text-2xl font-semibold">Who are we?</div>
          <span>
            We are a team of engineers, designers and thinkers.
            <br />
            We are based in San Francisco and are backed by South Park Commons.
          </span>
        </div>

        <div className="flex flex-col gap-2 max-w-xl w-full">
          <div className="text-2xl font-semibold">Still have questions?</div>
          <span>
            <a
              className="flex items-center gap-2 hover:underline hover:underline-offset-4"
              href="mailto:team@koahlabs.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              team@koahlabs.com
            </a>
          </span>
        </div>
      </main>

      <footer className="flex flex-col items-center justify-between w-full max-w-xl mt-12 gap-10 text-slate-500">
        <div className="flex items-center justify-between w-full">
          <span className="flex flex-col sm:flex-row items-start gap-2 hover:underline hover:underline-offset-4 text-center sm:text-left">
            <span>KOAH Labs 2024</span>
            <span>San Francisco</span>
          </span>
          <div className="flex grow-1" />

          <div className="flex items-center gap-4">
            <a
              className="flex items-center gap-1 hover:underline hover:underline-offset-4"
              href="https://x.com/koahlabs"
              target="_blank"
              rel="noopener noreferrer"
            >
              𝕏.COM
            </a>

            <a
              className="flex items-center gap-1 hover:underline hover:underline-offset-4"
              href="mailto:team@koahlabs.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              CONTACT
            </a>
          </div>
        </div>
        <div className="w-screen h-60">
          <Canvas camera={{ position: [0, 0, 6] }}>
            <Suspense fallback={null}>
              <color attach="background" args={["#000"]} />
              <Model />
            </Suspense>
            <OrbitControls />
            <AsciiRenderer
              fgColor={isDarkTheme ? "white" : "black"}
              bgColor={isDarkTheme ? "#121212" : "white"}
              key={isDarkTheme.toString()} // Add this line to force re-render when theme changes
            />
          </Canvas>
        </div>
      </footer>
    </div>
  );
}
