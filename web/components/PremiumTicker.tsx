'use client';

export default function PremiumTicker() {
  const text =
    'BESPOKE TAILORING ✦ DESIGNER MENSWEAR ✦ TAILOR AT HOME ✦ MADE TO MEASURE ✦ HANDCRAFTED DETAILS ✦ PAN INDIA DELIVERY ✦ INTERNATIONAL SHIPPING ✦ ';

  return (
    <div className="w-full overflow-hidden bg-black border-y border-[#C9A35C]/40">
      <div className="ticker-track flex w-max items-center py-3">
        <span className="whitespace-nowrap px-4 text-xs md:text-sm font-semibold tracking-[0.18em] text-[#D4AF70]">
          {text}
        </span>

        <span
          aria-hidden="true"
          className="whitespace-nowrap px-4 text-xs md:text-sm font-semibold tracking-[0.18em] text-[#D4AF70]"
        >
          {text}
        </span>
      </div>

      <style jsx>{`
        .ticker-track {
          animation: ticker 28s linear infinite;
        }

        @keyframes ticker {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
