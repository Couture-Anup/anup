'use client';

import Image from 'next/image';
import {
  Instagram,
  Youtube,
  Play,
  X,
  ExternalLink,
} from 'lucide-react';

import {
  useEffect,
  useState,
} from 'react';

import { fetchInstagramImage } from '@/app/actions/instagram';

interface InstagramPostProps {
  url: string;
  index: number;
  coverImage?: string;
}

/* =========================================================
   HELPERS
========================================================= */

function cleanUrl(url: string) {
  return (url || '')
    .split('?')[0]
    .split('#')[0]
    .replace(/\/$/, '');
}

function isInstagramUrl(url: string) {
  const value = (url || '').toLowerCase();

  return (
    value.includes('instagram.com') ||
    value.includes('instagr.am')
  );
}

function isYoutubeUrl(url: string) {
  const value = (url || '').toLowerCase();

  return (
    value.includes('youtube.com') ||
    value.includes('youtu.be')
  );
}

function isInstagramReel(url: string) {
  const value = (url || '').toLowerCase();

  return (
    value.includes('/reel/') ||
    value.includes('/reels/')
  );
}

/* =========================================================
   INSTAGRAM EMBED URL
========================================================= */

function getInstagramEmbedUrl(url: string) {
  const cleaned = cleanUrl(url);

  if (!cleaned) return '';

  return `${cleaned}/embed/`;
}

/* =========================================================
   YOUTUBE ID
========================================================= */

