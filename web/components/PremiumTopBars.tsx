"use client";

const WHATSAPP_NUMBER = "919625981155";

export default function PremiumTopBars() {
  return (
    <div className="relative z-[100] w-full">

      {/* PREMIUM ASSISTANCE BAR */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Connect with Anup Gupta Studio on WhatsApp"
        className="
          group relative block w-full overflow-hidden
          border-y border-[#b8955d]/50
          bg-[#050505]
        "
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 8% 50%, rgba(212,175,112,0.16), transparent 24%), radial-gradient(circle at 92% 50%, rgba(212,175,112,0.16), transparent 24%), linear-gradient(90deg,#020202 0%,#0b0906 50%,#020202 100%)",
          }}
        />

        <div className="pointer-events-none absolute left-3 top-1/2 hidden -translate-y-1/2 items-center lg:flex">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#D4AF70]" />
          <span className="mx-2 h-2 w-2 rotate-45 border border-[#D4AF70]" />
          <div className="h-px w-6 bg-[#D4AF70]/60" />
        </div>

        <div className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 items-center lg:flex">
          <div className="h-px w-6 bg-[#D4AF70]/60" />
          <span className="mx-2 h-2 w-2 rotate-45 border border-[#D4AF70]" />
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#D4AF70]" />
        </div>

        <div
          className="
            relative mx-auto
            flex min-h-[44px]
            max-w-[1500px]
            items-center justify-center
            px-3 py-2
            sm:min-h-[46px]
            md:min-h-[52px]
            md:px-20
          "
        >
          <div
            className="
              flex w-full
              flex-col items-center justify-center
              gap-1 text-center
              md:flex-row md:gap-4
            "
          >
            <p
              className="
                font-serif
                text-[9px]
                leading-4
                text-[#D6B16A]
                sm:text-[10px]
                md:text-[13px]
                lg:text-[15px]
                xl:text-[16px]
              "
            >
              Need assistance with your order, delivery, or any questions?
            </p>

            <span className="hidden h-6 w-px bg-[#D4AF70]/50 md:block" />

            <div className="flex items-center justify-center gap-2">
              <span
                className="
                  flex h-5 w-5 shrink-0
                  items-center justify-center
                  rounded-full
                  border border-[#D4AF70]/70
                  sm:h-6 sm:w-6
                  md:h-8 md:w-8
                "
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-3 w-3 fill-[#D4AF70] sm:h-3.5 sm:w-3.5 md:h-4 md:w-4"
                  aria-hidden="true"
                >
                  <path d="M12.04 2a9.84 9.84 0 0 0-8.42 14.93L2 22l5.21-1.56A9.93 9.93 0 1 0 12.04 2Zm0 17.98a8.14 8.14 0 0 1-4.15-1.13l-.3-.18-3.09.92.94-3.01-.2-.31A8.13 8.13 0 1 1 12.04 19.98Zm4.46-6.09c-.24-.12-1.44-.71-1.66-.79-.22-.08-.38-.12-.54.12-.16.24-.62.79-.76.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.95-1.2-.72-.64-1.21-1.44-1.35-1.68-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.31-.74-1.79-.2-.47-.4-.41-.54-.42h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.69 2.58 4.1 3.62.57.25 1.02.4 1.37.51.58.18 1.1.16 1.52.1.46-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28Z" />
                </svg>
              </span>

              <p
                className="
                  font-serif
                  text-[8.5px]
                  leading-4
                  text-[#D6B16A]
                  sm:text-[10px]
                  md:text-[13px]
                  lg:text-[15px]
                  xl:text-[16px]
                "
              >
                Connect with us on WhatsApp at{" "}
                <span className="font-semibold text-[#E9C979]">
                  +91 96259 81155
                </span>
              </p>
            </div>
          </div>
        </div>

        <div
          className="
            pointer-events-none absolute bottom-0 left-1/2
            h-px w-[80%] -translate-x-1/2
            bg-gradient-to-r
            from-transparent
            via-[#D4AF70]/70
            to-transparent
          "
        />
      </a>

      {/* SIZE-INCLUSIVE BAR */}
      <div className="flex min-h-[34px] w-full items-center justify-center bg-[#1a1a1a] px-4 py-2 text-center">
        <p className="text-[10px] font-semibold text-white sm:text-[11px] md:text-xs">
          All our products are Size-Inclusive
        </p>
      </div>
    </div>
  );
}
