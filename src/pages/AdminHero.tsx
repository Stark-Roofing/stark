import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { saveMedia, getMedia, deleteMedia, resolveMediaUrl, isIdbRef } from '../lib/heroStorage';

/* ── Types (must match HeroSection.tsx) ────────────────────────────────────── */
interface Slide {
  url?: string;
  type: 'video' | 'image' | 'youtube';
  caption: string;
  alt: string;
  ytId?: string;
  ytStart?: number;
  ytEnd?: number;
}

const STORAGE_KEY = 'stark-hero-slides';

/* ── Default slides (must match HeroSection.tsx DEFAULT_SLIDES) ───────────── */
const YT_ID = 'GnZgvVnHnA8';
const DEFAULT_SLIDES: Slide[] = [
  { url: '/hero-custom-1.webp', type: 'image', caption: 'Aerial Precision. Every Time.',     alt: 'Stark roofing aerial' },
  { type: 'youtube', ytId: YT_ID, ytStart: 5, ytEnd: 10, caption: 'Serving Greater Seattle & Beyond', alt: 'Aerial Lake Washington Seattle' },
  { url: '/hero-custom-2.m4v',  type: 'video', caption: 'Stark Crew in Action',              alt: 'Stark roofing video' },
  { url: '/hero-custom-3.webp', type: 'image', caption: 'Safety-First. Results-Always.',    alt: 'Stark crew on roof' },
  { url: '/hero-custom-4.jpg',  type: 'image', caption: 'Serving Greater Seattle & Beyond', alt: 'Stark roofing project' },
  { url: '/hero-custom-6.webp', type: 'image', caption: 'Built to Outlast Pacific NW Weather', alt: 'Stark roofing crew' },
  { url: '/hero-custom-5.jpg',  type: 'image', caption: 'Licensed · Bonded · Insured',      alt: 'Stark crew on roof' },
];

/* ── Helper: extract YouTube ID from any URL format ───────────────────────── */
function extractYouTubeId(input: string): string {
  const trimmed = input.trim();
  // Already just an ID (no slashes or dots)
  if (/^[\w-]{11}$/.test(trimmed)) return trimmed;
  // Standard & short URLs
  const patterns = [
    /(?:youtube\.com\/watch\?.*v=)([\w-]{11})/,
    /(?:youtu\.be\/)([\w-]{11})/,
    /(?:youtube\.com\/embed\/)([\w-]{11})/,
    /(?:youtube\.com\/shorts\/)([\w-]{11})/,
  ];
  for (const p of patterns) {
    const m = trimmed.match(p);
    if (m) return m[1];
  }
  return trimmed; // return as-is, user may know best
}

