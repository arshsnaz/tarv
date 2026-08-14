import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Play } from "lucide-react";
import { Reveal } from "./reveal";

/**
 * Scroll distance (px) that advances the video by one second.
 * Larger = slower, smoother scrub (Endra-style long hero scroll).
 */
const PX_PER_SECOND = 260;
const HERO_VIDEO_START_TIME = 0;
const heroVideoSrc = "https://tarvvdo.b-cdn.net/ref1.mp4";
const logoSrc = `${import.meta.env.BASE_URL}favicon.png`;

export function HomeHero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background pt-28 pb-16"
    >
      {/* Light background grid & ambient light radial gradient */}
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-70" />
      <div className="pointer-events-none absolute top-1/3 left-1/2 h-[450px] w-[650px] -translate-x-1/2 -translate-y-1/2 halo blur-3xl opacity-50" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <Reveal>
          <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/5 px-3.5 py-1.5 text-xs font-medium text-black/85 backdrop-blur-sm dark:border-white/20 dark:bg-white/10 dark:text-white/85">
            <img src={logoSrc} alt="TARV logo" className="size-4 shrink-0 object-contain" />
            Introducing TARV 1.0 — Now in private beta
          </div>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="text-balance mt-8 font-display text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl">
            The Future of{" "}
            <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-slate-900 via-blue-600 to-blue-500 bg-clip-text text-transparent dark:from-white dark:via-blue-400 dark:to-blue-500">
              MEP Engineering.
            </span>
          </h1>
        </Reveal>

        <Reveal delay={140}>
          <p className="text-balance mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Design HVAC systems, generate equipment schedules, perform airflow calculations, and
            optimize buildings with AI.
          </p>
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/access"
              className="shadow-soft inline-flex items-center gap-2 rounded-full bg-neutral-900 px-6 py-3.5 font-medium text-white transition hover:opacity-90 dark:bg-white dark:text-neutral-900"
            >
              Request access
              <ArrowRight size={16} />
            </Link>

            <a
              href="#platform"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("platform")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 rounded-full border border-black/25 bg-black/5 px-6 py-3.5 font-medium text-black backdrop-blur-sm transition hover:bg-black/10 dark:border-white/25 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
            >
              <Play size={15} />
              Watch demo
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function VideoHero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure seamless 60fps playback
    video.play().catch(() => {});
  }, []);

  return (
    <section
      id="video"
      className="relative bg-black h-screen overflow-hidden flex items-center justify-center"
    >
      <div className="relative h-full w-full overflow-hidden">
        {/* Native 60fps hardware-accelerated video background */}
        <video
          ref={videoRef}
          className="pointer-events-none absolute inset-0 size-full object-cover"
          src={heroVideoSrc}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
        />

        <div className="relative flex h-full flex-col items-center justify-center px-6 text-center pointer-events-none">
          {/* Pure video showcase */}
        </div>
      </div>
    </section>
  );
}

export function Hero() {
  return (
    <>
      <HomeHero />
      <VideoHero />
    </>
  );
}