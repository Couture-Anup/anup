'use client';

import React, { useEffect, useState, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import Link from 'next/link';

interface Slide {
  heading1?: string;
  heading2?: string;
  description?: string;
  imageUrl?: string;
  link?: string;
}

const SLIDES: Slide[] = [
  {
    imageUrl: '/slider/slide-1.jpg',
    link: '#',
  },
  {
    imageUrl: '/slider/slide-2.jpg',
    link: '#',
  },
  {
    imageUrl: '/slider/slide-3.jpg',
    link: '#',
  },
  {
    imageUrl: '/slider/slide-4.jpg',
    link: '#',
  },
  {
    imageUrl: '/slider/slide-5.jpg',
    link: '#',
  },
  {
    imageUrl: '/slider/slide-6.jpg',
    link: '#',
  },
];

export function HeroSlideshow({
  slides,
}: {
  slides?: Slide[];
}) {
  const activeSlides =
    slides && slides.length > 0 ? slides : SLIDES;

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
    },
    [
      Autoplay({
        delay: 5000,
        stopOnInteraction: false,
      }),
    ]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

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

      {/* SLIDER */}
      <div
        ref={emblaRef}
        className="w-full overflow-hidden"
      >
        <div className="flex w-full items-start">

          {activeSlides.map((slide, index) => (
            <div
              key={index}
              className="
                relative
                flex-[0_0_100%]
                min-w-0
                w-full
                bg-black
              "
            >

              {/* FULL IMAGE - NO CROPPING */}
              {slide.imageUrl && (
                <Image
                  src={slide.imageUrl}
                  alt={
                    slide.heading1 ||
                    `Anup Gupta Studio Collection ${index + 1}`
                  }
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
              )}

              {/* OPTIONAL LINK */}
              {slide.link && slide.link !== '#' && (
                <Link
                  href={slide.link}
                  className="absolute inset-0 z-10"
                >
                  <span className="sr-only">
                    View {slide.heading1 || 'collection'}
                  </span>
                </Link>
              )}

              {/* OPTIONAL TEXT */}
              {(slide.heading1 ||
                slide.heading2 ||
                slide.description) && (
                <div
                  className="
                    absolute
                    inset-0
                    z-[5]

                    flex
                    flex-col
                    items-center
                    justify-end

                    px-5
                    pb-12
                    md:pb-16

                    text-white

                    pointer-events-none

                    bg-gradient-to-t
                    from-black/30
                    via-transparent
                    to-transparent
                  "
                >
                  {slide.heading1 && (
                    <h1
                      className="
                        max-w-4xl
                        text-center
                        font-serif

                        text-2xl
                        sm:text-3xl
                        md:text-5xl
                        lg:text-6xl

                        uppercase
                        tracking-[0.05em]
                        leading-tight

                        drop-shadow-lg
                      "
                    >
                      {slide.heading1}
                    </h1>
                  )}

                  {slide.heading2 && (
                    <p
                      className="
                        mt-2
                        text-center

                        text-xs
                        sm:text-sm
                        md:text-lg

                        uppercase
                        tracking-widest
                        font-light

                        drop-shadow-md
                      "
                    >
                      {slide.heading2}
                    </p>
                  )}

                  {slide.description && (
                    <p
                      className="
                        mt-4
                        max-w-2xl
                        text-center
                        text-sm
                        md:text-base
                        font-light
                      "
                    >
                      {slide.description}
                    </p>
                  )}
                </div>
              )}

            </div>
          ))}

        </div>
      </div>

      {/* SLIDER DOTS */}
      <div
        className="
          absolute
          bottom-3
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
        {activeSlides.map((_, index) => (
          <button
            suppressHydrationWarning
            key={index}
            type="button"
            onClick={() => emblaApi?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`
              rounded-full
              transition-all
              duration-300

              ${
                index === selectedIndex
                  ? 'w-6 h-2 bg-[#C9A35C]'
                  : 'w-2 h-2 bg-white/70'
              }
            `}
          />
        ))}
      </div>

      {/* GOLD BOTTOM LINE */}
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
