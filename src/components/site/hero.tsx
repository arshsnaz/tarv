import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Play } from "lucide-react";
import { Reveal } from "./reveal";

/**
 * Scroll distance (px) that advances the video by one second.
 * 240px keeps video 100% fixed/sticky until the entire video finishes.
 */
const PX_PER_SECOND = 240;
const HERO_VIDEO_START_TIME = 0;
const heroVideoSrc = `${import.meta.env.BASE_URL}ref1.mp4`;
const logoSrc = `${import.meta.env.BASE_URL}favicon.png`;

export function HomeHero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background pt-28 pb-16"
    >
      {/* Light background grid */}
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-90" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        {/* Ambient blue lens halo mathematically centered directly behind headline (toned to 60% brightness) */}
        <div className="pointer-events-none absolute top-[38%] left-1/2 h-[550px] w-[850px] -translate-x-1/2 -translate-y-1/2 halo blur-3xl opacity-50" />

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
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const syncDuration = () => {
      const video = videoRef.current;
      if (!video) return;
      const nextDuration = video.duration;
      if (Number.isFinite(nextDuration) && nextDuration > 0) {
        setDuration(nextDuration);
      }
    };

    syncDuration();
    const video = videoRef.current;
    video?.addEventListener("loadedmetadata", syncDuration);
    video?.addEventListener("durationchange", syncDuration);
    const interval = window.setInterval(syncDuration, 100);
    return () => {
      window.clearInterval(interval);
      video?.removeEventListener("loadedmetadata", syncDuration);
      video?.removeEventListener("durationchange", syncDuration);
    };
  }, []);

  // Butter-smooth 60FPS scroll-scrubbed playback physics with crisp 4K GPU decoding
  useEffect(() => {
    if (!duration) return;
    let targetTime = HERO_VIDEO_START_TIME;
    let currentAnimTime = HERO_VIDEO_START_TIME;
    let animationFrameId: number;

    const updateTargetTime = () => {
      const section = sectionRef.current;
      if (!section) return;
      const scrollTop = document.scrollingElement?.scrollTop ?? window.scrollY;
      const sectionTop = section.offsetTop;
      const scrollOffset = Math.max(0, scrollTop - sectionTop);
      const maxScroll = duration * PX_PER_SECOND;
      const progress = Math.min(1, Math.max(0, scrollOffset / maxScroll));
      targetTime = progress * (duration - 0.05);
    };

    const renderLoop = () => {
      const video = videoRef.current;
      if (video) {
        const diff = targetTime - currentAnimTime;
        // Frame-accurate seek threshold (0.033s = ~1 frame at 30fps)
        // This gives Chrome GPU decoder enough time to render crisp full-resolution frames without blur or stutter!
        if (Math.abs(diff) >= 0.033) {
          currentAnimTime += diff * 0.22;
          if (!video.seeking) {
            try {
              video.currentTime = currentAnimTime;
            } catch {
              // Ignore boundary seek errors
            }
          }
        }
      }
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    updateTargetTime();
    animationFrameId = requestAnimationFrame(renderLoop);

    window.addEventListener("scroll", updateTargetTime, { passive: true });
    window.addEventListener("resize", updateTargetTime, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("scroll", updateTargetTime);
      window.removeEventListener("resize", updateTargetTime);
    };
  }, [duration]);

  return (
    <section
      id="video"
      ref={sectionRef}
      className="relative bg-black"
      style={{ height: `calc(100vh + ${(duration || 6) * PX_PER_SECOND}px)` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* pure scroll-scrubbed background video with top-left origin scale to push bottom-right watermark completely offscreen */}
        <video
          ref={videoRef}
          className="pointer-events-none absolute inset-0 size-full object-cover scale-[1.22] origin-top-left select-none"
          src={heroVideoSrc}
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          controlsList="nodownload no-remote-playback noremoteplayback"
          disablePictureInPicture
          disableRemotePlayback
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
          onLoadedMetadata={(e) => {
            const v = e.currentTarget;
            v.pause();
            v.currentTime = HERO_VIDEO_START_TIME;
            if (Number.isFinite(v.duration)) setDuration(v.duration);
          }}
          onDurationChange={(e) => {
            const d = e.currentTarget.duration;
            if (Number.isFinite(d) && d > 0) setDuration(d);
          }}
        />

        {/* Full-width cinematic gradient fade to naturally blend video bottom into section */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-44 bg-gradient-to-t from-black via-black/80 to-transparent" />

        <div className="relative flex h-full flex-col items-center justify-center px-6 text-center pointer-events-none">
          {/* Pure video section with no text overlay */}
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