import Image from 'next/image';

import {
  Instagram,
  Youtube,
  Play,
  X,
  ExternalLink,
  ImageIcon,
} from 'lucide-react';

import { fetchInstagramImage } from '@/app/actions/instagram';

/* =========================================================
   TYPES
========================================================= */

interface InstagramPostProps {
  url: string;
  index: number;
  coverImage?: string;
}

/* =========================================================
   URL HELPERS
========================================================= */

function cleanUrl(url: string) {
  return (url || '')
    .split('?')[0]
    .split('#')[0]
    .replace(/\/$/, '');
}

/* =========================================================
   PLATFORM DETECTION
========================================================= */

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

/* =========================================================
   INSTAGRAM REEL DETECTION
========================================================= */

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
  const cleanedUrl = cleanUrl(url);

  if (!cleanedUrl) {
    return '';
  }

  return `${cleanedUrl}/embed/`;
}

/* =========================================================
   YOUTUBE VIDEO ID
========================================================= */

function getYoutubeId(url: string) {
  try {
    const parsedUrl = new URL(url);

    /* youtu.be/VIDEO_ID */

    if (
      parsedUrl.hostname.includes('youtu.be')
    ) {
      return parsedUrl.pathname
        .replace('/', '')
        .split('/')[0];
    }

    /* youtube.com/shorts/VIDEO_ID */

    if (
      parsedUrl.pathname.includes('/shorts/')
    ) {
      return (
        parsedUrl.pathname
          .split('/shorts/')[1]
          ?.split('/')[0] || null
      );
    }

    /* youtube.com/embed/VIDEO_ID */

    if (
      parsedUrl.pathname.includes('/embed/')
    ) {
      return (
        parsedUrl.pathname
          .split('/embed/')[1]
          ?.split('/')[0] || null
      );
    }

    /* youtube.com/watch?v=VIDEO_ID */

    return parsedUrl.searchParams.get('v');
  } catch {
    return null;
  }
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export async function InstagramPost({
  url,
  index,
  coverImage,
}: InstagramPostProps) {
  /* ======================================================
     BASIC MEDIA INFORMATION
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

  const video =
    reel || youtube;

  /* ======================================================
     YOUTUBE ID
  ====================================================== */

  const youtubeId =
    youtube
      ? getYoutubeId(url)
      : null;

  /* ======================================================
     GET ACTUAL COVER IMAGE
  ====================================================== */

  let mediaCover:
    | string
    | null
    | undefined = coverImage;

  /*
   * INSTAGRAM:
   * Get actual Instagram post / Reel thumbnail
   * if no manual cover image exists.
   */

  if (
    !mediaCover &&
    isLink &&
    instagram
  ) {
    try {
      mediaCover =
        await fetchInstagramImage(url);
    } catch (error) {
      console.error(
        'Unable to fetch Instagram cover:',
        error
      );
    }
  }

  /*
   * YOUTUBE:
   * Use actual YouTube video thumbnail.
   */

  if (
    !mediaCover &&
    youtube &&
    youtubeId
  ) {
    mediaCover =
      `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
  }

  /* ======================================================
     UNIQUE POPUP ID
  ====================================================== */

  const modalId =
    `social-media-popup-${index}`;

  /* ======================================================
     PLATFORM LABEL
  ====================================================== */

  const platformName =
    youtube
      ? 'YouTube'
      : reel
        ? 'Instagram Reel'
        : instagram
          ? 'Instagram Post'
          : 'Media';

  /* ======================================================
     RETURN
  ====================================================== */

  return (
    <div className="relative w-full">

      {/* ===================================================
          POPUP STATE

          No second component required.
          Everything stays inside instagram-post.tsx
      =================================================== */}

      <input
        id={modalId}
        type="checkbox"
        className="peer sr-only"
      />

      {/* ===================================================
          HOMEPAGE MEDIA CARD
      =================================================== */}

      <label
        htmlFor={
          isLink
            ? modalId
            : undefined
        }
        aria-label={
          isLink
            ? `Open ${platformName}`
            : undefined
        }
        className={`
          group
          relative
          block
          w-full

          aspect-[170/302]

          overflow-hidden

          bg-[#f4f4f4]

          border-0
          p-0

          ${
            isLink
              ? 'cursor-pointer'
              : 'cursor-default'
          }
        `}
      >

        {/* ===============================================
            ACTUAL COVER IMAGE
        =============================================== */}

        {mediaCover ? (
          <Image
            src={mediaCover}
            alt={`${platformName} ${index + 1}`}
            fill
            sizes="
              (max-width: 768px) 50vw,
              (max-width: 1024px) 33vw,
              16vw
            "
            className="
              object-cover
            "
            referrerPolicy="no-referrer"
            unoptimized
          />
        ) : (

          /* =============================================
             ONLY SHOWN IF REAL COVER COULD NOT LOAD
             NO RANDOM IMAGE
          ============================================= */

          <div
            className="
              absolute
              inset-0

              flex
              flex-col
              items-center
              justify-center

              gap-2

              bg-neutral-100

              text-neutral-400
            "
          >
            {youtube ? (
              <Youtube
                className="w-6 h-6"
                strokeWidth={1.4}
              />
            ) : instagram ? (
              <Instagram
                className="w-6 h-6"
                strokeWidth={1.4}
              />
            ) : (
              <ImageIcon
                className="w-6 h-6"
                strokeWidth={1.4}
              />
            )}

            <span
              className="
                text-[9px]
                uppercase
                tracking-widest
              "
            >
              Media
            </span>
          </div>
        )}

        {/* ===============================================
            VERY LIGHT HOVER OVERLAY

            NO IMAGE ZOOM
        =============================================== */}

        {isLink && (
          <div
            className="
              absolute
              inset-0

              bg-black/0

              group-hover:bg-black/20

              transition-colors
              duration-300
            "
          />
        )}

        {/* ===============================================
            SMALL CENTER ICON

            ONLY ON HOVER
        =============================================== */}

        {isLink && (
          <div
            className="
              absolute
              inset-0

              flex
              items-center
              justify-center

              opacity-0

              group-hover:opacity-100

              transition-opacity
              duration-300

              pointer-events-none
            "
          >
            <div
              className="
                w-9
                h-9

                md:w-10
                md:h-10

                rounded-full

                bg-black/45

                backdrop-blur-sm

                border
                border-white/20

                text-white

                flex
                items-center
                justify-center

                shadow-lg
              "
            >

              {/* VIDEO = PLAY */}

              {video ? (
                <Play
                  className="
                    w-[15px]
                    h-[15px]

                    md:w-4
                    md:h-4

                    ml-[2px]

                    fill-white
                  "
                  strokeWidth={1.5}
                />
              ) : (

                /* IMAGE POST = INSTAGRAM ICON */

                <Instagram
                  className="
                    w-4
                    h-4

                    md:w-[17px]
                    md:h-[17px]
                  "
                  strokeWidth={1.7}
                />
              )}
            </div>
          </div>
        )}

        {/* ===============================================
            SMALL PLATFORM ICON
            TOP RIGHT
            ONLY ON HOVER
        =============================================== */}

        {isLink && (
          <div
            className="
              absolute

              top-3
              right-3

              opacity-0

              group-hover:opacity-100

              transition-opacity
              duration-300

              pointer-events-none
            "
          >
            <div
              className="
                w-8
                h-8

                rounded-full

                bg-white/95

                text-black

                flex
                items-center
                justify-center

                shadow-md
              "
            >
              {youtube ? (
                <Youtube
                  className="w-4 h-4"
                  strokeWidth={1.8}
                />
              ) : (
                <Instagram
                  className="w-4 h-4"
                  strokeWidth={1.8}
                />
              )}
            </div>
          </div>
        )}

      </label>

      {/* ===================================================
          PREMIUM SAME-PAGE POPUP
      =================================================== */}

      {isLink && (
        <div
          className="
            fixed
            inset-0

            z-[999999]

            hidden
            peer-checked:flex

            items-center
            justify-center

            bg-black/75

            backdrop-blur-[2px]

            px-4
            py-8

            sm:px-8

            md:px-14

            lg:px-20
          "
        >

          {/* =================================================
              DARK BACKGROUND
              CLICK TO CLOSE
          ================================================= */}

          <label
            htmlFor={modalId}
            aria-label="Close popup"
            className="
              absolute
              inset-0

              cursor-pointer
            "
          />

          {/* =================================================
              CLOSE BUTTON
          ================================================= */}

          <label
            htmlFor={modalId}
            aria-label="Close media"
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

              flex
              items-center
              justify-center

              bg-black/35

              text-white

              border
              border-white/30

              backdrop-blur-sm

              cursor-pointer

              hover:bg-white
              hover:text-black

              transition-all
              duration-300
            "
          >
            <X
              className="w-5 h-5"
              strokeWidth={1.5}
            />
          </label>

          {/* =================================================
              MAIN POPUP

              MEDIUM SIZE — NOT FULL SCREEN
          ================================================= */}

          <div
            className="
              relative

              z-[1000001]

              w-full

              max-w-[1000px]

              h-[74vh]

              max-h-[700px]

              bg-white

              rounded-[14px]

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

                md:w-[55%]

                h-[55%]

                md:h-full

                bg-[#f3f3f1]

                overflow-hidden

                flex
                items-center
                justify-center
              "
            >

              {/* =============================================
                  INSTAGRAM REEL / VIDEO
              ============================================= */}

              {reel && (
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
              )}

              {/* =============================================
                  YOUTUBE VIDEO
              ============================================= */}

              {youtube &&
                youtubeId && (
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
                )}

              {/* =============================================
                  INSTAGRAM IMAGE POST

                  Exact fetched cover.
                  NO CROPPING.
                  NO ZOOM.
              ============================================= */}

              {!video &&
                mediaCover && (
                  <Image
                    src={mediaCover}
                    alt={`Instagram post ${index + 1}`}
                    fill
                    sizes="
                      (max-width: 768px) 100vw,
                      55vw
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
                RIGHT INFORMATION AREA
            ================================================= */}

            <div
              className="
                relative

                w-full

                md:w-[45%]

                h-[45%]

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
                  min-h-[68px]

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

                {/* BRAND ICON */}

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
                      font-serif

                      text-[9px]

                      tracking-wide
                    "
                  >
                    AG
                  </span>
                </div>

                {/* PROFILE */}

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

                {/* SOURCE ICON */}

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
                  CONTENT
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

                {/* PLATFORM */}

                <div
                  className="
                    flex
                    items-center
                    gap-2

                    mb-5
                  "
                >
                  {youtube ? (
                    <Youtube
                      className="w-4 h-4"
                      strokeWidth={1.6}
                    />
                  ) : (
                    <Instagram
                      className="w-4 h-4"
                      strokeWidth={1.6}
                    />
                  )}

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
                </div>

                {/* TITLE */}

                <h3
                  className="
                    text-[17px]

                    md:text-[19px]

                    font-medium

                    text-black

                    mb-3
                  "
                >
                  Anup Gupta Studio
                </h3>

                {/* DESCRIPTION */}

                <p
                  className="
                    max-w-md

                    text-[12px]

                    md:text-[13px]

                    leading-[1.7]

                    text-gray-600
                  "
                >
                  Discover our latest designer
                  menswear, handcrafted details,
                  signature styles and premium
                  creations.
                </p>

              </div>

              {/* =============================================
                  BOTTOM ACTION BAR
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

                    md:text-[10px]

                    uppercase

                    tracking-[0.14em]

                    text-gray-500
                  "
                >
                  Anup Gupta Studio
                </span>

                {/* ORIGINAL SOURCE LINK */}

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

                    font-semibold

                    uppercase

                    tracking-[0.14em]

                    text-black

                    hover:opacity-60

                    transition-opacity
                  "
                >
                  {youtube
                    ? 'View on YouTube'
                    : 'View on Instagram'}

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

    </div>
  );
}
