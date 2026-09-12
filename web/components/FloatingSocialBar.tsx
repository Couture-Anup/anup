"use client";

import { useState } from "react";

const WHATSAPP_NUMBER = "919625981155";
const CALL_NUMBER = "+919625981155";

export default function FloatingSocialBar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showContactOptions, setShowContactOptions] = useState(false);

  const iconBox =
    "flex h-10 w-10 md:h-11 md:w-11 items-center justify-center border-b border-gray-100 bg-white transition-all duration-300 hover:bg-gray-50";

  return (
    <>
      {/* =====================================================
          BOTTOM RIGHT CONTACT BUTTONS
      ===================================================== */}

      <div
        className="
          fixed
          bottom-4
          right-4
          z-[9999]

          flex
          flex-col
          items-center
          gap-3
        "
      >
        {/* WHATSAPP BUTTON */}

        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp Anup Gupta Studio"
          title="WhatsApp"
          className="
            flex
            h-11
            w-11
            md:h-14
            md:w-14

            items-center
            justify-center

            rounded-full
            bg-[#25D366]

            shadow-[0_8px_28px_rgba(0,0,0,0.25)]

            transition-all
            duration-300

            hover:scale-105
            hover:shadow-[0_10px_32px_rgba(37,211,102,0.35)]

            active:scale-95
          "
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5 md:h-7 md:w-7 fill-white"
            aria-hidden="true"
          >
            <path d="M12.04 2a9.84 9.84 0 0 0-8.42 14.93L2 22l5.21-1.56A9.93 9.93 0 1 0 12.04 2Zm0 17.98a8.14 8.14 0 0 1-4.15-1.13l-.3-.18-3.09.92.94-3.01-.2-.31A8.13 8.13 0 1 1 12.04 19.98Zm4.46-6.09c-.24-.12-1.44-.71-1.66-.79-.22-.08-.38-.12-.54.12-.16.24-.62.79-.76.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.95-1.2-.72-.64-1.21-1.44-1.35-1.68-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.31-.74-1.79-.2-.47-.4-.41-.54-.42h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.69 2.58 4.1 3.62.57.25 1.02.4 1.37.51.58.18 1.1.16 1.52.1.46-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28Z" />
          </svg>
        </a>

        {/* BLUE PHONE / CALL BUTTON */}

        <a
          href={`tel:${CALL_NUMBER}`}
          aria-label="Call Anup Gupta Studio"
          title="Call Now"
          className="
            flex
            h-11
            w-11
            md:h-14
            md:w-14

            items-center
            justify-center

            rounded-full
            bg-[#1877F2]

            shadow-[0_8px_28px_rgba(0,0,0,0.25)]

            transition-all
            duration-300

            hover:scale-105
            hover:bg-[#0A66C2]
            hover:shadow-[0_10px_32px_rgba(24,119,242,0.35)]

            active:scale-95
          "
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5 md:h-7 md:w-7 fill-white"
            aria-hidden="true"
          >
            <path d="M6.62 10.79a15.46 15.46 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2Z" />
          </svg>
        </a>
      </div>

      {/* =====================================================
          LEFT EDGE SOCIAL DRAWER
      ===================================================== */}

      <div
        className="
          fixed
          left-0
          top-1/2
          z-[9998]
          -translate-y-1/2
        "
      >
        {/* SOCIAL ICON PANEL */}

        <div
          className={`
            w-10
            md:w-11

            overflow-hidden

            rounded-r-lg

            border
            border-l-0
            border-gray-200

            bg-white

            shadow-xl

            transition-all
            duration-300
            ease-out

            ${
              isExpanded
                ? "translate-x-0 opacity-100"
                : "-translate-x-full opacity-0 pointer-events-none"
            }
          `}
        >
          {/* CALL */}

          <button
            type="button"
            onClick={() => setShowContactOptions(true)}
            aria-label="Contact Anup Gupta Studio"
            title="Call"
            className="
              flex
              h-10
              w-10

              md:h-11
              md:w-11

              items-center
              justify-center

              border-b
              border-green-100

              bg-[#dcfce7]

              transition-all
              duration-300

              hover:bg-[#bbf7d0]
            "
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 fill-[#15803d]"
              aria-hidden="true"
            >
              <path d="M6.62 10.79a15.46 15.46 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2Z" />
            </svg>
          </button>

          {/* FACEBOOK */}

          <a
            href="https://www.facebook.com/profile.php?id=61561000412885"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            title="Facebook"
            className={iconBox}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 fill-[#1877F2]"
              aria-hidden="true"
            >
              <path d="M13.5 22v-9h3l.45-3.5H13.5V7.27c0-1.01.28-1.7 1.73-1.7H17V2.44A23.5 23.5 0 0 0 14.4 2c-2.57 0-4.33 1.57-4.33 4.45V9.5H7v3.5h3.07v9h3.43Z" />
            </svg>
          </a>

          {/* INSTAGRAM */}

          <a
            href="https://www.instagram.com/anupguptadesigner/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            title="Instagram"
            className={iconBox}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <defs>
                <linearGradient
                  id="instagramGradient"
                  x1="0%"
                  y1="100%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#FFD600" />
                  <stop offset="35%" stopColor="#FF7A00" />
                  <stop offset="65%" stopColor="#FF0169" />
                  <stop offset="100%" stopColor="#D300C5" />
                </linearGradient>
              </defs>

              <path
                fill="url(#instagramGradient)"
                d="M7.2 2h9.6A5.2 5.2 0 0 1 22 7.2v9.6a5.2 5.2 0 0 1-5.2 5.2H7.2A5.2 5.2 0 0 1 2 16.8V7.2A5.2 5.2 0 0 1 7.2 2Zm0 1.8A3.4 3.4 0 0 0 3.8 7.2v9.6a3.4 3.4 0 0 0 3.4 3.4h9.6a3.4 3.4 0 0 0 3.4-3.4V7.2a3.4 3.4 0 0 0-3.4-3.4H7.2Zm9.95 1.35a1.22 1.22 0 1 1 0 2.44 1.22 1.22 0 0 1 0-2.44ZM12 6.87A5.13 5.13 0 1 1 12 17.13 5.13 5.13 0 0 1 12 6.87Zm0 1.8A3.33 3.33 0 1 0 12 15.33 3.33 3.33 0 0 0 12 8.67Z"
              />
            </svg>
          </a>

          {/* LINKEDIN */}

          <a
            href="https://www.linkedin.com/in/anup-gupta-b05b99425/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            title="LinkedIn"
            className={iconBox}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 fill-[#0A66C2]"
              aria-hidden="true"
            >
              <path d="M5.34 3.5A2.34 2.34 0 1 1 .66 3.5a2.34 2.34 0 0 1 4.68 0ZM1 7h4.67v15H1V7Zm7.5 0h4.48v2.05h.06c.62-1.18 2.15-2.42 4.42-2.42 4.73 0 5.6 3.11 5.6 7.16V22h-4.67v-7.27c0-1.74-.03-3.97-2.42-3.97-2.42 0-2.79 1.89-2.79 3.84V22H8.5V7Z" />
            </svg>
          </a>

          {/* YOUTUBE */}

          <a
            href="https://www.youtube.com/channel/UCmSXqR5sF3Kz-FKenpm7rHg"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            title="YouTube"
            className={iconBox}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-[17px] w-[17px] fill-[#FF0000]"
              aria-hidden="true"
            >
              <path d="M23.5 6.2a3.02 3.02 0 0 0-2.13-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.37.51A3.02 3.02 0 0 0 .5 6.2 31.58 31.58 0 0 0 0 12a31.58 31.58 0 0 0 .5 5.8 3.02 3.02 0 0 0 2.13 2.14c1.87.51 9.37.51 9.37.51s7.5 0 9.37-.51a3.02 3.02 0 0 0 2.13-2.14A31.58 31.58 0 0 0 24 12a31.58 31.58 0 0 0-.5-5.8ZM9.6 15.62V8.38L15.86 12 9.6 15.62Z" />
            </svg>
          </a>
        </div>

        {/* =================================================
            LEFT EDGE ARROW
        ================================================= */}

        <button
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          aria-label={isExpanded ? "Hide social menu" : "Show social menu"}
          title={isExpanded ? "Hide" : "Connect"}
          className={`
            absolute
            top-1/2
            -translate-y-1/2

            flex
            items-center
            justify-center

            h-11
            w-[16px]

            md:h-12
            md:w-[18px]

            rounded-r-md

            bg-black
            text-white

            shadow-[2px_2px_8px_rgba(0,0,0,0.25)]

            transition-all
            duration-300
            ease-out

            hover:bg-neutral-800

            ${
              isExpanded
                ? "left-10 md:left-11"
                : "left-0"
            }
          `}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`
              h-[10px]
              w-[10px]

              transition-transform
              duration-300

              ${
                isExpanded
                  ? "rotate-180"
                  : "rotate-0"
              }
            `}
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* =====================================================
          CONTACT POPUP
      ===================================================== */}

      {showContactOptions && (
        <div
          className="
            fixed
            inset-0
            z-[100000]

            flex
            items-center
            justify-center

            bg-black/45
            px-5

            backdrop-blur-sm
          "
          onClick={() => setShowContactOptions(false)}
        >
          <div
            className="
              relative

              w-full
              max-w-[340px]

              rounded-3xl

              bg-white

              p-7

              shadow-2xl
            "
            onClick={(e) => e.stopPropagation()}
          >
            {/* CLOSE */}

            <button
              type="button"
              onClick={() => setShowContactOptions(false)}
              aria-label="Close"
              className="
                absolute
                right-4
                top-4

                flex
                h-8
                w-8

                items-center
                justify-center

                rounded-full

                bg-gray-100

                text-lg
                text-gray-500

                transition

                hover:bg-gray-200
                hover:text-black
              "
            >
              ×
            </button>

            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#a18150]">
              Anup Gupta Studio
            </p>

            <h3 className="mt-2 text-xl font-semibold text-neutral-950">
              Connect With Us
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Choose how you would like to contact our team.
            </p>

            <p className="mt-4 text-sm font-semibold text-neutral-900">
              +91 96259 81155
            </p>

            <div className="mt-6 space-y-3">
              {/* CALL NOW */}

              <a
                href={`tel:${CALL_NUMBER}`}
                className="
                  flex
                  w-full

                  items-center
                  justify-center

                  gap-3

                  rounded-xl

                  bg-[#1877F2]

                  px-5
                  py-4

                  text-sm
                  font-semibold

                  text-white

                  transition-all
                  duration-300

                  hover:bg-[#0A66C2]

                  active:scale-[0.98]
                "
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 fill-white"
                  aria-hidden="true"
                >
                  <path d="M6.62 10.79a15.46 15.46 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2Z" />
                </svg>

                Call Now
              </a>

              {/* WHATSAPP */}

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex
                  w-full

                  items-center
                  justify-center

                  gap-3

                  rounded-xl

                  bg-[#25D366]

                  px-5
                  py-4

                  text-sm
                  font-semibold

                  text-white

                  transition-all
                  duration-300

                  hover:opacity-90

                  active:scale-[0.98]
                "
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 fill-white"
                  aria-hidden="true"
                >
                  <path d="M12.04 2a9.84 9.84 0 0 0-8.42 14.93L2 22l5.21-1.56A9.93 9.93 0 1 0 12.04 2Zm0 17.98a8.14 8.14 0 0 1-4.15-1.13l-.3-.18-3.09.92.94-3.01-.2-.31A8.13 8.13 0 1 1 12.04 19.98Z" />
                </svg>

                WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
