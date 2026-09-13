'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import {
  Instagram,
  Youtube,
  Play,
  X,
  ImageIcon,
} from 'lucide-react';

interface InstagramPostProps {
  url: string;
  index: number;
  coverImage?: string;
}

/* =========================================================
   PLATFORM DETECTION
========================================================= */

type Platform =
  | 'instagram'
  | 'youtube'
  | 'image';

function detectPlatform(url: string): Platform {
  const value = (url || '').toLowerCase();

  if (
    value.includes('instagram.com') ||
    value.includes('instagr.am')
  ) {
    return 'instagram';
  }

  if (
    value.includes('youtube.com') ||
    value.includes('youtu.be')
  ) {
    return 'youtube';
  }

  return 'image';
}

/* =========================================================
   INSTAGRAM EMBED
========================================================= */

function getInstagramEmbedUrl(url: string) {
  if (!url) return '';

  const cleanUrl = url
    .split('?')[0]
    .split('#')[0]
    .replace(/\/$/, '');

  return `${cleanUrl}/embed/`;
}

/* =========================================================
   YOUTUBE VIDEO ID
========================================================= */

function getYoutubeVideoId(url: string) {
  try {
    const parsed = new URL(url);

    if (parsed.hostname.includes('youtu.be')) {
      return parsed.pathname
        .replace('/', '')
        .split('?')[0];
    }

    if (parsed.pathname.includes('/shorts/')) {
      return parsed.pathname
        .split('/shorts/')[1]
        ?.split('/')[0];
    }

    if (parsed.pathname.includes('/embed/')) {
      return parsed.pathname
        .split('/embed/')[1]
        ?.split('/')[0];
    }

    return parsed.searchParams.get('v');
  } catch {
    return null;
  }
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export function InstagramPost({
  url,
  index,
  coverImage,
}: InstagramPostProps) {
  const [isOpen, setIsOpen] = useState(false);

  const platform = useMemo(
    () => detectPlatform(url),
    [url]
  );

  const isInstagram =
    platform === 'instagram';

  const isYoutube =
    platform === 'youtube';

  const isInstagramReel =
    isInstagram &&
    (
      url.includes('/reel/') ||
      url.includes('/reels/')
    );

  const youtubeId = useMemo(
    () =>
      isYoutube
        ? getYoutubeVideoId(url)
        : null,
    [url, isYoutube]
  );

  /* ======================================================
     IMAGE TO SHOW ON CARD
  ====================================================== */

  const finalImage =
    coverImage ||
    `https://picsum.photos/seed/media_${index}/600/800`;

  /* ======================================================
     BODY SCROLL LOCK
  ====================================================== */

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  /* ======================================================
     ESCAPE TO CLOSE
  ====================================================== */

  useEffect(() => {
    if (!isOpen) return;

    const closeWithEscape = (
      event: KeyboardEvent
    ) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener(
      'keydown',
      closeWithEscape
    );

    return () => {
      window.removeEventListener(
        'keydown',
        closeWithEscape
      );
    };
  }, [isOpen]);

  /* ======================================================
     PLATFORM ICON
  ====================================================== */

  const PlatformIcon = () => {
    if (isInstagram) {
      return (
        <Instagram
          className="w-5 h-5"
          strokeWidth={1.8}
        />
      );
    }

    if (isYoutube) {
      return (
        <Youtube
          className="w-5 h-5"
          strokeWidth={1.8}
        />
      );
    }

    return (
      <ImageIcon
        className="w-5 h-5"
        strokeWidth={1.8}
      />
    );
  };

  const platformName =
    isInstagram
      ? 'Instagram'
      : isYoutube
        ? 'YouTube'
        : 'Image';

  return (
    <>
      {/* ===================================================
          PREMIUM GALLERY CARD
      =================================================== */}

      <button
        type="button"
        onClick={() => {
          if (url && url !== '#') {
            setIsOpen(true);
          }
        }}
        aria-label={`Open ${platformName} post ${index + 1}`}
        className="
          group
          relative
          block
          w-full
          aspect-[170/302]
          overflow-hidden
          bg-gray-100
          cursor-pointer
          text-left
        "
      >
        {/* COVER IMAGE */}

        <Image
          src={finalImage}
          alt={`${platformName} post ${index + 1}`}
          fill
          sizes="
            (max-width: 768px) 50vw,
            (max-width: 1024px) 33vw,
            25vw
          "
          className="
            object-cover
            transition-transform
            duration-700
            ease-out
            group-hover:scale-105
          "
          referrerPolicy="no-referrer"
        />

        {/* DARK OVERLAY */}

        <div
          className="
            absolute
            inset-0

            bg-gradient-to-t
            from-black/65
            via-black/10
            to-black/10

            opacity-0
            group-hover:opacity-100

            transition-opacity
            duration-500
          "
        />

        {/* PLATFORM ICON TOP RIGHT */}

        <div
          className="
            absolute
            top-4
            right-4

            opacity-0
            -translate-y-2

            group-hover:opacity-100
            group-hover:translate-y-0

            transition-all
            duration-500
          "
        >
          <div
            className="
              w-10
              h-10

              rounded-full

              bg-white/95
              text-black

              flex
              items-center
              justify-center

              shadow-xl
              backdrop-blur-md
            "
          >
            <PlatformIcon />
          </div>
        </div>

        {/* CENTER OPEN / PLAY ICON */}

        <div
          className="
            absolute
            inset-0

            flex
            items-center
            justify-center

            opacity-0
            scale-90

            group-hover:opacity-100
            group-hover:scale-100

            transition-all
            duration-500
          "
        >
          <div
            className="
              w-16
              h-16

              rounded-full

              bg-white/95
              text-black

              flex
              items-center
              justify-center

              shadow-2xl
            "
          >
            {isInstagramReel ||
            isYoutube ? (
              <Play
                className="
                  w-7
                  h-7
                  ml-1
                  fill-black
                "
                strokeWidth={1.5}
              />
            ) : (
              <PlatformIcon />
            )}
          </div>
        </div>

        {/* PLATFORM LABEL BOTTOM */}

        <div
          className="
            absolute
            left-5
            bottom-5

            flex
            items-center
            gap-2

            text-white

            opacity-0
            translate-y-3

            group-hover:opacity-100
            group-hover:translate-y-0

            transition-all
            duration-500
          "
        >
          <PlatformIcon />

          <span
            className="
              text-[11px]
              font-semibold
              uppercase
              tracking-[0.16em]
            "
          >
            {platformName}
          </span>
        </div>
      </button>

      {/* ===================================================
          PREMIUM SAME-PAGE POPUP
      =================================================== */}

      {isOpen && (
        <div
          className="
            fixed
            inset-0

            z-[99999]

            bg-black/85
            backdrop-blur-[5px]

            flex
            items-center
            justify-center

            px-3
            py-4

            md:px-10
            md:py-8
          "
          onClick={() =>
            setIsOpen(false)
          }
        >
          {/* CLOSE */}

          <button
            type="button"
            onClick={() =>
              setIsOpen(false)
            }
            aria-label="Close media"
            className="
              fixed

              top-4
              right-4

              md:top-7
              md:right-8

              z-[100001]

              w-12
              h-12

              rounded-full

              bg-black/40
              text-white

              border
              border-white/25

              flex
              items-center
              justify-center

              backdrop-blur-md

              hover:bg-white
              hover:text-black

              transition-all
              duration-300
            "
          >
            <X
              className="w-6 h-6"
              strokeWidth={1.5}
            />
          </button>

          {/* PLATFORM BADGE */}

          <div
            className="
              fixed

              top-8
              left-8

              z-[100001]

              hidden
              md:flex

              items-center
              gap-2

              text-white
            "
          >
            <PlatformIcon />

            <span
              className="
                text-xs
                font-semibold
                uppercase
                tracking-[0.18em]
              "
            >
              {platformName}
            </span>
          </div>

          {/* MODAL CONTENT */}

          <div
            onClick={(event) =>
              event.stopPropagation()
            }
            className="
              relative

              w-full
              max-w-[1180px]

              max-h-[92vh]

              overflow-hidden

              rounded-[18px]

              bg-white

              shadow-[0_40px_120px_rgba(0,0,0,0.65)]
            "
          >
            {/* =================================================
                INSTAGRAM
            ================================================= */}

            {isInstagram && (
              <div
                className="
                  w-full
                  h-[88vh]
                  max-h-[850px]
                  bg-white
                "
              >
                <iframe
                  src={getInstagramEmbedUrl(url)}
                  title={`Instagram post ${index + 1}`}
                  allow="
                    autoplay;
                    clipboard-write;
                    encrypted-media;
                    picture-in-picture;
                    web-share
                  "
                  allowFullScreen
                  loading="lazy"
                  className="
                    w-full
                    h-full
                    border-0
                    bg-white
                  "
                />
              </div>
            )}

            {/* =================================================
                YOUTUBE
            ================================================= */}

            {isYoutube &&
              youtubeId && (
                <div
                  className="
                    relative
                    w-full
                    aspect-video
                    bg-black
                  "
                >
                  <iframe
                    src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
                    title={`YouTube video ${index + 1}`}
                    allow="
                      accelerometer;
                      autoplay;
                      clipboard-write;
                      encrypted-media;
                      gyroscope;
                      picture-in-picture;
                      web-share
                    "
                    allowFullScreen
                    className="
                      absolute
                      inset-0

                      w-full
                      h-full

                      border-0
                    "
                  />
                </div>
              )}

            {/* =================================================
                IMAGE / OTHER
            ================================================= */}

            {!isInstagram &&
              !isYoutube && (
                <div
                  className="
                    relative
                    w-full
                    h-[85vh]
                    bg-[#f7f7f7]
                  "
                >
                  <Image
                    src={finalImage}
                    alt={`Media ${index + 1}`}
                    fill
                    sizes="100vw"
                    className="
                      object-contain
                    "
                  />
                </div>
              )}
          </div>
        </div>
      )}
    </>
  );
}
