"use client";

const WHATSAPP_NUMBER = "919625981155";

export default function PremiumTopBars() {
  return (
    <div className="relative z-[100] w-full">

      {/* =========================================
          PREMIUM ASSISTANCE / WHATSAPP TOP BAR
      ========================================== */}

      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Connect with Anup Gupta Studio on WhatsApp"
        className="
          group relative block w-full
          overflow-hidden
          border-b border-[#b8955d]/40
          bg-[#050505]
          no-underline
        "
      >

        {/* PREMIUM BLACK + GOLD BACKGROUND */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 5% 50%, rgba(212,175,112,0.14), transparent 22%), radial-gradient(circle at 95% 50%, rgba(212,175,112,0.14), transparent 22%), linear-gradient(90deg,#020202 0%,#0b0906 50%,#020202 100%)",
          }}
        />

        {/* LEFT ORNAMENT */}
        <div
          className="
            pointer-events-none
            absolute left-4 top-1/2
            hidden -translate-y-1/2
            items-center
            xl:flex
          "
        >
          <div
            className="
              h-px w-14
              bg-gradient-to-r
              from-transparent
              to-[#D4AF70]
            "
          />

          <span
            className="
              mx-2
              h-2 w-2
              rotate-45
              border border-[#D4AF70]
            "
          />

          <div className="h-px w-7 bg-[#D4AF70]/60" />
        </div>

        {/* RIGHT ORNAMENT */}
        <div
          className="
            pointer-events-none
            absolute right-4 top-1/2
            hidden -translate-y-1/2
            items-center
            xl:flex
          "
        >
          <div className="h-px w-7 bg-[#D4AF70]/60" />

          <span
            className="
              mx-2
              h-2 w-2
              rotate-45
              border border-[#D4AF70]
            "
          />

          <div
            className="
              h-px w-14
              bg-gradient-to-l
              from-transparent
              to-[#D4AF70]
            "
          />
        </div>

        {/* =========================================
            DESKTOP / TABLET
        ========================================== */}

        <div
          className="
            relative
            hidden
            min-h-[52px]
            items-center
            justify-center
            px-20
            md:flex
          "
        >
          <div
            className="
              flex
              items-center
              justify-center
              gap-5
              text-center
            "
          >

            {/* ASSISTANCE TEXT */}
            <span
              className="
                font-serif
                text-[13px]
                tracking-[0.01em]
                text-[#D6B16A]
                lg:text-[15px]
                xl:text-[16px]
              "
            >
              Need assistance with your order, delivery, or any questions?
            </span>

            {/* GOLD DIVIDER */}
            <span className="h-7 w-px bg-[#D4AF70]/50" />

            {/* WHATSAPP ICON */}
            <span
              className="
                flex h-8 w-8
                shrink-0
                items-center
                justify-center
                rounded-full
                border border-[#D4AF70]/70
                transition-all
                duration-300
                group-hover:border-[#EBCB7B]
                group-hover:shadow-[0_0_16px_rgba(212,175,112,0.35)]
              "
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 fill-[#D4AF70]"
                aria-hidden="true"
              >
                <path d="M12.04 2a9.84 9.84 0 0 0-8.42 14.93L2 22l5.21-1.56A9.93 9.93 0 1 0 12.04 2Zm0 17.98a8.14 8.14 0 0 1-4.15-1.13l-.3-.18-3.09.92.94-3.01-.2-.31A8.13 8.13 0 1 1 12.04 19.98Zm4.46-6.09c-.24-.12-1.44-.71-1.66-.79-.22-.08-.38-.12-.54.12-.16.24-.62.79-.76.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.95-1.2-.72-.64-1.21-1.44-1.35-1.68-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.31-.74-1.79-.2-.47-.4-.41-.54-.42h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.69 2.58 4.1 3.62.57.25 1.02.4 1.37.51.58.18 1.1.16 1.52.1.46-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28Z" />
              </svg>
            </span>

            {/* WHATSAPP TEXT */}
            <span
              className="
                font-serif
                text-[13px]
                text-[#D6B16A]
                lg:text-[15px]
                xl:text-[16px]
              "
            >
              Connect with us on WhatsApp at{" "}
              <strong className="font-semibold text-[#E9C979]">
                +91 96259 81155
              </strong>
            </span>
          </div>
        </div>

        {/* =========================================
            MOBILE PREMIUM COMPACT VERSION
        ========================================== */}

        <div
          className="
            relative
            flex
            min-h-[48px]
            items-center
            justify-center
            px-3
            py-1.5
            md:hidden
          "
        >
          <div
            className="
              flex
              flex-col
              items-center
              justify-center
              gap-[2px]
              text-center
            "
          >
            <span
              className="
                font-serif
                text-[9px]
                leading-[13px]
                tracking-[0.01em]
                text-[#D6B16A]
              "
            >
              Need assistance with your order, delivery, or any questions?
            </span>

            <div className="flex items-center justify-center gap-1.5">

              {/* MOBILE WHATSAPP ICON */}
              <span
                className="
                  flex h-5 w-5
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border border-[#D4AF70]/70
                "
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-3 w-3 fill-[#D4AF70]"
                  aria-hidden="true"
                >
                  <path d="M12.04 2a9.84 9.84 0 0 0-8.42 14.93L2 22l5.21-1.56A9.93 9.93 0 1 0 12.04 2Zm0 17.98a8.14 8.14 0 0 1-4.15-1.13l-.3-.18-3.09.92.94-3.01-.2-.31A8.13 8.13 0 1 1 12.04 19.98Zm4.46-6.09c-.24-.12-1.44-.71-1.66-.79-.22-.08-.38-.12-.54.12-.16.24-.62.79-.76.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.95-1.2-.72-.64-1.21-1.44-1.35-1.68-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.31-.74-1.79-.2-.47-.4-.41-.54-.42h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.69 2.58 4.1 3.62.57.25 1.02.4 1.37.51.58.18 1.1.16 1.52.1.46-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28Z" />
                </svg>
              </span>

              <span
                className="
                  font-serif
                  text-[8.5px]
                  leading-[13px]
                  text-[#D6B16A]
                "
              >
                WhatsApp{" "}
                <strong className="font-semibold text-[#E9C979]">
                  +91 96259 81155
                </strong>
              </span>
            </div>
          </div>
        </div>

        {/* GOLD BOTTOM GLOW */}
        <div
          className="
            pointer-events-none
            absolute bottom-0 left-1/2
            h-px w-[82%]
            -translate-x-1/2
            bg-gradient-to-r
            from-transparent
            via-[#D4AF70]/70
            to-transparent
          "
        />
      </a>
    </div>
  );
}
