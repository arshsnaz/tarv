import { Reveal } from "./reveal";

const firms = ["AECOM", "ARUP", "WSP", "JACOBS", "STANTEC", "MOTT MACDONALD"];

import { ArrowRight } from "lucide-react";

export function TrustedBy() {
 return (
 <section className="border-y border-border py-16 md:py-20 overflow-hidden">
 <div className="mx-auto max-w-full text-center relative">
 <p className="mb-10 text-xs tracking-[0.2em] text-muted-foreground uppercase px-6">
 Trusted by engineers at world-class firms
 </p>
 <div className="relative flex overflow-hidden max-w-7xl mx-auto mask-marquee">
 <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
 <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
 
 <div className="flex shrink-0 animate-marquee items-center opacity-60">
 {/* Duplicated list for seamless looping */}
 {[...firms, ...firms, ...firms, ...firms].map((f, i) => (
 <span key={`${f}-${i}`} className="font-display text-xl font-bold tracking-wider mx-8 md:mx-12 whitespace-nowrap">
 {f}
 </span>
 ))}
 </div>
 </div>
 </div>
 </section>
 );
}

export function Platform() {
 return (
 <section id="platform" className="relative py-28 md:py-32 min-h-[100dvh] flex items-center overflow-hidden">
 <div className="mx-auto max-w-7xl px-6 w-full">
 <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
 
 {/* Left Column - Content */}
 <Reveal className="max-w-xl">
 <h2 className="text-balance text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
 Built for MEP <br className="hidden md:block" /> Engineers
 </h2>
 <p className="mt-8 text-lg md:text-xl leading-relaxed text-muted-foreground">
 Whether you're designing electrical, HVAC, plumbing, or fire protection systems, our platform is built for MEP engineers. AI-powered, deeply technical, incredibly fast, and effortless to use.
 </p>
 <div className="mt-10">
 <a
 href="/access"
 className="inline-flex items-center justify-center gap-2 bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-lg transition-all hover:-translate-y-1 hover:shadow-primary/25"
 >
 Request access <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
 </a>
 </div>
 </Reveal>

 {/* Right Column - Media */}
 <Reveal delay={150} className="relative mx-auto w-full max-w-[600px] lg:mx-0 lg:max-w-none">
 {/* Ambient glow behind the video */}
 <div className="absolute inset-0 -z-10 bg-brand-soft/20 blur-[100px]" />
 
 <div className="glass shadow-glass -[2rem] p-3 transition-all duration-500 hover:shadow-brand-soft/20">
 <div className="relative overflow-hidden -[1.5rem] bg-zinc-950 border border-white/10 dark:border-white/5">
 <video 
 src="/ref2.mp4"
 autoPlay
 loop
 muted
 playsInline
 className="w-full object-cover scale-[1.02]"
 />
 </div>
 </div>
 </Reveal>

 </div>
 </div>
 </section>
 );
}
