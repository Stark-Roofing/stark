
/**
 * CinematicScrollSection
 * ──────────────────────
 * Apple/Instagram-reel-style scroll-driven storytelling section.
 *
 * HOW IT WORKS:
 *  • The outer wrapper is `position: sticky` – it pins while you scroll.
 *  • Inside, horizontal text slides / image reveals are driven by
 *    Framer Motion's `useScroll` + `useTransform`.
 *  • 5 "chapters" each occupy one viewport-height of scroll distance.
 */

import React, { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from 'framer-motion';

// ─── Chapter data ──────────────────────────────────────────────────────────────
const CHAPTERS = [
  {
    number: '01',
    headline: 'WE SHOW UP',
    sub: 'On time. In full gear. Every single job.',
    body: 'Every Stark crew member arrives with the right safety equipment and the experience to back it up. No shortcuts. No excuses.',
    image: '/hero2-1.webp',
    accent: '#ef4444', // red
  },
  {
    number: '02',
    headline: 'AERIAL PRECISION',
    sub: 'Drone-inspected. Detail-obsessed.',
    body: 'We use aerial drone inspection on every major project — giving you photos your competitors can\'t even offer.',
    image: '/hero2-2.webp',
    accent: '#3b82f6', // blue
  },
  {
    number: '03',
    headline: '30+ YEARS STRONG',
    sub: '2,000+ roofs. Three decades. One standard.',
    body: 'With 30+ years of hands-on roofing experience and over 2,000 completed roofs across the Puget Sound, Stark has earned its reputation the only way that matters — one home at a time.',
    image: '/hero2-3.webp',
    accent: '#f59e0b', // amber
  },
  {
    number: '04',
    headline: 'ZERO LEAKS',
    sub: 'We treat your home like our own.',
    body: 'From Seattle to Snohomish, our lifetime workmanship warranty means if it ever leaks — we\'re back. No charge. No argument.',
    image: '/hero2-4.webp',
    accent: '#10b981', // emerald
  },
  {
    number: '05',
    headline: 'GET YOUR FREE QUOTE',
    sub: 'Takes 60 seconds. Saves you thousands.',
    body: 'Join 500+ Washington homeowners who chose Stark. Call (206) 739-8232 or fill out our estimate form — we\'ll respond within the hour.',
    image: '/hero2-5.webp',
    accent: '#ef4444',
    cta: true,
  },
];

const TOTAL_CHAPTERS = CHAPTERS.length;

// ─── ChapterSlide ──────────────────────────────────────────────────────────────
interface ChapterSlideProps {
  chapter: (typeof CHAPTERS)[0];
  index: number;
  progress: MotionValue<number>;
  totalChapters: number;
}

const ChapterSlide: React.FC<ChapterSlideProps> = ({ chapter, index, progress, totalChapters }) => {
  const start  = index / totalChapters;
  const end    = (index + 1) / totalChapters;

  // Image: slides in from right, centres, then exits left
  const imgX = useTransform(
    progress,
    [start, (start + end) / 2, end],
    ['100%', '0%', '-100%']
  );
  const imgScale = useTransform(progress, [start, (start + end) / 2, end], [1.1, 1.0, 0.95]);

  // Text: fades + rises in, then fades out — WIDER window so content is readable
  const textY = useTransform(progress, [start, (start + end) / 2, end], ['4rem', '0rem', '-4rem']);
  const textOpacity = useTransform(
    progress,
    [start, start + 0.03, end - 0.03, end],
    [0, 1, 1, 0]
  );

  // Chapter number counter
  const numOpacity = useTransform(
    progress,
    [start, start + 0.03, end - 0.03, end],
    [0, 1, 1, 0]
  );

  return (
    <div className="absolute inset-0 flex flex-col md:flex-row overflow-hidden">
      {/* ── Image panel ── */}
      <motion.div
        className="relative w-full md:w-1/2 h-[40%] md:h-full overflow-hidden"
        style={{ x: imgX }}
      >
        <motion.img
          src={chapter.image}
          alt={chapter.headline}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ scale: imgScale }}
          loading="lazy"
        />
        {/* Colour overlay */}
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${chapter.accent}22, transparent 60%)` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/40" />
      </motion.div>

      {/* ── Text panel ── */}
      <motion.div
        className="relative w-full md:w-1/2 h-[60%] md:h-full flex flex-col justify-center items-center md:items-start text-center md:text-left px-6 md:px-16 bg-[#0a0a0a]"
        style={{ y: textY, opacity: textOpacity }}
      >
        <div className="relative z-10 w-full max-w-md text-center md:text-left">
          {/* Chapter number — sits directly above the accent line */}
          <motion.span
            className="block text-3xl md:text-[2.5rem] font-extrabold leading-none select-none mb-3 pointer-events-none"
            style={{ color: `${chapter.accent}99`, opacity: numOpacity }}
          >
            {chapter.number}
          </motion.span>

          {/* Accent line */}
          <motion.div
            className="h-1 w-12 rounded-full mb-6 mx-auto md:mx-0"
            style={{ backgroundColor: chapter.accent }}
            initial={false}
          />

          <h3 className="text-[clamp(2rem,5vw,4rem)] font-extrabold text-white leading-tight tracking-tight mb-3 font-heading text-center md:text-left">
            {chapter.headline}
          </h3>
          <p className="text-lg md:text-xl font-semibold mb-4 text-center md:text-left" style={{ color: chapter.accent }}>
            {chapter.sub}
          </p>
          <p className="text-white/60 text-sm md:text-base leading-relaxed mb-8 text-center md:text-left">
            {chapter.body}
          </p>

          {chapter.cta && (
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full text-sm tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(220,38,38,0.5)]"
              >
                Free Estimate
              </a>
              <a
                href="tel:2067398232"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-white/20 text-white font-semibold rounded-full text-sm tracking-wide hover:bg-white/10 transition-all duration-300"
              >
                (206) 739-8232
              </a>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

// ─── ChapterWrapper — owns its own useTransform hook (no hooks-in-map) ────────
const ChapterWrapper: React.FC<{
  chapter: (typeof CHAPTERS)[0];
  index: number;
  smoothProgress: MotionValue<number>;
}> = ({ chapter, index, smoothProgress }) => {
  const slideStart = index / TOTAL_CHAPTERS;
  const slideEnd = (index + 1) / TOTAL_CHAPTERS;
  const slideOpacity = useTransform(
    smoothProgress,
    [slideStart, slideStart + 0.02, slideEnd - 0.02, slideEnd],
    [0, 1, 1, 0]
  );

  return (
    <motion.div className="absolute inset-0" style={{ opacity: slideOpacity }}>
      <ChapterSlide
        chapter={chapter}
        index={index}
        progress={smoothProgress}
        totalChapters={TOTAL_CHAPTERS}
      />
    </motion.div>
  );
};

// ─── ChapterDot — owns its own useTransform hook ─────────────────────────────
const ChapterDot: React.FC<{
  chapter: (typeof CHAPTERS)[0];
  index: number;
  smoothProgress: MotionValue<number>;
}> = ({ chapter, index, smoothProgress }) => {
  const dotActive = useTransform(
    smoothProgress,
    [index / TOTAL_CHAPTERS, (index + 0.5) / TOTAL_CHAPTERS, (index + 1) / TOTAL_CHAPTERS],
    [0.25, 1, 0.25]
  );
  return (
    <motion.div
      className="w-1.5 rounded-full cursor-pointer"
      style={{ height: 24, backgroundColor: chapter.accent, opacity: dotActive }}
      title={chapter.headline}
    />
  );
};

// ─── ScrollHint — owns its own useTransform hook ──────────────────────────────
const ScrollHint: React.FC<{ smoothProgress: MotionValue<number> }> = ({ smoothProgress }) => {
  const hintOpacity = useTransform(smoothProgress, [0, 0.05], [1, 0]);
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2"
      style={{ opacity: hintOpacity }}
    >
      <motion.div
        className="w-6 h-9 rounded-full border-2 border-white/30 flex items-start justify-center pt-1.5"
      >
        <motion.div
          className="w-1 h-2 bg-white/50 rounded-full"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>
      <span className="text-white/30 text-[10px] tracking-[0.3em] uppercase">scroll</span>
    </motion.div>
  );
};

// ─── Main component ────────────────────────────────────────────────────────────
const CinematicScrollSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Progress bar width
  const progressBarWidth = useTransform(smoothProgress, [0, 1], ['0%', '100%']);

  return (
    /* The outer div is TALL (5× viewport) — this is the "scroll budget" */
    <div
      ref={containerRef}
      style={{ height: `${TOTAL_CHAPTERS * 100}vh` }}
      className="relative"
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden bg-[#0a0a0a]">
        {/* ── Progress bar ── */}
        <motion.div
          className="absolute top-0 left-0 h-[3px] z-50"
          style={{ width: progressBarWidth, background: 'linear-gradient(90deg, #ef4444, #f97316)' }}
        />

        {/* ── Chapter label (top-left) ── */}
        <div className="absolute top-6 left-6 z-40 flex items-center gap-3">
          <span className="text-white/30 text-xs tracking-[0.4em] uppercase font-light">Stark Story</span>
        </div>

        {/* ── All chapter slides (stacked, driven by scroll) ── */}
        {CHAPTERS.map((chapter, i) => (
          <ChapterWrapper
            key={i}
            chapter={chapter}
            index={i}
            smoothProgress={smoothProgress}
          />
        ))}

        {/* ── Chapter dots (right edge) ── */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
          {CHAPTERS.map((ch, i) => (
            <ChapterDot
              key={i}
              chapter={ch}
              index={i}
              smoothProgress={smoothProgress}
            />
          ))}
        </div>

        {/* ── Scroll hint (only at very start) ── */}
        <ScrollHint smoothProgress={smoothProgress} />
      </div>
    </div>
  );
};

export default CinematicScrollSection;
