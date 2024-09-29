"use client";
import { ArrowRightCircle } from "lucide-react";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { AsciiRenderer, OrbitControls } from "@react-three/drei";
import Model from "./Model";
import useDarkMode from "./darkmode";

export default function Home() {
  const isDarkMode = useDarkMode();

  return (
    <div className="flex flex-col items-center justify-items-center font-[family-name:var(--font-geist-sans)] overflow-y-auto mt-10 px-4">
      <main className="flex flex-col gap-10 max-w-xl">
        <div>
          <div className="text-2xl font-medium">MadLad</div>
          <span className="text-sm text-slate-500">by KOAH Labs</span>
        </div>
        <div>
          We make ads more relevant for AI native users.
          <br />
          <br />
          We help elevate brands in the context of AI responses, whether they be
          text, image, or video.
        </div>
        <button className="flex rounded-full font-medium transition-colors items-center justify-center bg-foreground text-background gap-4 hover:bg-[#383838] dark:hover:bg-[#ccc] h-12 px-8 sm:w-fit">
          <a
            className=""
            href="mailto:team@koahlabs.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Let&apos;s talk
          </a>

          <ArrowRightCircle size={16} />
        </button>

        <div className="flex flex-col gap-2">
          <div className="font-semibold">How does it work?</div>
          <span>
            MadLad ads are nested in the LLM response. We take the context of
            the query or conversation & make sure the brand&apos;s mention is
            highly relevant to the user&apos;s current interaction with the
            application.
            <br />
            <br />
            MadLad ads feel natural. They don&apos;t look like ads, they look
            like responses. The result is a more streamlined experience for the
            user, and a better outcome for the advertiser.
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <div className="font-semibold">Who are we?</div>
          <span>
            We are a team of engineers, designers and thinkers.
            <br />
            <br />
            We are based in San Francisco and are backed by South Park Commons.
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <div className="font-semibold">
            I have more questions. How can I talk to you?
          </div>
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
          <span className="flex items-center gap-2 hover:underline hover:underline-offset-4">
            KOAH Labs 2024 — San Francisco
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
            {isDarkMode ? (
              <AsciiRenderer fgColor="white" bgColor="#0a0a0a" />
            ) : (
              <AsciiRenderer fgColor="black" bgColor="white" />
            )}
          </Canvas>
        </div>
      </footer>
    </div>
  );
}
