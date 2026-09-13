'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import {
  Instagram,
  Play,
  X,
  ExternalLink,
} from 'lucide-react';

import { fetchInstagramImage } from '@/app/actions/instagram';

interface InstagramPostProps {
  url: string;
  index: number;
  coverImage?: string;
}

/* =========================================================
   CLEAN INSTAGRAM URL
========================================================= */

function cleanInstagramUrl(url: string) {
  if (!url) return '';

  return url
    .split('?')[0]
    .split('#')[0]
    .replace(/\/$/, '');
}

/* =========================================================
   INSTAGRAM EMBED URL
========================================================= */

function getInstagramEmbedUrl(url: string) {
  const cleanUrl = cleanInstagramUrl(url);

  if (!cleanUrl) return '';

  return `${cleanUrl}/embed/`;
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

  const [fetchedImage, setFetchedImage] =
    useState<string | null>(null);

  const [isLoadingImage, setIsLoadingImage] =
    useState(!coverImage);

  const isLink =
    Boolean(url) && url !== '#';

  /*
   * Detect Reel/video.
   *
   * Your last Instagram item will automatically
   * behave as video if its URL contains /reel/.
   */
  const isVideo =
    url?.includes('/reel/') ||
    url?.includes('/reels/');

  /* ======================================================
     LOAD REAL INSTAGRAM COVER IMAGE
  ====================================================== */

  useEffect(() => {
    let cancelled = false;

    async function loadInstagramImage() {
      /*
       * If Sanity already has a cover image,
       * don't fetch anything.
       */
      if (coverImage) {
        setFetchedImage(coverImage);
        setIsLoadingImage(false);
        return;
      }

      if (!isLink) {
        setIsLoadingImage(false);
        return;
      }

      try {
        setIsLoadingImage(true);

        const image =
          await fetchInstagramImage(url);

        if (!cancelled && image) {
          setFetchedImage(image);
        }
      } catch (error) {
        console.error(
          'Instagram image error:',
          error
        );
      } finally {
        if (!cancelled) {
          setIsLoadingImage(false);
        }
      }
    }

    loadInstagramImage();

    return () => {
      cancelled = true;
    };
  }, [url, coverImage, isLink]);

  /* ======================================================
     FINAL COVER IMAGE
  ====================================================== */

  const finalImage =
    coverImage ||
    fetchedImage ||
    `https://picsum.photos/seed/instagram_${index}/700/900`;

  /* ======================================================
     LOCK BACKGROUND WHEN POPUP OPEN
  ====================================================== */

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      'hidden';

    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, [isOpen]);

  /* ======================================================
     ESC KEY CLOSE
  ====================================================== */

  useEffect(() => {
    if (!isOpen) return;

    function handleEscape(
      event: KeyboardEvent
    ) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    window.addEventListener(
      'keydown',
      handleEscape
    );

    return () => {
      window.removeEventListener(
        'keydown',
        handleEscape
      );
    };
  }, [isOpen]);

  return (
    <>
      {/* ===================================================
          HOMEPAGE INSTAGRAM CARD
      =================================================== */}

      <button
        type="button"
        onClick={() => {
          if (isLink) {
            setIsOpen(true);
          }
        }}
        aria-label={`Open Instagram post ${
          index + 1
        }`}
        className="
          group
          relative
          block
          w-full

          aspect-[4/5]

          overflow-hidden

          bg-[#f5f5f5]

          cursor-pointer

          border-0
          p-0
        "
      >
        {/* =================================================
            COVER IMAGE
        ================================================= */}

        {isLoadingImage &&
        !coverImage &&
        !fetchedImage ? (
          <div
            className="
              absolute
              inset-0
              bg-neutral-100
              animate-pulse
            "
          />
        ) : (
          <Image
            src={finalImage}
            alt={`Anup Gupta Studio Instagram post ${
              index + 1
            }`}
            fill
            sizes="
              (max-width: 640px) 50vw,
              (max-width: 1024px) 33vw,
              25vw
            "
            className="
              object-cover

              transition-transform
              duration-[900ms]
              ease-out

              group-hover:scale-[1.035]
            "
            referrerPolicy="no-referrer"
            unoptimized
          />
        )}

        {/* =================================================
            PREMIUM HOVER DARKEN
        ================================================= */}

        <div
          className="
            absolute
            inset-0

            bg-black/0

            group-hover:bg-black/30

            transition-colors
            duration-500
          "
        />

        {/* =================================================
            CENTER ICON
        ================================================= */}

        <div
          className="
            absolute
            inset-0

            flex
            items-center
            justify-center

            opacity-0

            group-hover:opacity-100

            transition-all
            duration-400
          "
        >
          <div
            className="
              w-[56px]
              h-[56px]

              md:w-[62px]
              md:h-[62px]

              rounded-full

              bg-black/45
              backdrop-blur-md

              border
              border-white/25

              text-white

              flex
              items-center
              justify-center

              shadow-xl

              scale-90

              group-hover:scale-100

              transition-transform
              duration-400
            "
          >
            {isVideo ? (
              <Play
                className="
                  w-7
                  h-7
                  ml-1
                  fill-white
                "
                strokeWidth={1.4}
              />
            ) : (
              <Instagram
                className="
                  w-7
                  h-7
                "
                strokeWidth={1.7}
              />
            )}
          </div>
        </div>

        {/* =================================================
            TOP RIGHT INSTAGRAM BADGE
        ================================================= */}

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
              w-9
              h-9

              rounded-full

              bg-white/95
              text-black

              flex
              items-center
              justify-center

              shadow-lg
            "
          >
            <Instagram
              className="
                w-[18px]
                h-[18px]
              "
              strokeWidth={1.8}
            />
          </div>
        </div>

        {/* =================================================
            BOTTOM LABEL
        ================================================= */}

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
          <Instagram
            className="
              w-4
              h-4
            "
          />

          <span
            className="
              text-[10px]

              md:text-[11px]

              font-semibold

              uppercase

              tracking-[0.18em]
            "
          >
            {isVideo
              ? 'Watch Reel'
              : 'View Post'}
          </span>
        </div>
      </button>

      {/* ===================================================
          FULL SCREEN PREMIUM POPUP
      =================================================== */}

      {isOpen && (
        <div
          className="
            fixed
            inset-0

            z-[999999]

            w-screen
            h-[100dvh]

            bg-black/80

            backdrop-blur-[3px]

            flex
            items-center
            justify-center

            px-3
            py-3

            sm:px-5
            sm:py-5

            md:px-12
            md:py-8

            overflow-hidden
          "
          onClick={() =>
            setIsOpen(false)
          }
        >
          {/* =================================================
              CLOSE BUTTON
          ================================================= */}

          <button
            type="button"
            onClick={() =>
              setIsOpen(false)
            }
            aria-label="Close Instagram post"
            className="
              fixed

              top-4
              right-4

              md:top-7
              md:right-8

              z-[1000001]

              w-12
              h-12

              flex
              items-center
              justify-center

              text-white

              bg-black/20

              border
              border-white/40

              hover:bg-white
              hover:text-black

              transition-all
              duration-300
            "
          >
            <X
              className="
                w-7
                h-7
              "
              strokeWidth={1.4}
            />
          </button>

          {/* =================================================
              MAIN POPUP
          ================================================= */}

          <div
            onClick={(event) =>
              event.stopPropagation()
            }
            className="
              relative

              w-full
              max-w-[1180px]

              h-[88vh]
              max-h-[820px]

              bg-white

              rounded-[18px]

              overflow-hidden

              shadow-[0_40px_120px_rgba(0,0,0,0.7)]

              flex

              flex-col

              md:flex-row
            "
          >
            {/* =================================================
                LEFT MEDIA
            ================================================= */}

            <div
              className="
                relative

                w-full

                md:w-[50%]

                h-[55%]

                md:h-full

                bg-[#f5f5f3]

                flex
                items-center
                justify-center

                overflow-hidden
              "
            >
              {/* ===============================================
                  VIDEO / REEL
              =============================================== */}

              {isVideo ? (
                <iframe
                  src={getInstagramEmbedUrl(
                    url
                  )}
                  title={`Instagram Reel ${
                    index + 1
                  }`}
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
                    absolute
                    inset-0

                    w-full
                    h-full

                    border-0

                    bg-black
                  "
                />
              ) : (
                /* =============================================
                   IMAGE POST
                ============================================= */

                <Image
                  src={finalImage}
                  alt={`Instagram post ${
                    index + 1
                  }`}
                  fill
                  sizes="
                    (max-width: 768px) 100vw,
                    50vw
                  "
                  className="
                    object-contain
                  "
                  referrerPolicy="no-referrer"
                  unoptimized
                />
              )}
            </div>

            {/* =================================================
                RIGHT DETAILS
            ================================================= */}

            <div
              className="
                relative

                w-full

                md:w-[50%]

                h-[45%]

                md:h-full

                bg-white

                flex
                flex-col
              "
            >
              {/* ===============================================
                  PROFILE HEADER
              =============================================== */}

              <div
                className="
                  h-[74px]

                  md:h-[82px]

                  shrink-0

                  border-b
                  border-gray-200

                  px-5
                  md:px-7

                  flex
                  items-center

                  gap-3
                "
              >
                {/* PROFILE CIRCLE */}

                <div
                  className="
                    w-10
                    h-10

                    rounded-full

                    bg-black

                    text-white

                    flex
                    items-center
                    justify-center

                    shrink-0
                  "
                >
                  <span
                    className="
                      text-[10px]
                      font-serif
                      tracking-wide
                    "
                  >
                    AG
                  </span>
                </div>

                <div
                  className="
                    flex
                    flex-col
                  "
                >
                  <span
                    className="
                      text-[14px]

                      md:text-[15px]

                      font-semibold

                      tracking-wide

                      text-black
                    "
                  >
                    anupguptadesigner
                  </span>

                  <span
                    className="
                      text-[11px]

                      text-gray-500
                    "
                  >
                    Anup Gupta Studio
                  </span>
                </div>

                <div
                  className="
                    ml-auto
                  "
                >
                  <Instagram
                    className="
                      w-5
                      h-5
                      text-black
                    "
                    strokeWidth={1.6}
                  />
                </div>
              </div>

              {/* ===============================================
                  INFORMATION AREA
              =============================================== */}

              <div
                className="
                  flex-1

                  overflow-y-auto

                  px-6
                  py-6

                  md:px-8
                  md:py-8
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-2

                    mb-5
                  "
                >
                  <Instagram
                    className="
                      w-4
                      h-4
                    "
                  />

                  <span
                    className="
                      text-[10px]

                      uppercase

                      tracking-[0.18em]

                      font-semibold

                      text-gray-500
                    "
                  >
                    Instagram
                    {isVideo
                      ? ' Reel'
                      : ' Post'}
                  </span>
                </div>

                <h3
                  className="
                    text-lg

                    md:text-xl

                    font-medium

                    text-black

                    mb-4
                  "
                >
                  Anup Gupta Studio
                </h3>

                <p
                  className="
                    text-[13px]

                    md:text-[14px]

                    leading-6

                    text-gray-600

                    max-w-md
                  "
                >
                  Discover our latest
                  designer menswear,
                  craftsmanship and
                  signature creations.
                </p>
              </div>

              {/* ===============================================
                  BOTTOM BAR
              =============================================== */}

              <div
                className="
                  min-h-[58px]

                  shrink-0

                  border-t
                  border-gray-200

                  px-5
                  md:px-7

                  flex
                  items-center
                  justify-between

                  gap-4
                "
              >
                <span
                  className="
                    text-[10px]

                    md:text-[11px]

                    uppercase

                    tracking-[0.15em]

                    text-gray-500
                  "
                >
                  Anup Gupta Studio
                </span>

                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    flex
                    items-center
                    gap-1.5

                    text-[10px]

                    md:text-[11px]

                    font-semibold

                    uppercase

                    tracking-[0.14em]

                    text-black

                    hover:opacity-60

                    transition-opacity
                  "
                >
                  Instagram

                  <ExternalLink
                    className="
                      w-3.5
                      h-3.5
                    "
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
