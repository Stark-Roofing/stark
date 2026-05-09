
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { resolveMediaUrl, isIdbRef } from '../../lib/heroStorage';

// ─── Slide data ────────────────────────────────────────────────────────────────
interface Slide {
  url?: string;
  type: 'video' | 'image' | 'youtube';
  caption: string;
  alt: string;
  /** YouTube video ID (for type='youtube') */
  ytId?: string;
  /** Start time in seconds */
  ytStart?: number;
  /** End time in seconds */
  ytEnd?: number;
  /** Max play duration in seconds for local videos (overrides full length) */
  playDuration?: number;
}

const YT_ID = 'GnZgvVnHnA8'; // Lake Washington & Seattle Skyline drone film
const SLIDE_DURATION_MS = 3500; // every slide advances after 3.5s

const DEFAULT_SLIDES: Slide[] = [
  // INTRO – local MP4 drone clip (hero opener)
  { url: '/hero-drone-1.mp4', type: 'video', caption: "Your #1 Roofing Crew", alt: 'Drone aerial of Stark roofing crew' },

  // YouTube – Lake Washington aerial (short clip)
  { type: 'youtube', ytId: YT_ID, ytStart: 5, ytEnd: 10, caption: 'Serving Greater Seattle & Beyond', alt: 'Aerial Lake Washington Seattle' },

  // Custom uploaded photos & video (Brenda's edits — Apr 2026)
  { url: '/hero-custom-1.webp', type: 'image', caption: 'Aerial Precision. Every Time.',     alt: 'Stark roofing aerial' },
  { url: '/hero-custom-2.m4v',  type: 'video', caption: 'Stark Crew in Action',              alt: 'Stark roofing video', playDuration: 4 },
  { url: '/hero-custom-3.webp', type: 'image', caption: 'Safety-First. Results-Always.',    alt: 'Stark crew on roof' },
  { url: '/hero-custom-4.jpg',  type: 'image', caption: 'Serving Greater Seattle & Beyond', alt: 'Stark roofing project' },
  { url: '/hero-custom-6.webp', type: 'image', caption: 'Built to Outlast Pacific NW Weather', alt: 'Stark roofing crew' },
  { url: '/hero-custom-5.jpg',  type: 'image', caption: 'Licensed · Bonded · Insured',      alt: 'Stark crew on roof' },
];

// Load slides from localStorage (set via /admin/hero) or use defaults
function loadSlides(): Slide[] {
  try {
    const saved = localStorage.getItem('stark-hero-slides');
    if (saved) return JSON.parse(saved);
  } catch { /* ignore */ }
  return DEFAULT_SLIDES;
}

// ─── Cinematic intro overlay ────────────────────────────────────────────────────
const INTRO_LINES = [
  { text: 'STARK',            delay: 0.2, className: 'text-[clamp(4rem,14vw,11rem)] font-extrabold tracking-widest text-white leading-none font-heading' },
  { text: 'ROOFING &',        delay: 0.4, className: 'text-[clamp(1.8rem,5vw,4rem)] font-bold tracking-[0.2em] text-white/90 font-heading' },
  { text: 'RENOVATION',       delay: 0.5, className: 'text-[clamp(1.8rem,5vw,4rem)] font-bold tracking-[0.2em] text-white/90 font-heading' },
];

