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
const heroVideoSrc = `${import.meta.env.BASE_URL}ref1.mp4`;
const logoSrc = `${import.meta.env.BASE_URL}favicon.png`;

export function Hero() {
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

  // Scroll-scrubbed playback: the video never autoplays, scroll drives currentTime.
  useEffect(() => {
    if (!duration) return;
    const targetTimeRef = { current: HERO_VIDEO_START_TIME };
    let frame = 0;

    const syncTargetTime = () => {
      const section = sectionRef.current;
      const video = videoRef.current;
      if (!section || !video) return;
      const scrollTop = document.scrollingElement?.scrollTop ?? window.scrollY;
      const scrolled = Math.min(
        Math.max(scrollTop - section.offsetTop, 0),
        Math.max(duration - HERO_VIDEO_START_TIME - 0.05, 0) * PX_PER_SECOND,
      );
      targetTimeRef.current = Math.min(
        HERO_VIDEO_START_TIME + scrolled / PX_PER_SECOND,
        duration - 0.05,
      );
    };

    const tick = () => {
      frame = 0;
      const video = videoRef.current;
      if (!video) return;

      const targetTime = targetTimeRef.current;
      const currentTime = video.currentTime;
      const delta = targetTime - currentTime;

      if (Number.isFinite(delta) && Math.abs(delta) > 0.01) {
        const nextTime = currentTime + delta * 0.18;
        try {
          if (typeof video.fastSeek === "function" && Math.abs(delta) > 0.25) video.fastSeek(nextTime);
          else video.currentTime = nextTime;
        } catch {
          video.currentTime = nextTime;
        }
        frame = requestAnimationFrame(tick);
      }
    };

    const schedule = () => {
      syncTargetTime();
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const video = videoRef.current;
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [duration]);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative bg-black"
      style={{ height: `calc(100vh + ${(duration || 6) * PX_PER_SECOND}px)` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* pure scroll-scrubbed background video — no overlays, grid or particles */}
        <video
          ref={videoRef}
          className="pointer-events-none absolute inset-0 size-full object-cover"
          src={heroVideoSrc}
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
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

        <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
          <div
            className="mx-auto max-w-5xl"
            style={{ textShadow: "0 2px 24px rgba(0,0,0,.55)" }}
          >
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white/85 backdrop-blur-sm">
                <img src={logoSrc} alt="TARV logo" className="size-4 shrink-0 object-contain" />
                Introducing TARV 1.0 — Now in private beta
              </div>
            </Reveal>

            <Reveal delay={80}>
              <h1
                className="text-balance mt-8 font-bold leading-[0.95] tracking-tight text-white"
                style={{ fontSize: "clamp(2.5rem,7vw,6.5rem)" }}
              >
                The Future of
                <br />
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(100deg,#ffffff 0%,#cfe0ff 40%,var(--brand,#4a86ff) 100%)",
                  }}
                >
                  MEP Engineering.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={140}>
              <p className="text-balance mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl">
                Design HVAC systems, generate equipment schedules, perform airflow calculations, and
                optimize buildings with AI.
              </p>
            </Reveal>

            <Reveal delay={200}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                <Link
                  to="/access"
                  className="shadow-soft inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 font-medium text-neutral-900 transition hover:opacity-90"
                >
                  Request access
                  <ArrowRight size={16} />
                </Link>

                <a
                  href="#platform"
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3.5 font-medium text-white backdrop-blur-sm transition hover:bg-white/20"
                >
                  <Play size={15} />
                  Watch demo
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}