function getYoutubeId(url: string) {
  try {
    const parsed = new URL(url);

    if (parsed.hostname.includes('youtu.be')) {
      return parsed.pathname
        .replace('/', '')
        .split('/')[0];
    }

    if (parsed.pathname.includes('/shorts/')) {
      return (
        parsed.pathname
          .split('/shorts/')[1]
          ?.split('/')[0] || null
      );
    }

    if (parsed.pathname.includes('/embed/')) {
      return (
        parsed.pathname
          .split('/embed/')[1]
          ?.split('/')[0] || null
      );
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
  const [mediaCover, setMediaCover] =
    useState<string | null>(
      coverImage || null
    );

  const [isLoading, setIsLoading] =
    useState(!coverImage);

  const [isOpen, setIsOpen] =
    useState(false);

  const [isPlaying, setIsPlaying] =
    useState(false);

  /* ======================================================
     MEDIA TYPE
  ====================================================== */

  const isLink =
    Boolean(url) && url !== '#';

  const instagram =
    isInstagramUrl(url);

  const youtube =
    isYoutubeUrl(url);

  const reel =
    instagram &&
    isInstagramReel(url);

  const isVideo =
    reel || youtube;

  const youtubeId =
    youtube
      ? getYoutubeId(url)
      : null;

  const platformName =
    youtube
      ? 'YouTube'
      : reel
        ? 'Instagram Reel'
        : 'Instagram Post';

  /* ======================================================
     LOAD COVER IMAGE
  ====================================================== */

  useEffect(() => {
    let cancelled = false;

    async function loadCover() {
      /*
       * Manual cover image
       */
      if (coverImage) {
        setMediaCover(coverImage);
        setIsLoading(false);
        return;
      }

      /*
       * YouTube cover
       */
      if (
        youtube &&
        youtubeId
      ) {
        setMediaCover(
          `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`
        );

        setIsLoading(false);

        return;
      }

      /*
       * Instagram cover
       */
      if (
        instagram &&
        isLink
      ) {
        try {
          setIsLoading(true);

          const image =
            await fetchInstagramImage(url);

          if (
            !cancelled &&
            image
          ) {
            setMediaCover(image);
          }
        } catch (error) {
          console.error(
            'Instagram cover fetch error:',
            error
          );
        } finally {
          if (!cancelled) {
            setIsLoading(false);
          }
        }

        return;
      }

      setIsLoading(false);
    }

    loadCover();

    return () => {
      cancelled = true;
    };
  }, [
    url,
    coverImage,
    instagram,
    youtube,
    youtubeId,
    isLink,
  ]);

  /* ======================================================
     LOCK PAGE SCROLL
  ====================================================== */

  useEffect(() => {
    if (!isOpen) return;

    const oldOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      'hidden';

    return () => {
      document.body.style.overflow =
        oldOverflow;
    };
  }, [isOpen]);

  /* ======================================================
     ESC CLOSE
  ====================================================== */

  useEffect(() => {
    if (!isOpen) return;

    function handleEscape(
      event: KeyboardEvent
    ) {
      if (event.key === 'Escape') {
        setIsOpen(false);
        setIsPlaying(false);
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

  function closeModal() {
    setIsOpen(false);
    setIsPlaying(false);
  }

  return (
    <>
      {/* ===================================================
          HOMEPAGE CARD
      =================================================== */}

      <button
        type="button"
        onClick={() => {
          if (!isLink) return;

          setIsPlaying(false);
          setIsOpen(true);
        }}
        aria-label={`Open ${platformName}`}
        className="
          relative
          block

          w-full

          aspect-[9/16]

          overflow-hidden

          bg-[#f3f3f3]

          border-0

          p-0
          m-0

          cursor-pointer
        "
      >
        {/* =================================================
            LOADING
        ================================================= */}

        {isLoading && (
          <div
            className="
              absolute
              inset-0

              bg-neutral-100

              animate-pulse
            "
          />
        )}

        {/* =================================================
            HOMEPAGE COVER

            IMPORTANT:
            object-cover = fills entire box.
            No zoom animation.
        ================================================= */}

        {!isLoading &&
          mediaCover && (
            <Image
              src={mediaCover}
              alt={`${platformName} ${index + 1}`}
              fill
              sizes="
                (max-width: 640px) 50vw,
                (max-width: 1024px) 33vw,
                16vw
              "
              className="
                object-cover
                object-center
              "
              referrerPolicy="no-referrer"
              unoptimized
              priority={index < 6}
            />
          )}

        {/* =================================================
            FALLBACK
        ================================================= */}

        {!isLoading &&
          !mediaCover && (
            <div
              className="
                absolute
                inset-0

                flex
                items-center
                justify-center

                bg-neutral-100
              "
            >
              <span
                className="
                  text-[10px]

                  uppercase

                  tracking-[0.18em]

                  text-neutral-400
                "
              >
                Media
              </span>
            </div>
          )}
      </button>

      {/* ===================================================
          POPUP
      =================================================== */}

      {isOpen && (
        <div
          className="
            fixed
            inset-0

            z-[999999]

            flex
            items-center
            justify-center

            bg-black/75

            backdrop-blur-[2px]

            px-4
            py-6

            sm:px-8
            sm:py-8

            md:px-14
            md:py-10

            lg:px-20
          "
          onClick={closeModal}
        >
          {/* =================================================
              CLOSE BUTTON
          ================================================= */}

          <button
            type="button"
            onClick={closeModal}
            aria-label="Close"
            className="
              fixed

              top-5
              right-5

              md:top-7
              md:right-8

              z-[1000002]

              w-10
              h-10

              md:w-11
              md:h-11

              rounded-full

              bg-black/35

              border
              border-white/40

              text-white

              flex
              items-center
              justify-center

              hover:bg-white
              hover:text-black

              transition-colors
              duration-300
            "
          >
            <X
              className="
                w-5
                h-5
              "
              strokeWidth={1.5}
            />
          </button>

          {/* =================================================
              POPUP BOX
          ================================================= */}

          <div
            onClick={(event) =>
              event.stopPropagation()
            }
            className="
              relative

              w-full
              max-w-[1000px]

              h-[76vh]
              max-h-[720px]

              bg-white

              rounded-[16px]

              overflow-hidden

              shadow-[0_35px_100px_rgba(0,0,0,0.65)]

              flex
              flex-col

              md:flex-row
            "
          >
            {/* =================================================
                LEFT MEDIA AREA
            ================================================= */}

            <div
              className="
                relative

                w-full
                md:w-[58%]

                h-[58%]
                md:h-full

                bg-[#f5f3f0]

                overflow-hidden

                flex
                items-center
                justify-center
              "
            >
              {/* =============================================
                  IMAGE POST

                  IMPORTANT:
                  Popup uses object-contain.
                  Full original image visible.
              ============================================= */}

              {!isVideo &&
                mediaCover && (
                  <Image
                    src={mediaCover}
                    alt={`Instagram post ${index + 1}`}
                    fill
                    sizes="
                      (max-width: 768px) 100vw,
                      58vw
                    "
                    className="
                      object-contain
                      object-center
                    "
                    referrerPolicy="no-referrer"
                    unoptimized
                  />
                )}

              {/* =============================================
                  VIDEO COVER BEFORE PLAY
              ============================================= */}

              {isVideo &&
                !isPlaying &&
                mediaCover && (
                  <>
                    <Image
                      src={mediaCover}
                      alt={`${platformName} cover`}
                      fill
                      sizes="
                        (max-width: 768px) 100vw,
                        58vw
                      "
                      className="
                        object-contain
                        object-center
                      "
                      referrerPolicy="no-referrer"
                      unoptimized
                    />

                    {/* PLAY INSIDE POPUP ONLY */}

                    <button
                      type="button"
                      onClick={() =>
                        setIsPlaying(true)
                      }
                      aria-label="Play video"
                      className="
                        absolute

                        left-1/2
                        top-1/2

                        z-20

                        -translate-x-1/2
                        -translate-y-1/2

                        w-12
                        h-12

                        md:w-14
                        md:h-14

                        rounded-full

                        bg-black/55

                        border
                        border-white/40

                        backdrop-blur-sm

                        text-white

                        flex
                        items-center
                        justify-center

                        shadow-xl

                        hover:bg-black/70

                        transition-colors
                        duration-300
                      "
                    >
                      <Play
                        className="
                          w-5
                          h-5

                          md:w-6
                          md:h-6

                          ml-[3px]

                          fill-white
                        "
                        strokeWidth={1.2}
                      />
                    </button>
                  </>
                )}

              {/* =============================================
                  INSTAGRAM REEL PLAYER
              ============================================= */}

              {reel &&
                isPlaying && (
                  <iframe
                    src={
                      getInstagramEmbedUrl(url)
                    }
                    title={`Instagram Reel ${index + 1}`}
                    allow="
                      autoplay;
                      clipboard-write;
                      encrypted-media;
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

                      bg-black
                    "
                  />
                )}

              {/* =============================================
                  YOUTUBE PLAYER
              ============================================= */}

              {youtube &&
                youtubeId &&
                isPlaying && (
                  <iframe
                    src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
                    title={`YouTube Video ${index + 1}`}
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

                      bg-black
                    "
                  />
                )}
            </div>

            {/* =================================================
                RIGHT SIDE
            ================================================= */}

            <div
              className="
                w-full
                md:w-[42%]

                h-[42%]
                md:h-full

                bg-white

                flex
                flex-col
              "
            >
              {/* =============================================
                  PROFILE HEADER
              ============================================= */}

              <div
                className="
                  min-h-[70px]

                  md:min-h-[76px]

                  shrink-0

                  border-b
                  border-gray-200

                  px-5
                  md:px-6

                  flex
                  items-center

                  gap-3
                "
              >
                <div
                  className="
                    w-9
                    h-9

                    md:w-10
                    md:h-10

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
                      text-[9px]

                      font-serif

                      tracking-wide
                    "
                  >
                    AG
                  </span>
                </div>

                <div
                  className="
                    min-w-0

                    flex
                    flex-col
                  "
                >
                  <span
                    className="
                      text-[13px]

                      md:text-[14px]

                      font-semibold

                      text-black

                      truncate
                    "
                  >
                    anupguptadesigner
                  </span>

                  <span
                    className="
                      text-[10px]

                      md:text-[11px]

                      text-gray-500
                    "
                  >
                    Anup Gupta Studio
                  </span>
                </div>

                <div className="ml-auto">
                  {youtube ? (
                    <Youtube
                      className="
                        w-5
                        h-5
                      "
                      strokeWidth={1.6}
                    />
                  ) : (
                    <Instagram
                      className="
                        w-5
                        h-5
                      "
                      strokeWidth={1.6}
                    />
                  )}
                </div>
              </div>

              {/* =============================================
                  CONTENT AREA
              ============================================= */}

              <div
                className="
                  flex-1

                  overflow-y-auto

                  px-5
                  py-5

                  md:px-7
                  md:py-7
                "
              >
                <span
                  className="
                    text-[9px]

                    md:text-[10px]

                    uppercase

                    tracking-[0.18em]

                    font-semibold

                    text-gray-500
                  "
                >
                  {platformName}
                </span>

                <h3
                  className="
                    mt-4
                    mb-3

                    text-[17px]

                    md:text-[19px]

                    font-medium

                    text-black
                  "
                >
                  Anup Gupta Studio
                </h3>

                <p
                  className="
                    max-w-md

                    text-[12px]

                    md:text-[13px]

                    leading-[1.7]

                    text-gray-600
                  "
                >
                  Designer menswear, handcrafted
                  details and signature creations
                  from Anup Gupta Studio.
                </p>
              </div>

              {/* =============================================
                  BOTTOM BAR
              ============================================= */}

              <div
                className="
                  min-h-[54px]

                  shrink-0

                  border-t
                  border-gray-200

                  px-5
                  md:px-6

                  flex
                  items-center
                  justify-between

                  gap-4
                "
              >
                <span
                  className="
                    text-[9px]

                    uppercase

                    tracking-[0.14em]

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

                    text-[9px]

                    md:text-[10px]

                    uppercase

                    tracking-[0.12em]

                    font-semibold

                    text-black

                    hover:opacity-60
                  "
                >
                  View Post

                  <ExternalLink
                    className="
                      w-3
                      h-3
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
