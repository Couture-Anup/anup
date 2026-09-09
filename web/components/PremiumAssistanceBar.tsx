"use client";

const WHATSAPP_NUMBER = "919625981155";

export default function PremiumAssistanceBar() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Connect with Anup Gupta Studio on WhatsApp"
      className="
        relative flex w-full min-h-[58px]
        items-center justify-center overflow-hidden
        border-b border-[#9b793d]/50
        bg-[#050505]
        px-5 py-3
        no-underline
      "
    >
      {/* PREMIUM BACKGROUND */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 5% 50%, rgba(205,163,83,0.15), transparent 22%), radial-gradient(circle at 95% 50%, rgba(205,163,83,0.15), transparent 22%), linear-gradient(90deg,#030303 0%,#100d07 50%,#030303 100%)",
        }}
      />

      {/* LEFT GOLD ORNAMENT */}
      <div className="absolute left-6 hidden items-center gap-3 lg:flex">
        <span className="h-px w-14 bg-gradient-to-r from-transparent to-[#a88342]" />

        <span className="h-2.5 w-2.5 rotate-45 border border-[#c59b4e]" />

        <span className="h-px w-8 bg-[#a88342]" />
      </div>

      {/* CENTER CONTENT */}
      <div className="relative z-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-center">
        
        <span className="font-serif text-[15px] leading-relaxed text-[#d9ae58] md:text-[17px]">
          Need assistance with your order, delivery, or any questions?
        </span>

        {/* DIVIDER */}
        <span className="hidden h-6 w-px bg-[#9c793d]/60 md:block" />

        {/* WHATSAPP */}
        <span className="flex items-center justify-center gap-3 font-serif text-[15px] text-[#d9ae58] md:text-[17px]">
          
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#c59b4e] text-[15px]">
            ☎
          </span>

          <span>
            Connect with us on WhatsApp at{" "}
            <strong className="font-semibold tracking-wide text-[#e4b95e]">
              +91 96259 81155
            </strong>
          </span>

        </span>
      </div>

      {/* RIGHT GOLD ORNAMENT */}
      <div className="absolute right-6 hidden items-center gap-3 lg:flex">
        <span className="h-px w-8 bg-[#a88342]" />

        <span className="h-2.5 w-2.5 rotate-45 border border-[#c59b4e]" />

        <span className="h-px w-14 bg-gradient-to-l from-transparent to-[#a88342]" />
      </div>
    </a>
  );
}
