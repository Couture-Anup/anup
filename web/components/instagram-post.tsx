import Image from 'next/image';
import {
  Instagram,
  Youtube,
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
   URL HELPERS
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
   INSTAGRAM EMBED
========================================================= */

function getInstagramEmbedUrl(url: string) {
  const cleaned = cleanUrl(url);

  if (!cleaned) return '';

  return `${cleaned}/embed/`;
}

/* =========================================================
   YOUTUBE VIDEO ID
========================================================= */

function getYoutubeId(url: string) {
  try {
    const parsed = new URL(url);

    /* youtu.be/VIDEO_ID */
    if (parsed.hostname.includes('youtu.be')) {
      return parsed.pathname
        .replace('/', '')
        .split('/')[0];
    }

    /* youtube.com/shorts/VIDEO_ID */
    if (parsed.pathname.includes('/shorts/')) {
      return (
        parsed.pathname
          .split('/shorts/')[1]
          ?.split('/')[0] || null
      );
    }

    /* youtube.com/embed/VIDEO_ID */
    if (parsed.pathname.includes('/embed/')) {
      return (
        parsed.pathname
          .split('/embed/')[1]
          ?.split('/')[0] || null
      );
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

  const youtubeId =
    youtube
      ? getYoutubeId(url)
      : null;

  /* ======================================================
     FETCH ACTUAL COVER
  ====================================================== */

  let mediaCover:
    | string
    | null
    | undefined = coverImage;

  /*
    INSTAGRAM IMAGE / REEL COVER
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
        'Instagram cover fetch error:',
        error
      );
    }
  }

  /*
    YOUTUBE COVER
  */

  if (
    !mediaCover &&
    youtube &&
    youtubeId
  ) {
    mediaCover =
      `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;
  }

  /* ======================================================
     MODAL ID
  ====================================================== */

  const modalId =
    `social-post-modal-${index}`;

  const platformName =
    youtube
      ? 'YouTube'
      : reel
        ? 'Instagram Reel'
        : 'Instagram Post';

  return (
    <div className="relative w-full">

      {/* ===================================================
          POPUP CONTROL
      =================================================== */}

      <input
        type="checkbox"
        id={modalId}
        className="peer sr-only"
      />

      {/* ===================================================
          HOMEPAGE POST
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
          relative
          block

          w-full

          aspect-[4/5]

          overflow-hidden

          bg-[#f5f5f3]

          ${
            isLink
              ? 'cursor-pointer'
              : 'cursor-default'
          }
        `}
      >

        {/* =================================================
            COVER IMAGE

            IMPORTANT:
            - NO PLAY BUTTON
            - NO INSTAGRAM ICON
            - NO HOVER ICON
            - NO ZOOM
            - NO CROPPING
        ================================================= */}

        {mediaCover ? (
          <div
            className="
              absolute
              inset-0

              flex
              items-center
              justify-center
            "
          >
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
                object-contain
              "
              referrerPolicy="no-referrer"
              unoptimized
            />
          </div>
        ) : (
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

                tracking-[0.15em]

                text-neutral-400
              "
            >
              Media
            </span>
          </div>
        )}

        {/* =================================================
            VERY LIGHT HOVER ONLY

            NO ICON.
            NO PLAY.
            NO ZOOM.
        ================================================= */}

        {isLink && (
          <div
            className="
              absolute
              inset-0

              bg-black/0

              hover:bg-black/[0.04]

              transition-colors
              duration-300
            "
          />
        )}

      </label>

      {/* ===================================================
          MODAL
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
              CLICK DARK AREA TO CLOSE
          ================================================= */}

          <label
            htmlFor={modalId}
            aria-label="Close"
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

              rounded-full

              flex
              items-center
              justify-center

              bg-black/40

              border
              border-white/30

              text-white

              cursor-pointer

              hover:bg-white
              hover:text-black

              transition-all
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
          </label>

          {/* =================================================
              POPUP BOX
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
                LEFT MEDIA
            ================================================= */}

            <div
              className="
                relative

                w-full

                md:w-[58%]

                h-[55%]

                md:h-full

                bg-[#f5f5f3]

                overflow-hidden

                flex
                items-center
                justify-center
              "
            >

              {/* =============================================
                  IMAGE POST

                  FULL IMAGE
                  NO CROPPING
                  NO ZOOM
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
                    "
                    referrerPolicy="no-referrer"
                    unoptimized
                  />
                )}

              {/* =============================================
                  INSTAGRAM REEL

                  PLAY OPTION APPEARS HERE ONLY
                  INSIDE INSTAGRAM PLAYER
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

                  PLAY OPTION APPEARS INSIDE
                  YOUTUBE PLAYER ONLY
              ============================================= */}

              {youtube &&
                youtubeId && (
                  <iframe
                    src={`https://www.youtube.com/embed/${youtubeId}?rel=0`}
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

            </div>

            {/* =================================================
                RIGHT SIDE
            ================================================= */}

            <div
              className="
                w-full

                md:w-[42%]

                h-[45%]

                md:h-full

                bg-white

                flex
                flex-col
              "
            >

              {/* =============================================
                  HEADER
              ============================================= */}

              <div
                className="
                  min-h-[70px]

                  shrink-0

                  px-5
                  md:px-6

                  border-b
                  border-gray-200

                  flex
                  items-center

                  gap-3
                "
              >

                {/* BRAND */}

                <div
                  className="
                    w-9
                    h-9

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

                {/* PROFILE */}

                <div
                  className="
                    flex
                    flex-col

                    min-w-0
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

                {/* PLATFORM ICON */}

                <div
                  className="ml-auto"
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

              {/* =============================================
                  TEXT
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
                  Discover our latest designer
                  menswear, craftsmanship and
                  signature creations.
                </p>

              </div>

              {/* =============================================
                  BOTTOM
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

    </div>
  );
}
