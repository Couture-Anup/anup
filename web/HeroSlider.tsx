'use client';

import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

const slides = [
  {
    src: '/slider/slide-1.jpg',
    alt: 'Anup Gupta Studio Collection 1',
  },
  {
    src: '/slider/slide-2.jpg',
    alt: 'Anup Gupta Studio Collection 2',
  },
  {
    src: '/slider/slide-3.jpg',
    alt: 'Anup Gupta Studio Collection 3',
  },
  {
    src: '/slider/slide-4.jpg',
    alt: 'Anup Gupta Studio Collection 4',
  },
  {
    src: '/slider/slide-5.jpg',
    alt: 'Anup Gupta Studio Collection 5',
  },
  {
    src: '/slider/slide-6.jpg',
    alt: 'Anup Gupta Studio Collection 6',
  },
];

const AUTOPLAY_DELAY = 5000;

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const previousSlide = useCallback(() => {
    setCurrentSlide(
      (prev) => (prev - 1 + slides.length) % slides.length
    );
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const timer = window.setInterval(() => {
      nextSlide();
    }, AUTOPLAY_DELAY);

    return () => window.clearInterval(timer);
  }, [isPaused, nextSlide]);

  const handleTouchStart = (
    event: React.TouchEvent<HTMLDivElement>
  ) => {
    touchStartX.current = event.touches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (
    event: React.TouchEvent<HTMLDivElement>
  ) => {
    touchEndX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (
      touchStartX.current === null ||
      touchEndX.current === null
    ) {
      return;
    }

    const distance =
      touchStartX.current - touchEndX.current;

    const minimumSwipeDistance = 45;

    if (distance > minimumSwipeDistance) {
      nextSlide();
    }

    if (distance < -minimumSwipeDistance) {
      previousSlide();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section
      className="
        relative
        w-full
        overflow-hidden
        bg-black
      "
      aria-label="Anup Gupta Studio featured collection"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* =====================================================
          SLIDE AREA
          FULL IMAGE VISIBLE
          NO CROP / NO CUT
      ====================================================== */}

      <div
        className="
          relative
          w-full
          bg-black
          aspect-[16/9]
        "
      >
        {slides.map((slide, index) => (
          <div
            key={slide.src}
            className={`
              absolute inset-0
              flex items-center justify-center
              transition-opacity
              duration-1000
              ease-in-out
              ${
                index === currentSlide
                  ? 'z-10 opacity-100'
                  : 'z-0 opacity-0'
              }
            `}
            aria-hidden={index !== currentSlide}
          >
            <div
              className="
                relative
                h-full
                w-full
                flex
                items-center
                justify-center
              "
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={index === 0}
                sizes="100vw"
                draggable={false}
                className="
                  object-contain
                  object-center
                  select-none
                "
              />
            </div>
          </div>
        ))}
      </div>

      {/* =====================================================
          LEFT ARROW
      ====================================================== */}

      <button
        type="button"
        onClick={previousSlide}
        aria-label="Previous slide"
        className="
          absolute
          left-2
          top-1/2
          z-30
          -translate-y-1/2

          flex
          h-8 w-8
          items-center justify-center

          rounded-full
          border border-[#C9A35C]/40
          bg-black/40
          text-[#D4AF70]

          backdrop-blur-sm

          transition-all
          duration-300

          hover:border-[#E7C77E]
          hover:bg-black/70
          hover:text-[#F1D18A]

          sm:left-4
          sm:h-10
          sm:w-10

          lg:left-6
          lg:h-12
          lg:w-12
        "
      >
        <ChevronLeft
          className="
            h-4 w-4
            sm:h-5 sm:w-5
            lg:h-6 lg:w-6
          "
          strokeWidth={1.5}
        />
      </button>

      {/* =====================================================
          RIGHT ARROW
      ====================================================== */}

      <button
        type="button"
        onClick={nextSlide}
        aria-label="Next slide"
        className="
          absolute
          right-2
          top-1/2
          z-30
          -translate-y-1/2

          flex
          h-8 w-8
          items-center justify-center

          rounded-full
          border border-[#C9A35C]/40
          bg-black/40
          text-[#D4AF70]

          backdrop-blur-sm

          transition-all
          duration-300

          hover:border-[#E7C77E]
          hover:bg-black/70
          hover:text-[#F1D18A]

          sm:right-4
          sm:h-10
          sm:w-10

          lg:right-6
          lg:h-12
          lg:w-12
        "
      >
        <ChevronRight
          className="
            h-4 w-4
            sm:h-5 sm:w-5
            lg:h-6 lg:w-6
          "
          strokeWidth={1.5}
        />
      </button>

      {/* =====================================================
          DOTS
      ====================================================== */}

      <div
        className="
          absolute
          bottom-3
          left-1/2
          z-30
          flex
          -translate-x-1/2
          items-center
          gap-2

          rounded-full
          bg-black/30
          px-3
          py-2

          backdrop-blur-sm

          md:bottom-5
        "
      >
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => setCurrentSlide(index)}
            className={`
              rounded-full
              transition-all
              duration-300

              ${
                currentSlide === index
                  ? 'h-2 w-6 bg-[#D4AF70]'
                  : 'h-2 w-2 bg-white/60 hover:bg-[#D4AF70]/70'
              }
            `}
          />
        ))}
      </div>

      {/* =====================================================
          PREMIUM BOTTOM GOLD LINE
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          bottom-0
          left-1/2
          z-20

          h-px
          w-[90%]
          -translate-x-1/2

          bg-gradient-to-r
          from-transparent
          via-[#C9A35C]/50
          to-transparent
        "
      />
    </section>
  );
}