/* ── Slide editor card ────────────────────────────────────────────────────── */
function SlideCard({
  slide,
  index,
  total,
  onChange,
  onRemove,
  onMoveUp,
  onMoveDown,
}: {
  slide: Slide;
  index: number;
  total: number;
  onChange: (updated: Slide) => void;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}) {
  const typeLabel = slide.type === 'youtube' ? 'YouTube Video' : slide.type === 'video' ? 'Local Video' : 'Image';
  const typeColor = slide.type === 'youtube' ? 'bg-red-600' : slide.type === 'video' ? 'bg-blue-600' : 'bg-green-600';
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);
  const [uploading, setUploading] = useState(false);

  // Resolve idb:// references to object URLs for preview
  useEffect(() => {
    let revoke: string | undefined;
    (async () => {
      if (isIdbRef(slide.url)) {
        const resolved = await resolveMediaUrl(slide.url);
        setPreviewUrl(resolved);
        if (resolved) revoke = resolved;
      } else {
        setPreviewUrl(slide.url);
      }
    })();
    return () => { if (revoke) URL.revokeObjectURL(revoke); };
  }, [slide.url]);

  const handleFilePick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const isVideo = file.type.startsWith('video/');
    const isImage = file.type.startsWith('image/');
    if (!isVideo && !isImage) {
      toast.error('Please select an image or video file.');
      return;
    }
    // Warn on very large videos
    if (isVideo && file.size > 100 * 1024 * 1024) {
      if (!confirm(`This video is ${(file.size / 1024 / 1024).toFixed(0)}MB. Large videos may slow your site. Continue?`)) {
        return;
      }
    }
    setUploading(true);
    try {
      // Delete old blob if there was one
      if (isIdbRef(slide.url)) await deleteMedia(slide.url!);
      const ref = await saveMedia(file);
      onChange({
        ...slide,
        type: isVideo ? 'video' : 'image',
        url: ref,
        alt: slide.alt || file.name,
      });
      toast.success(`${isVideo ? 'Video' : 'Image'} uploaded!`);
    } catch (err) {
      toast.error('Upload failed: ' + (err as Error).message);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,video/*"
        onChange={handleFilePick}
        className="hidden"
      />
      {/* Preview */}
      <div className="relative h-40 bg-gray-900 flex items-center justify-center overflow-hidden group">
        {slide.type === 'youtube' && slide.ytId ? (
          <img
            src={`https://img.youtube.com/vi/${slide.ytId}/hqdefault.jpg`}
            alt="YouTube thumbnail"
            className="w-full h-full object-cover opacity-80"
          />
        ) : slide.type === 'image' && previewUrl ? (
          <img src={previewUrl} alt={slide.alt} className="w-full h-full object-cover opacity-80" />
        ) : slide.type === 'video' && previewUrl ? (
          <video src={previewUrl} className="w-full h-full object-cover opacity-80" muted />
        ) : (
          <span className="text-gray-500 text-sm">No preview</span>
        )}
        {/* Replace media button overlay (only for image/video slides) */}
        {(slide.type === 'image' || slide.type === 'video') && (
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/60 transition-colors text-white text-sm font-bold opacity-0 group-hover:opacity-100"
          >
            {uploading ? 'Uploading...' : '📁 Replace Media'}
          </button>
        )}
        {/* Slide number + type badge */}
        <div className="absolute top-2 left-2 flex gap-2">
          <span className="bg-black/70 text-white text-xs font-bold px-2 py-1 rounded">#{index + 1}</span>
          <span className={`${typeColor} text-white text-xs font-bold px-2 py-1 rounded`}>{typeLabel}</span>
        </div>
        {/* Move/remove buttons */}
        <div className="absolute top-2 right-2 flex gap-1">
          <button onClick={onMoveUp} disabled={index === 0}
            className="bg-black/60 hover:bg-black/80 text-white disabled:opacity-30 w-7 h-7 rounded flex items-center justify-center text-sm"
            title="Move up">&#9650;</button>
          <button onClick={onMoveDown} disabled={index === total - 1}
            className="bg-black/60 hover:bg-black/80 text-white disabled:opacity-30 w-7 h-7 rounded flex items-center justify-center text-sm"
            title="Move down">&#9660;</button>
          <button onClick={onRemove}
            className="bg-red-700/80 hover:bg-red-600 text-white w-7 h-7 rounded flex items-center justify-center text-sm font-bold"
            title="Remove slide">&times;</button>
        </div>
      </div>

      {/* Fields */}
      <div className="p-4 space-y-3">
        {/* Caption */}
        <div>
          <label className="text-xs text-gray-400 uppercase tracking-wider">Caption</label>
          <input
            type="text"
            value={slide.caption}
            onChange={e => onChange({ ...slide, caption: e.target.value })}
            className="w-full mt-1 bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:border-red-500 focus:outline-none"
          />
        </div>

        {/* Type-specific fields */}
        {slide.type === 'youtube' && (
          <>
            <div>
              <label className="text-xs text-gray-400 uppercase tracking-wider">YouTube URL or Video ID</label>
              <input
                type="text"
                value={slide.ytId || ''}
                onChange={e => onChange({ ...slide, ytId: extractYouTubeId(e.target.value) })}
                placeholder="Paste YouTube URL or video ID"
                className="w-full mt-1 bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:border-red-500 focus:outline-none"
              />
            </div>
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="text-xs text-gray-400 uppercase tracking-wider">Start (seconds)</label>
                <input
                  type="number"
                  min={0}
                  value={slide.ytStart ?? 0}
                  onChange={e => onChange({ ...slide, ytStart: parseInt(e.target.value) || 0 })}
                  className="w-full mt-1 bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:border-red-500 focus:outline-none"
                />
              </div>
              <div className="flex-1">
                <label className="text-xs text-gray-400 uppercase tracking-wider">End (seconds)</label>
                <input
                  type="number"
                  min={0}
                  value={slide.ytEnd ?? 30}
                  onChange={e => onChange({ ...slide, ytEnd: parseInt(e.target.value) || 30 })}
                  className="w-full mt-1 bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:border-red-500 focus:outline-none"
                />
              </div>
            </div>
          </>
        )}

        {(slide.type === 'image' || slide.type === 'video') && (
          <div>
            <label className="text-xs text-gray-400 uppercase tracking-wider">
              {slide.type === 'image' ? 'Image' : 'Video'}
            </label>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="w-full mt-1 bg-red-600/20 hover:bg-red-600/30 border border-red-600/40 text-red-300 font-semibold rounded-lg px-3 py-2 text-sm transition-colors disabled:opacity-50"
            >
              {uploading ? 'Uploading...' : isIdbRef(slide.url) ? '✓ Uploaded — click to replace' : '📁 Upload from your computer'}
            </button>
            <details className="mt-2">
              <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-400">
                Or use a file path / URL
              </summary>
              <input
                type="text"
                value={isIdbRef(slide.url) ? '' : (slide.url || '')}
                onChange={e => onChange({ ...slide, url: e.target.value })}
                placeholder={slide.type === 'image' ? '/drone-1.webp' : '/hero-drone-1.mp4'}
                className="w-full mt-1 bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:border-red-500 focus:outline-none"
              />
            </details>
          </div>
        )}

        {/* Alt text */}
        <div>
          <label className="text-xs text-gray-400 uppercase tracking-wider">Alt Text (accessibility)</label>
          <input
            type="text"
            value={slide.alt}
            onChange={e => onChange({ ...slide, alt: e.target.value })}
            className="w-full mt-1 bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:border-red-500 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}

