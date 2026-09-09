'use client';

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';

const SLIDES = [
  '/slider/slider 1.png',
  '/slider/slider 2.png',
  '/slider/slider 3.png',
  '/slider/slider 4.png',
  '/slider/slider 5.png',
  '/slider/slider 6.png',
];

export function HeroSlideshow() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
      containScroll: false,
    },
    [
      Autoplay({
        delay: 5000,
        stopOnInteraction: false,
        stopOnMouseEnter: false,
      }),
    ]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="relative w-full bg-black">
      <div ref={emblaRef} className="w-full overflow-hidden">
        <div className="flex w-full items-start">
          {SLIDES.map((src, index) => (
            <div
              key={src}
              className="relative min-w-0 flex-[0_0_100%] w-full bg-black"
            >
              <Image
                src={src}
                alt={`Anup Gupta Studio Slider ${index + 1}`}
                width={1920}
                height={1080}
                sizes="100vw"
                priority={index === 0}
                draggable={false}
                className="
                  block
                  w-full
                  h-auto
                  object-contain
                  object-center
                  select-none
                "
              />
            </div>
          ))}
        </div>
      </div>

      {/* DOTS */}
      <div
        className="
          absolute
          bottom-3
          sm:bottom-4
          md:bottom-5
          left-0
          right-0
          z-20
          flex
          items-center
          justify-center
          gap-2
        "
      >
        {SLIDES.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => emblaApi?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`
              rounded-full
              transition-all
              duration-300
              ${
                selectedIndex === index
                  ? 'h-2 w-6 bg-[#C9A35C]'
                  : 'h-2 w-2 bg-white/70 hover:bg-[#C9A35C]'
              }
            `}
          />
        ))}
      </div>

      {/* GOLD BOTTOM DETAIL */}
      <div
        className="
          pointer-events-none
          absolute
          bottom-0
          left-1/2
          z-10
          h-px
          w-[92%]
          -translate-x-1/2
          bg-gradient-to-r
          from-transparent
          via-[#C9A35C]/60
          to-transparent
        "
      />
    </section>
  );
}
