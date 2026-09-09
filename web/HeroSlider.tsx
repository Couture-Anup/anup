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
const SWIPE_DISTANCE = 45;

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  /* =========================================================
     NEXT SLIDE
  ========================================================== */

  const nextSlide = useCallback(() => {
    setCurrentSlide((current) => {
      return (current + 1) % slides.length;
    });
  }, []);

  /* =========================================================
     PREVIOUS SLIDE
  ========================================================== */

  const previousSlide = useCallback(() => {
    setCurrentSlide((current) => {
      return (current - 1 + slides.length) % slides.length;
    });
  }, []);

  /* =========================================================
     AUTOPLAY
  ========================================================== */

  useEffect(() => {
    if (isPaused) return;

    const interval = window.setInterval(() => {
      nextSlide();
    }, AUTOPLAY_DELAY);

    return () => {
      window.clearInterval(interval);
    };
  }, [isPaused, nextSlide]);

  /* =========================================================
     MOBILE SWIPE
  ========================================================== */

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
      touchStartX.current = null;
      touchEndX.current = null;
      return;
    }

    const distance =
      touchStartX.current - touchEndX.current;

    if (distance > SWIPE_DISTANCE) {
      nextSlide();
    }

    if (distance < -SWIPE_DISTANCE) {
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
        bg-black
        overflow-hidden
      "
      aria-label="Anup Gupta Studio featured collection"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* =====================================================
          IMAGES

          IMPORTANT:
          NO fill
          NO object-cover
          NO fixed height
          NO fixed aspect ratio

          w-full + h-auto = COMPLETE IMAGE
      ====================================================== */}

      <div className="relative w-full bg-black">
        {slides.map((slide, index) => {
          const isActive = index === currentSlide;

          return (
            <div
              key={slide.src}
              className={`
                relative
                w-full
                ${
                  isActive
                    ? 'block'
                    : 'hidden'
                }
              `}
              aria-hidden={!isActive}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                width={1920}
                height={1080}
                priority={index === 0}
                sizes="100vw"
                draggable={false}
                className="
                  block
                  w-full
                  h-auto
                  max-w-none
                  select-none
                "
              />
            </div>
          );
        })}
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
          sm:left-4
          lg:left-6

          top-1/2
          -translate-y-1/2

          z-30

          flex
          items-center
          justify-center

          h-8
          w-8

          sm:h-10
          sm:w-10

          lg:h-12
          lg:w-12

          rounded-full

          border
          border-[#C9A35C]/50

          bg-black/35

          text-[#D4AF70]

          backdrop-blur-sm

          transition-all
          duration-300

          hover:bg-black/70
          hover:border-[#E7C77E]
          hover:text-[#F1D18A]
        "
      >
        <ChevronLeft
          className="
            h-4
            w-4

            sm:h-5
            sm:w-5

            lg:h-6
            lg:w-6
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
          sm:right-4
          lg:right-6

          top-1/2
          -translate-y-1/2

          z-30

          flex
          items-center
          justify-center

          h-8
          w-8

          sm:h-10
          sm:w-10

          lg:h-12
          lg:w-12

          rounded-full

          border
          border-[#C9A35C]/50

          bg-black/35

          text-[#D4AF70]

          backdrop-blur-sm

          transition-all
          duration-300

          hover:bg-black/70
          hover:border-[#E7C77E]
          hover:text-[#F1D18A]
        "
      >
        <ChevronRight
          className="
            h-4
            w-4

            sm:h-5
            sm:w-5

            lg:h-6
            lg:w-6
          "
          strokeWidth={1.5}
        />
      </button>

      {/* =====================================================
          SLIDER DOTS
      ====================================================== */}

      <div
        className="
          absolute

          bottom-3
          sm:bottom-4
          md:bottom-5

          left-1/2
          -translate-x-1/2

          z-30

          flex
          items-center
          justify-center
          gap-2

          rounded-full

          bg-black/30

          px-3
          py-2

          backdrop-blur-sm
        "
      >
        {slides.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={
              currentSlide === index
                ? 'true'
                : undefined
            }
            className={`
              rounded-full

              transition-all
              duration-300

              ${
                currentSlide === index
                  ? `
                    h-2
                    w-6
                    bg-[#D4AF70]
                  `
                  : `
                    h-2
                    w-2
                    bg-white/60
                    hover:bg-[#D4AF70]/80
                  `
              }
            `}
          />
        ))}
      </div>

      {/* =====================================================
          BOTTOM GOLD DETAIL
      ====================================================== */}

      <div
        className="
          pointer-events-none

          absolute
          bottom-0
          left-1/2
          -translate-x-1/2

          z-20

          h-px
          w-[90%]

          bg-gradient-to-r

          from-transparent
          via-[#C9A35C]/60
          to-transparent
        "
      />
    </section>
  );
}