/* ── Localhost-only guard ─────────────────────────────────────────────────── */
function isLocalhost(): boolean {
  if (typeof window === 'undefined') return false;
  const h = window.location.hostname;
  return h === 'localhost' || h === '127.0.0.1' || h === '::1' || h.endsWith('.local');
}

/* ── Main admin page ──────────────────────────────────────────────────────── */
const AdminHero: React.FC = () => {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [hasChanges, setHasChanges] = useState(false);

  // Load from localStorage or defaults
  useEffect(() => {
    if (!isLocalhost()) return;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setSlides(JSON.parse(saved));
      } else {
        setSlides(DEFAULT_SLIDES);
      }
    } catch {
      setSlides(DEFAULT_SLIDES);
    }
  }, []);

  // Block access on the live site — show 404-style message instead
  if (!isLocalhost()) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center p-6">
        <h1 className="text-5xl font-bold text-red-500 mb-3">404</h1>
        <p className="text-gray-400 mb-6">Page not found.</p>
        <Link to="/" className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-semibold transition-colors">
          Go to homepage
        </Link>
      </div>
    );
  }

  const updateSlide = (index: number, updated: Slide) => {
    setSlides(prev => prev.map((s, i) => (i === index ? updated : s)));
    setHasChanges(true);
  };

  const removeSlide = (index: number) => {
    if (!confirm(`Remove slide #${index + 1}?`)) return;
    const removed = slides[index];
    if (isIdbRef(removed?.url)) {
      deleteMedia(removed.url!).catch(() => { /* ignore */ });
    }
    setSlides(prev => prev.filter((_, i) => i !== index));
    setHasChanges(true);
  };

  const moveSlide = (from: number, to: number) => {
    setSlides(prev => {
      const arr = [...prev];
      const [item] = arr.splice(from, 1);
      arr.splice(to, 0, item);
      return arr;
    });
    setHasChanges(true);
  };

  const addSlide = (type: 'youtube' | 'image' | 'video') => {
    const newSlide: Slide = type === 'youtube'
      ? { type: 'youtube', ytId: '', ytStart: 0, ytEnd: 30, caption: 'New YouTube Slide', alt: 'YouTube video' }
      : type === 'video'
      ? { type: 'video', url: '', caption: 'New Video Slide', alt: 'Video' }
      : { type: 'image', url: '', caption: 'New Image Slide', alt: 'Image' };
    setSlides(prev => [...prev, newSlide]);
    setHasChanges(true);
    // Scroll to bottom after add
    setTimeout(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }), 100);
  };

  const saveChanges = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(slides));
    setHasChanges(false);
    toast.success('Hero slides saved! Refresh the homepage to see changes.');
  };

  const resetToDefaults = () => {
    if (!confirm('Reset all slides to the original defaults? This will undo any changes.')) return;
    localStorage.removeItem(STORAGE_KEY);
    setSlides(DEFAULT_SLIDES);
    setHasChanges(false);
    toast.success('Reset to defaults. Refresh the homepage to see changes.');
  };

  /**
   * Export all uploaded media as real files + a JSON config.
   * Downloads each blob to the user's Downloads folder with predictable
   * names like hero-custom-1.mp4, then a hero-config.json describing
   * the slide order with file paths instead of idb:// refs.
   */
  const exportForDeploy = async () => {
    if (hasChanges) {
      toast.error('Please click Save Changes first, then export.');
      return;
    }
    toast.info('Exporting files... your browser will download them.');

    const exportSlides: Slide[] = [];
    let counter = 1;

    const downloadBlob = (blob: Blob, filename: string) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    };

    for (const slide of slides) {
      if (isIdbRef(slide.url)) {
        const blob = await getMedia(slide.url!);
        if (blob) {
          // Determine file extension from MIME type
          const mime = blob.type || (slide.type === 'video' ? 'video/mp4' : 'image/jpeg');
          const ext = mime.split('/')[1]?.split(';')[0] || (slide.type === 'video' ? 'mp4' : 'jpg');
          const filename = `hero-custom-${counter}.${ext}`;
          downloadBlob(blob, filename);
          exportSlides.push({ ...slide, url: `/${filename}` });
          counter++;
          // Small delay so browser doesn't block multi-download
          await new Promise(r => setTimeout(r, 400));
        }
      } else {
        exportSlides.push(slide);
      }
    }

    // Download the config JSON
    const configBlob = new Blob(
      [JSON.stringify(exportSlides, null, 2)],
      { type: 'application/json' }
    );
    downloadBlob(configBlob, 'hero-config.json');

    toast.success(
      `Exported ${counter - 1} media file(s) + hero-config.json. Tell Claude "deploy my exported files".`,
      { duration: 8000 }
    );
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur border-b border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-red-500 hover:text-red-400 text-sm font-semibold">&larr; Back to Site</Link>
            <h1 className="text-lg md:text-xl font-bold">Hero Video Manager</h1>
            <span className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded">{slides.length} slides</span>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button onClick={resetToDefaults}
              className="px-4 py-2 text-sm rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-200 transition-colors">
              Reset Defaults
            </button>
            <button onClick={exportForDeploy}
              className="px-4 py-2 text-sm rounded-lg bg-green-600 hover:bg-green-500 text-white font-bold shadow-lg shadow-green-600/30 transition-colors"
              title="Download all uploaded files + config so Claude can deploy them permanently">
              📦 Export for Deploy
            </button>
            <button onClick={saveChanges} disabled={!hasChanges}
              className={`px-5 py-2 text-sm rounded-lg font-bold transition-colors ${
                hasChanges
                  ? 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/30'
                  : 'bg-gray-700 text-gray-500 cursor-not-allowed'
              }`}>
              Save Changes
            </button>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="max-w-6xl mx-auto px-4 pt-6 pb-2">
        <div className="bg-gray-800/60 border border-gray-700 rounded-xl p-4 text-sm text-gray-300 space-y-1">
          <p className="font-semibold text-white">How to use:</p>
          <ul className="list-disc list-inside space-y-0.5 text-gray-400">
            <li><strong>Upload your own:</strong> Add an Image or Video slide, then click <em>Upload from your computer</em> to pick a file. Or hover the preview thumbnail and click <em>Replace Media</em>.</li>
            <li><strong>YouTube:</strong> Paste any YouTube URL or video ID. Set start/end times (in seconds) to show a specific clip.</li>
            <li>Use the <strong>arrows</strong> to reorder slides and <strong>&times;</strong> to remove.</li>
            <li>Click <strong>Save Changes</strong>, then refresh the homepage to see updates.</li>
            <li><strong>Tip:</strong> Keep videos under 50MB for fast loading. Long videos work better as YouTube.</li>
          </ul>
        </div>
      </div>

      {/* Slide grid */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {slides.map((slide, i) => (
            <SlideCard
              key={i}
              slide={slide}
              index={i}
              total={slides.length}
              onChange={updated => updateSlide(i, updated)}
              onRemove={() => removeSlide(i)}
              onMoveUp={() => moveSlide(i, i - 1)}
              onMoveDown={() => moveSlide(i, i + 1)}
            />
          ))}
        </div>
      </div>

      {/* Add slide buttons */}
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <p className="text-gray-400 text-sm mb-3 font-semibold uppercase tracking-wider">Add New Slide</p>
        <div className="flex flex-wrap gap-3">
          <button onClick={() => addSlide('youtube')}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-red-600/20 border border-red-600/40 text-red-400 hover:bg-red-600/30 transition-colors font-semibold text-sm">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0C.488 3.45.029 5.804 0 12c.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0C23.512 20.55 23.971 18.196 24 12c-.029-6.185-.484-8.549-4.385-8.816zM9 16V8l8 4-8 4z"/></svg>
            YouTube Video
          </button>
          <button onClick={() => addSlide('image')}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-green-600/20 border border-green-600/40 text-green-400 hover:bg-green-600/30 transition-colors font-semibold text-sm">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
            Image
          </button>
          <button onClick={() => addSlide('video')}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600/20 border border-blue-600/40 text-blue-400 hover:bg-blue-600/30 transition-colors font-semibold text-sm">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>
            Local Video (.mp4)
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminHero;