// ─── Component ──────────────────────────────────────────────────────────────────
const HeroSection: React.FC = () => {
  const [slides, setSlides] = useState<Slide[]>(loadSlides);
  const [currentIndex, setCurrentIndex]   = useState(0);
  // Track which slide we just left so its media stays mounted during fade-out
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);

  // Resolve any idb:// references to object URLs (for uploaded media)
  useEffect(() => {
    const initial = loadSlides();
    const hasIdb = initial.some(s => isIdbRef(s.url));
    if (!hasIdb) {
      setSlides(initial);
      return;
    }
    let revoked: string[] = [];
    (async () => {
      const resolved = await Promise.all(
        initial.map(async s => {
          if (isIdbRef(s.url)) {
            const url = await resolveMediaUrl(s.url);
            if (url) revoked.push(url);
            return { ...s, url };
          }
          return s;
        })
      );
      setSlides(resolved);
    })();
    return () => { revoked.forEach(u => URL.revokeObjectURL(u)); };
  }, []);

  const [introPhase, setIntroPhase]       = useState<'cinematic' | 'hero'>('cinematic');
  const [musicPlaying, setMusicPlaying]   = useState(false);
  const [showMusicHint, setShowMusicHint] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const videoRef    = useRef<HTMLVideoElement>(null);
  const audioRef    = useRef<HTMLAudioElement>(null);
  const timerRef    = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sectionRef  = useRef<HTMLElement>(null);

  // Parallax on scroll
  const { scrollY } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const bgY    = useTransform(scrollY, [0, 600], ['0%', '25%']);
  const textY  = useTransform(scrollY, [0, 600], ['0%', '40%']);
  const textOp = useTransform(scrollY, [0, 300], [1, 0]);

  // ── Intro → hero transition ──────────────────────────────────────────────────
  useEffect(() => {
    const t = setTimeout(() => {
      setIntroPhase('hero');
      setShowMusicHint(true);
      setTimeout(() => setShowMusicHint(false), 4000);
    }, 1500);
    return () => clearTimeout(t);
  }, []);

  // ── Slide timer & advance ────────────────────────────────────────────────────
  const advance = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setPreviousIndex(currentIndex);                       // remember outgoing slide
    setCurrentIndex(i => (i + 1) % slides.length);
    setTimeout(() => {
      setIsTransitioning(false);
      setPreviousIndex(null);                             // unmount old slide after fade
    }, 1200);                                             // matches CSS fade duration
  }, [isTransitioning, slides.length, currentIndex]);

  useEffect(() => {
    if (introPhase !== 'hero') return;
    // Every slide — image, video, or YouTube — advances after SLIDE_DURATION_MS.
    // Local videos may also fire onEnded earlier (handled by the <video> element).
    timerRef.current = setTimeout(advance, SLIDE_DURATION_MS);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [currentIndex, introPhase, advance]);

  // ── Music toggle ─────────────────────────────────────────────────────────────
  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (musicPlaying) {
      audioRef.current.pause();
      setMusicPlaying(false);
    } else {
      audioRef.current.volume = 0.35;
      audioRef.current.play().then(() => setMusicPlaying(true)).catch(() => {});
    }
  };

  const slide = slides[currentIndex];

  // ─── RENDER ─────────────────────────────────────────────────────────────────
  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ height: '100svh', minHeight: 700 }}
    >
      {/* ── Background music ────────────────────────────────────────── */}
      {/* Epic cinematic / construction vibe – royalty-free track */}
      <audio
        ref={audioRef}
        src="https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=epic-cinematic-action-9419.mp3"
        loop
        preload="none"
      />

      {/* ══════════════════════════════════════════════════════════
          PHASE 1 – CINEMATIC INTRO (first 3.8 s)
      ══════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {introPhase === 'cinematic' && (
          <motion.div
            key="intro"
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black overflow-hidden"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 1.0, ease: [0.43, 0.13, 0.23, 0.96] }}
          >
            {/* Red scanline sweep */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(180deg, transparent 40%, rgba(220,38,38,0.08) 100%)' }}
              initial={{ scaleY: 0, originY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            />

            {/* Letterbox bars */}
            <motion.div className="absolute top-0 left-0 right-0 h-[10vh] bg-black z-10"
              initial={{ scaleY: 1 }} animate={{ scaleY: 0, originY: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }} />
            <motion.div className="absolute bottom-0 left-0 right-0 h-[10vh] bg-black z-10"
              initial={{ scaleY: 1 }} animate={{ scaleY: 0, originY: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }} />

            {/* Stark black logo — centred on pure black */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.18 }}
              transition={{ delay: 0.3, duration: 1.5 }}
            >
              <img
                src="/stark-logo-rebrand.png"
                alt="Stark Roofing"
                className="w-[60vw] max-w-lg object-contain"
                style={{ filter: 'brightness(0.9) saturate(0.6)' }}
              />
            </motion.div>

            {/* Stark logo mark — glows above text */}
            <motion.div
              className="relative z-20 mb-2"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <img
                src="/stark-logo-rebrand.png"
                alt="Stark Roofing"
                className="w-32 md:w-44 mx-auto object-contain drop-shadow-[0_0_40px_rgba(220,38,38,0.4)]"
              />
            </motion.div>

            {/* Text lines */}
            <div className="relative z-20 text-center px-6 flex flex-col items-center gap-1">
              {INTRO_LINES.map((line, i) => (
                <div key={i} className="overflow-hidden">
                  <motion.div
                    className={line.className}
                    initial={{ y: '110%', opacity: 0 }}
                    animate={{ y: '0%', opacity: 1 }}
                    transition={{ delay: line.delay, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {line.text}
                  </motion.div>
                </div>
              ))}

              {/* Tagline */}
              <div className="overflow-hidden mt-4">
                <motion.p
                  className="text-sm md:text-base text-white/50 tracking-[0.3em] uppercase font-light"
                  initial={{ y: '110%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  Built to Last · GAF Certified
                </motion.p>
              </div>

              {/* Red accent line */}
              <motion.div
                className="h-[2px] bg-red-600 mt-6"
                initial={{ width: 0 }}
                animate={{ width: '140px' }}
                transition={{ delay: 0.8, duration: 0.5, ease: 'easeOut' }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════════════════
          PHASE 2 – HERO CAROUSEL (slides after intro)
      ══════════════════════════════════════════════════════════ */}
      {/* Parallax wrapper */}
      <motion.div className="absolute inset-0 w-full h-full" style={{ y: bgY, willChange: 'transform' }}>
        {slides.map((s, i) => {
          const isActive   = i === currentIndex && introPhase === 'hero';
          const isPrevious = i === previousIndex;
          // Mount media if active OR previous (so fade-out has something to fade from)
          const shouldMount = isActive || isPrevious;
          return (
          <div
            key={i}
            className="absolute inset-0 w-full h-full transition-opacity duration-[1200ms] ease-in-out"
            style={{ opacity: isActive ? 1 : 0, zIndex: isActive ? 2 : isPrevious ? 1 : 0 }}
          >
            {s.type === 'video' ? (
              /* Only mount the <video> when this slide is active or fading out */
              shouldMount ? (
                <video
                  key={`video-${i}-${currentIndex === i ? 'on' : 'off'}`}
                  ref={i === 0 ? videoRef : undefined}
                  src={s.url}
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  playsInline
                  onEnded={advance}
                />
              ) : (
                <div className="absolute inset-0 bg-gray-900" />
              )
            ) : s.type === 'youtube' ? (
              /* Full-bleed YouTube background — only mounted when truly active (not fading out) */
              isActive ? (
                <div className="absolute inset-0 overflow-hidden bg-black">
                  <iframe
                    src={`https://www.youtube.com/embed/${s.ytId}?start=${s.ytStart ?? 0}&end=${s.ytEnd ?? 999}&autoplay=1&mute=1&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1&playsinline=1`}
                    allow="autoplay; encrypted-media"
                    title="Background drone footage"
                    style={{
                      position: 'absolute',
                      /* Letterbox-free full-bleed sizing trick */
                      width: '177.78vh',   /* 16/9 × 100vh */
                      height: '56.25vw',  /* 9/16 × 100vw */
                      minWidth: '100%',
                      minHeight: '100%',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      border: 'none',
                      pointerEvents: 'none',
                    }}
                  />
                </div>
              ) : (
                /* Placeholder while not active — dark bg to avoid flash */
                <div className="absolute inset-0 bg-gray-900" />
              )
            ) : (
              shouldMount ? (
                <img
                  src={s.url}
                  alt={s.alt}
                  className="w-full h-full object-cover"
                  loading={i === 0 ? 'eager' : 'lazy'}
                />
              ) : (
                <div className="absolute inset-0 bg-gray-900" />
              )
            )}
            {/* Cinematic gradient overlay */}
            <div className="absolute inset-0"
              style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.65) 100%)' }} />
          </div>
          );
        })}
      </motion.div>

      {/* ── Hero text content ──────────────────────────────────── */}
      <AnimatePresence>
        {introPhase === 'hero' && (
          <motion.div
            key="hero-content"
            className="absolute inset-0 z-20 flex flex-col justify-center items-center px-4"
            style={{ y: textY, opacity: textOp }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center max-w-5xl mt-16">
              {/* Brand name */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <h1 className="text-[clamp(2.8rem,9vw,7.5rem)] font-extrabold text-white leading-none font-heading tracking-tight drop-shadow-2xl">
                  <span className="text-red-500">STARK</span> ROOFING
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              >
                <h1 className="text-[clamp(2.8rem,9vw,7.5rem)] font-extrabold text-white leading-none font-heading tracking-tight drop-shadow-2xl">
                  & RENOVATION
                </h1>
              </motion.div>

              {/* Divider */}
              <motion.div
                className="flex items-center justify-center gap-4 my-5"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.7, delay: 0.45 }}
              >
                <div className="h-px w-24 bg-red-500/60" />
                <div className="h-px w-24 bg-red-500/60" />
              </motion.div>

              {/* Subtitle badges */}
              <motion.div
                className="flex flex-wrap justify-center gap-3 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.55 }}
              >
                {['GAF Certified', 'Licensed & Bonded', 'Free Estimates'].map((badge) => (
                  <span key={badge}
                    className="px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold tracking-wider text-white border border-white/30 bg-white/10 backdrop-blur-sm">
                    {badge}
                  </span>
                ))}
              </motion.div>

              {/* CTA */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold text-base md:text-lg rounded-full shadow-2xl tracking-wide transition-colors duration-300"
                  whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(220,38,38,0.5)' }}
                  whileTap={{ scale: 0.97 }}
                >
                  🏠 Get a Free Estimate
                </motion.a>
                <motion.a
                  href="tel:2067398232"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold text-base md:text-lg rounded-full border border-white/30 transition-colors duration-300"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  📞 (206) 739-8232
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Slide caption ──────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {introPhase === 'hero' && (
          <motion.div
            key={currentIndex}
            className="absolute bottom-24 left-0 right-0 z-30 text-center pointer-events-none"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-white/70 text-xs md:text-sm tracking-[0.3em] uppercase font-light">
              {slide.caption}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Slide dot indicators ───────────────────────────────── */}
      {introPhase === 'hero' && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => { if (!isTransitioning) { setCurrentIndex(i); setIsTransitioning(true); setTimeout(() => setIsTransitioning(false), 800); } }}
              className={`rounded-full transition-all duration-500 ${i === currentIndex ? 'w-8 h-2 bg-red-500' : 'w-2 h-2 bg-white/40'}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* ── Edit Hero button (dev only) ────────────────────────── */}
      {introPhase === 'hero' && typeof window !== 'undefined' &&
        (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') && (
          <a
            href="/admin/hero"
            className="absolute top-20 left-4 z-40 flex items-center gap-2 px-3 py-2 rounded-full bg-red-600/90 hover:bg-red-500 backdrop-blur-sm border border-white/20 text-white text-xs font-bold shadow-lg transition-colors"
            title="Edit hero videos & photos"
          >
            ✏️ EDIT HERO
          </a>
      )}

      {/* ── Music toggle ───────────────────────────────────────── */}
      <AnimatePresence>
        {introPhase === 'hero' && (
          <motion.button
            key="music-btn"
            onClick={toggleMusic}
            className="absolute top-20 right-4 z-40 flex items-center gap-2 px-3 py-2 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 text-white text-xs hover:bg-black/60 transition-colors"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.0 }}
            title={musicPlaying ? 'Mute music' : 'Play music'}
          >
            {musicPlaying ? (
              <>
                <span className="music-bars">
                  <span /><span /><span /><span />
                </span>
                <span>SOUND ON</span>
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
                </svg>
                <span>SOUND OFF</span>
              </>
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Music hint toast ───────────────────────────────────── */}
      <AnimatePresence>
        {showMusicHint && (
          <motion.div
            className="absolute bottom-24 right-4 z-40 px-4 py-2 rounded-xl bg-black/70 backdrop-blur-sm text-white/80 text-xs border border-white/10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            🎵 Tap SOUND to enable music
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Scroll indicator ──────────────────────────────────── */}
      {introPhase === 'hero' && (
        <motion.div
          className="absolute bottom-10 left-4 z-30 hidden md:flex flex-col items-center gap-1.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            className="w-[1px] h-10 bg-white/40"
            animate={{ scaleY: [1, 0.3, 1], originY: 0 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <span className="text-white/40 text-[10px] tracking-[0.3em] uppercase rotate-90 mt-4">scroll</span>
        </motion.div>
      )}
    </section>
  );
};

export default HeroSection;
