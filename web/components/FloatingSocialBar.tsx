"use client";

import { useState } from "react";

const WHATSAPP_NUMBER = "919625981155";
const CALL_NUMBER = "+919625981155";

export default function FloatingSocialBar() {
  const [showContactOptions, setShowContactOptions] = useState(false);

  const iconBox =
    "group flex h-8 w-8 sm:h-9 sm:w-9 md:h-14 md:w-14 items-center justify-center border-b border-gray-100 bg-white transition-all duration-300 hover:bg-gray-50 md:hover:w-[62px]";

  return (
    <>
      {/* =====================================================
          PREMIUM BLACK + GOLD WHATSAPP HEADER BAR
      ====================================================== */}

      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Connect with Anup Gupta Studio on WhatsApp"
        className="
          group relative z-[50]
          block w-full
          overflow-hidden
          border-y border-[#b8955d]/60
          bg-[#050505]
        "
      >
        {/* LUXURY BACKGROUND GLOW */}
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(circle at 8% 50%, rgba(184,149,93,0.17), transparent 22%), radial-gradient(circle at 92% 50%, rgba(184,149,93,0.17), transparent 22%), linear-gradient(90deg, #020202, #0b0906 50%, #020202)",
          }}
        />

        {/* VERY SUBTLE GOLD TEXTURE */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, transparent 0px, transparent 12px, rgba(212,175,112,0.12) 13px, transparent 14px)",
          }}
        />

        {/* LEFT DECORATION */}
        <div className="pointer-events-none absolute left-0 top-1/2 hidden -translate-y-1/2 items-center lg:flex">
          <div className="w-12 xl:w-20 h-px bg-gradient-to-r from-transparent to-[#d4af70]" />

          <span className="mx-2 h-2 w-2 rotate-45 border border-[#d4af70] bg-black" />

          <div className="h-px w-8 bg-[#d4af70]/60" />
        </div>

        {/* RIGHT DECORATION */}
        <div className="pointer-events-none absolute right-0 top-1/2 hidden -translate-y-1/2 items-center lg:flex">
          <div className="h-px w-8 bg-[#d4af70]/60" />

          <span className="mx-2 h-2 w-2 rotate-45 border border-[#d4af70] bg-black" />

          <div className="w-12 xl:w-20 h-px bg-gradient-to-l from-transparent to-[#d4af70]" />
        </div>

        {/* CONTENT */}
        <div
          className="
            relative mx-auto
            flex min-h-[56px]
            max-w-[1600px]
            items-center justify-center
            px-3 py-2.5
            sm:min-h-[60px]
            sm:px-5
            md:min-h-[68px]
            md:px-24
            lg:px-32
          "
        >
          <div
            className="
              flex w-full
              flex-col items-center justify-center
              gap-1.5
              text-center
              md:flex-row
              md:gap-5
            "
          >
            {/* FIRST MESSAGE */}

            <p
              className="
                font-serif
                text-[10px]
                leading-[16px]
                tracking-[0.02em]
                text-[#d6b16a]
                sm:text-[11px]
                md:text-[15px]
                lg:text-[17px]
                xl:text-[19px]
              "
            >
              Need assistance with your order, delivery, or any questions?
            </p>

            {/* DESKTOP SEPARATOR */}

            <span className="hidden h-7 w-px bg-[#b8955d]/60 md:block" />

            {/* WHATSAPP SECTION */}

            <div className="flex items-center justify-center gap-2 md:gap-3">
              {/* WHATSAPP ICON */}

              <div
                className="
                  flex h-6 w-6
                  shrink-0
                  items-center justify-center
                  rounded-full
                  border border-[#d4af70]/70
                  transition-all duration-300
                  group-hover:border-[#f1d38a]
                  group-hover:shadow-[0_0_18px_rgba(212,175,112,0.35)]
                  sm:h-7 sm:w-7
                  md:h-9 md:w-9
                "
              >
                <svg
                  viewBox="0 0 24 24"
                  className="
                    h-3.5 w-3.5
                    fill-[#d4af70]
                    sm:h-4 sm:w-4
                    md:h-5 md:w-5
                  "
                  aria-hidden="true"
                >
                  <path d="M12.04 2a9.84 9.84 0 0 0-8.42 14.93L2 22l5.21-1.56A9.93 9.93 0 1 0 12.04 2Zm0 17.98a8.14 8.14 0 0 1-4.15-1.13l-.3-.18-3.09.92.94-3.01-.2-.31A8.13 8.13 0 1 1 12.04 19.98Zm4.46-6.09c-.24-.12-1.44-.71-1.66-.79-.22-.08-.38-.12-.54.12-.16.24-.62.79-.76.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.95-1.2-.72-.64-1.21-1.44-1.35-1.68-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.31-.74-1.79-.2-.47-.4-.41-.54-.42h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.69 2.58 4.1 3.62.57.25 1.02.4 1.37.51.58.18 1.1.16 1.52.1.46-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28Z" />
                </svg>
              </div>

              {/* WHATSAPP TEXT */}

              <p
                className="
                  font-serif
                  text-[9.5px]
                  leading-[15px]
                  text-[#d6b16a]
                  sm:text-[11px]
                  md:text-[14px]
                  lg:text-[16px]
                  xl:text-[18px]
                "
              >
                Connect with us on WhatsApp at{" "}
                <span className="font-semibold tracking-[0.02em] text-[#e9c979]">
                  +91 96259 81155
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* PREMIUM BOTTOM GOLD GLOW */}

        <div
          className="
            pointer-events-none
            absolute bottom-0 left-1/2
            h-px w-[85%]
            -translate-x-1/2
            bg-gradient-to-r
            from-transparent
            via-[#d4af70]/80
            to-transparent
          "
        />
      </a>

      {/* =====================================================
          GLOBAL WHATSAPP FLOATING BUTTON
          BOTTOM RIGHT - ALL DEVICES
      ====================================================== */}

      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp Anup Gupta Studio"
        title="WhatsApp"
        className="
          fixed
          bottom-4 right-4
          z-[9999]
          flex h-10 w-10
          items-center justify-center
          rounded-full
          bg-[#25D366]
          shadow-[0_7px_24px_rgba(0,0,0,0.25)]
          transition-all duration-300
          hover:scale-110
          active:scale-95
          sm:h-11 sm:w-11
          md:bottom-6 md:right-6
          md:h-14 md:w-14
        "
      >
        <svg
          viewBox="0 0 24 24"
          className="
            h-5 w-5
            fill-white
            md:h-7 md:w-7
          "
          aria-hidden="true"
        >
          <path d="M12.04 2a9.84 9.84 0 0 0-8.42 14.93L2 22l5.21-1.56A9.93 9.93 0 1 0 12.04 2Zm0 17.98a8.14 8.14 0 0 1-4.15-1.13l-.3-.18-3.09.92.94-3.01-.2-.31A8.13 8.13 0 1 1 12.04 19.98Zm4.46-6.09c-.24-.12-1.44-.71-1.66-.79-.22-.08-.38-.12-.54.12-.16.24-.62.79-.76.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.95-1.2-.72-.64-1.21-1.44-1.35-1.68-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.31-.74-1.79-.2-.47-.4-.41-.54-.42h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.69 2.58 4.1 3.62.57.25 1.02.4 1.37.51.58.18 1.1.16 1.52.1.46-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28Z" />
        </svg>
      </a>

      {/* =====================================================
          LEFT FLOATING SOCIAL BAR
      ====================================================== */}

      <div
        className="
          fixed left-0 top-1/2
          z-[9998]
          -translate-y-1/2
          overflow-hidden
          rounded-r-lg
          border border-l-0 border-gray-200
          bg-white
          shadow-xl
          md:rounded-r-2xl
          md:shadow-2xl
        "
      >
        {/* CALL BUTTON - LIGHT GREEN */}

        <button
          type="button"
          onClick={() => setShowContactOptions(true)}
          aria-label="Contact Anup Gupta Studio"
          title="Call"
          className="
            group flex
            h-8 w-8
            items-center justify-center
            border-b border-green-100
            bg-[#dcfce7]
            transition-all duration-300
            hover:bg-[#bbf7d0]
            sm:h-9 sm:w-9
            md:h-14 md:w-14
            md:hover:w-[62px]
          "
        >
          <svg
            viewBox="0 0 24 24"
            className="
              h-3.5 w-3.5
              fill-[#15803d]
              sm:h-4 sm:w-4
              md:h-6 md:w-6
            "
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
            className="
              h-3.5 w-3.5
              fill-[#1877F2]
              sm:h-4 sm:w-4
              md:h-6 md:w-6
            "
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
            className="
              h-3.5 w-3.5
              sm:h-4 sm:w-4
              md:h-6 md:w-6
            "
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
            className="
              h-3.5 w-3.5
              fill-[#0A66C2]
              sm:h-4 sm:w-4
              md:h-6 md:w-6
            "
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
            className="
              h-4 w-4
              fill-[#FF0000]
              md:h-7 md:w-7
            "
            aria-hidden="true"
          >
            <path d="M23.5 6.2a3.02 3.02 0 0 0-2.13-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.37.51A3.02 3.02 0 0 0 .5 6.2 31.58 31.58 0 0 0 0 12a31.58 31.58 0 0 0 .5 5.8 3.02 3.02 0 0 0 2.13 2.14c1.87.51 9.37.51 9.37.51s7.5 0 9.37-.51a3.02 3.02 0 0 0 2.13-2.14A31.58 31.58 0 0 0 24 12a31.58 31.58 0 0 0-.5-5.8ZM9.6 15.62V8.38L15.86 12 9.6 15.62Z" />
          </svg>
        </a>
      </div>

      {/* =====================================================
          CALL / WHATSAPP CHOICE POPUP
      ====================================================== */}

      {showContactOptions && (
        <div
          className="
            fixed inset-0
            z-[100000]
            flex items-center justify-center
            bg-black/45
            px-5
            backdrop-blur-sm
          "
          onClick={() => setShowContactOptions(false)}
        >
          <div
            className="
              relative
              w-full max-w-[340px]
              rounded-3xl
              border border-[#d4af70]/20
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
                absolute right-4 top-4
                flex h-8 w-8
                items-center justify-center
                rounded-full
                bg-gray-100
                text-lg text-gray-500
                transition
                hover:bg-gray-200
                hover:text-black
              "
            >
              ×
            </button>

            {/* BRAND */}

            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#a18150]">
              Anup Gupta Studio
            </p>

            <h3 className="mt-2 text-xl font-semibold text-neutral-950">
              Connect With Us
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Choose how you would like to contact our team.
            </p>

            <p className="mt-4 text-sm font-semibold tracking-wide text-neutral-900">
              +91 96259 81155
            </p>

            <div className="mt-6 space-y-3">

              {/* CALL NOW */}

              <a
                href={`tel:${CALL_NUMBER}`}
                className="
                  flex w-full
                  items-center justify-center
                  gap-3
                  rounded-xl
                  bg-[#dcfce7]
                  px-5 py-4
                  text-sm font-semibold
                  text-[#166534]
                  transition-all duration-300
                  hover:bg-[#bbf7d0]
                  active:scale-[0.98]
                "
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 fill-[#15803d]"
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
                  flex w-full
                  items-center justify-center
                  gap-3
                  rounded-xl
                  bg-[#25D366]
                  px-5 py-4
                  text-sm font-semibold
                  text-white
                  transition-all duration-300
                  hover:opacity-90
                  active:scale-[0.98]
                "
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 fill-white"
                  aria-hidden="true"
                >
                  <path d="M12.04 2a9.84 9.84 0 0 0-8.42 14.93L2 22l5.21-1.56A9.93 9.93 0 1 0 12.04 2Zm0 17.98a8.14 8.14 0 0 1-4.15-1.13l-.3-.18-3.09.92.94-3.01-.2-.31A8.13 8.13 0 1 1 12.04 19.98Zm4.46-6.09c-.24-.12-1.44-.71-1.66-.79-.22-.08-.38-.12-.54.12-.16.24-.62.79-.76.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.95-1.2-.72-.64-1.21-1.44-1.35-1.68-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.31-.74-1.79-.2-.47-.4-.41-.54-.42h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.69 2.58 4.1 3.62.57.25 1.02.4 1.37.51.58.18 1.1.16 1.52.1.46-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28Z" />
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
