
import React, { useState, useRef, useEffect } from 'react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  reversed?: boolean;
  hideCaption?: boolean;
  /** Optional native lazy-loading for both images (e.g. "lazy" when the
   *  slider sits below the fold). Omit to keep the browser default.
   *  NOTE: `loading` is passed BEFORE `src` on the <img> on purpose — React
   *  sets attributes in prop order, and Chrome starts fetching as soon as
   *  `src` is set, so `loading="lazy"` after `src` is silently ignored. */
  loading?: 'lazy' | 'eager';
  /** Optional intrinsic size of both images, so the browser can reserve
   *  space before they load. CSS still controls the rendered size. */
  imageWidth?: number;
  imageHeight?: number;
}

const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = "Before",
  afterLabel = "After",
  reversed = false,
  hideCaption = false,
  loading,
  imageWidth,
  imageHeight
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  // If reversed is true, we'll swap the before and after images
  const actualBeforeImage = reversed ? afterImage : beforeImage;
  const actualAfterImage = reversed ? beforeImage : afterImage;

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const containerWidth = rect.width;
    const newPosition = Math.max(0, Math.min(100, x / containerWidth * 100));
    setSliderPosition(newPosition);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!containerRef.current) return;
    const touch = e.touches[0];
    const rect = containerRef.current.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const containerWidth = rect.width;
    const newPosition = Math.max(0, Math.min(100, x / containerWidth * 100));
    setSliderPosition(newPosition);
  };

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-full overflow-hidden rounded-lg cursor-ew-resize select-none bg-gray-100" 
      onMouseDown={handleMouseDown} 
      onTouchMove={e => handleTouchMove(e as unknown as TouchEvent)}
    >
      {/* After image (full width) */}
      <div className="absolute inset-0 flex items-center justify-center">
        <img loading={loading} decoding={loading === 'lazy' ? 'async' : undefined} width={imageWidth} height={imageHeight} src={actualAfterImage} alt="After" className="object-contain w-[95%] h-[95%]" />
      </div>

      {/* Before image (clipped) */}
      <div className="absolute inset-0 overflow-hidden flex items-center justify-center" style={{
        width: `${sliderPosition}%`
      }}>
        <img loading={loading} decoding={loading === 'lazy' ? 'async' : undefined} width={imageWidth} height={imageHeight} src={actualBeforeImage} alt="Before" className="object-contain w-[95%] h-[95%]" />
      </div>

      {/* Vertical division line */}
      <div className="absolute top-0 bottom-0 w-0.5 bg-white shadow-md z-10" style={{
        left: `${sliderPosition}%`,
      }}></div>

      {/* Labels - only show if hideCaption is false */}
      {!hideCaption && (
        <>
          <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-md text-sm font-medium z-20">
            {beforeLabel}
          </div>
          <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-md text-sm font-medium z-20">
            {afterLabel}
          </div>
        </>
      )}
    </div>
  );
};

export default BeforeAfterSlider;
