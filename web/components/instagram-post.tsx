import Image from 'next/image';
import {
  Instagram,
  Youtube,
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

function getInstagramEmbedUrl(url: string) {
  const cleaned = cleanUrl(url);

  if (!cleaned) return '';

  return `${cleaned}/embed/`;
}

function getYoutubeId(url: string) {
  try {
    const parsed = new URL(url);

    /* youtu.be/VIDEO_ID */

    if (
      parsed.hostname.includes('youtu.be')
    ) {
      return parsed.pathname
        .replace('/', '')
        .split('/')[0];
    }

    /* youtube.com/shorts/VIDEO_ID */

    if (
      parsed.pathname.includes('/shorts/')
    ) {
      return parsed.pathname
        .split('/shorts/')[1]
        ?.split('/')[0];
    }

    /* youtube.com/embed/VIDEO_ID */

    if (
      parsed.pathname.includes('/embed/')
    ) {
      return parsed.pathname
        .split('/embed/')[1]
        ?.split('/')[0];
    }

    /* youtube.com/watch?v=VIDEO_ID */

    return parsed.searchParams.get('v');
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

  /* ======================================================
     GET COVER IMAGE
  ====================================================== */

  let imageUrl =
    coverImage || null;

  /*
    Keep your existing automatic Instagram
    thumbnail fetching.
  */

  if (
    !imageUrl &&
    isLink &&
    instagram
  ) {
    try {
      imageUrl =
        await fetchInstagramImage(url);
    } catch (error) {
      console.error(
        'Instagram cover fetch error:',
        error
      );
    }
  }

  /*
    YouTube automatic thumbnail fallback.
  */

  const youtubeId =
    youtube
      ? getYoutubeId(url)
      : null;

  if (
    !imageUrl &&
    youtube &&
    youtubeId
  ) {
    imageUrl =
      `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;
  }

  /*
    Final fallback.
  */

  const finalImage =
    imageUrl ||
    `https://picsum.photos/seed/instagram_new_${index}/600/900`;

  /* ======================================================
     UNIQUE POPUP CONTROL
  ====================================================== */

  const modalId =
    `media-popup-${index}`;

  const platformName =
    youtube
      ? 'YouTube'
      : instagram
        ? reel
          ? 'Instagram Reel'
          : 'Instagram Post'
        : 'Media';

  return (
    <div className="relative w-full">

      {/* ===================================================
          HIDDEN POPUP CONTROLLER

          This allows everything to remain inside this
          single instagram-post.tsx file.
      =================================================== */}

      <input
        type="checkbox"
        id={modalId}
        className="peer hidden"
      />

      {/* ===================================================
          HOMEPAGE POST / COVER
      =================================================== */}

      <label
        htmlFor={
          isLink
            ? modalId
            : undefined
        }
        className={`
          group
          relative
          block
          w-full

          aspect-[170/302]

          overflow-hidden

          bg-gray-100

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
            REAL COVER IMAGE
        =============================================== */}

        <Image
          src={finalImage}
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

        {/* ===============================================
            HOVER OVERLAY

            NO ZOOM.
            Image stays exactly in position.
        =============================================== */}

        {isLink && (
          <>
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

            {/* ===========================================
                SMALL CENTER ICON
                ONLY SHOWS ON HOVER
            =========================================== */}

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

                  flex
                  items-center
                  justify-center

                  text-white

                  shadow-lg
                "
              >
                {isVideo ? (
                  <Play
                    className="
                      w-4
                      h-4

                      md:w-[18px]
                      md:h-[18px]

                      ml-[2px]

                      fill-white
                    "
                    strokeWidth={1.4}
                  />
                ) : (
                  <Instagram
                    className="
                      w-[17px]
                      h-[17px]

                      md:w-[18px]
                      md:h-[18px]
                    "
                    strokeWidth={1.7}
                  />
                )}
              </div>
            </div>

            {/* ===========================================
                PLATFORM ICON - TOP RIGHT
                ALSO ONLY ON HOVER
            =========================================== */}

            <div
              className="
                absolute

                top-3
                right-3

                opacity-0

                group-hover:opacity-100

                transition-opacity
                duration-300
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
                    className="
                      w-4
                      h-4
                    "
                    strokeWidth={1.8}
                  />
                ) : (
                  <Instagram
                    className="
                      w-4
                      h-4
                    "
                    strokeWidth={1.8}
                  />
                )}
              </div>
            </div>
          </>
        )}
      </label>

      {/* ===================================================
          PREMIUM POPUP

          Overlay covers screen.
          White popup DOES NOT cover whole screen.
      =================================================== */}

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
            CLICK DARK AREA TO CLOSE
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

            z-[1000001]

            w-10
            h-10

            md:w-11
            md:h-11

            flex
            items-center
            justify-center

            text-white

            bg-black/25

            border
            border-white/40

            cursor-pointer

            hover:bg-white
            hover:text-black

            transition-all
            duration-300
          "
        >
          <X
            className="
              w-6
              h-6
            "
            strokeWidth={1.4}
          />
        </label>

        {/* =================================================
            CENTER POPUP
        ================================================= */}

        <div
          className="
            relative

            z-[1000000]

            w-full

            max-w-[1050px]

            h-[76vh]

            max-h-[720px]

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

              md:w-[52%]

              h-[52%]

              md:h-full

              bg-[#f3f3f1]

              overflow-hidden
            "
          >

            {/* ===============================================
                INSTAGRAM REEL
            =============================================== */}

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

            {/* ===============================================
                YOUTUBE VIDEO
            =============================================== */}

            {youtube &&
              youtubeId && (
                <iframe
                  src={`https://www.youtube.com/embed/${youtubeId}?rel=0`}
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

            {/* ===============================================
                INSTAGRAM IMAGE POST

                Uses same cover.
                No zoom.
                No crop inside popup.
            =============================================== */}

            {!isVideo && (
              <Image
                src={finalImage}
                alt={`Instagram Post ${index + 1}`}
                fill
                sizes="
                  (max-width: 768px) 100vw,
                  52vw
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
              RIGHT CONTENT AREA
          ================================================= */}

          <div
            className="
              relative

              w-full

              md:w-[48%]

              h-[48%]

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

              {/* LOGO */}

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

              {/* ACCOUNT */}

              <div
                className="
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

              {/* PLATFORM ICON */}

              <div
                className="
                  ml-auto
                "
              >
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

            {/* ===============================================
                DESCRIPTION AREA
            =============================================== */}

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

              <div
                className="
                  flex
                  items-center
                  gap-2

                  mb-4
                "
              >
                {youtube ? (
                  <Youtube
                    className="
                      w-4
                      h-4
                    "
                  />
                ) : (
                  <Instagram
                    className="
                      w-4
                      h-4
                    "
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

              <p
                className="
                  text-[12px]

                  md:text-[13px]

                  leading-[1.7]

                  text-gray-600

                  max-w-md
                "
              >
                Discover our latest designer
                menswear, handcrafted details,
                signature styles and premium
                creations.
              </p>
            </div>

            {/* ===============================================
                BOTTOM BAR
            =============================================== */}

            <div
              className="
                min-h-[52px]

                md:min-h-[56px]

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
                  ? 'YouTube'
                  : 'Instagram'}

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
    </div>
  );
}
