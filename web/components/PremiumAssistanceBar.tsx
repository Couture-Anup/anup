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
        group relative flex min-h-[62px] w-full
        items-center justify-center overflow-hidden
        border-b border-[#8f7138]/50
        bg-[#070604]
        px-5
        no-underline
      "
    >
      {/* Background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 5% 50%, rgba(196,154,73,0.13), transparent 20%), radial-gradient(circle at 95% 50%, rgba(196,154,73,0.13), transparent 20%), linear-gradient(90deg,#090806 0%,#151108 50%,#090806 100%)",
        }}
      />

      {/* Left Decoration */}
      <div className="absolute left-5 hidden items-center gap-2 xl:flex">
        <span className="h-px w-14 bg-gradient-to-r from-transparent to-[#9f7c3b]" />
        <span className="h-3 w-3 rotate-45 border border-[#c39a50]" />
        <span className="h-px w-8 bg-[#9f7c3b]" />
      </div>

      {/* Center Content */}
      <div className="relative flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-center">
        <span className="font-serif text-[17px] text-[#e8b94f] md:text-[19px]">
          Need assistance with your order, delivery, or any questions?
        </span>

        <span className="hidden h-6 w-px bg-[#8e7139]/50 md:block" />

        <span className="flex items-center gap-3 font-serif text-[17px] font-semibold text-[#e8b94f] md:text-[18px]">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#c69b48]">
            ☎
          </span>

          <span>
            Connect with us on WhatsApp at{" "}
            <strong className="font-bold tracking-[0.02em]">
              +91 96259 81155
            </strong>
          </span>
        </span>
      </div>

      {/* Right Decoration */}
      <div className="absolute right-5 hidden items-center gap-2 xl:flex">
        <span className="h-px w-8 bg-[#9f7c3b]" />
        <span className="h-3 w-3 rotate-45 border border-[#c39a50]" />
        <span className="h-px w-14 bg-gradient-to-l from-transparent to-[#9f7c3b]" />
      </div>
    </a>
  );
}
