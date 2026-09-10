'use client';

export default function PremiumTicker() {
  const items = [
    'BESPOKE TAILORING',
    'DESIGNER MENSWEAR',
    'TAILOR AT HOME',
    'MADE TO MEASURE',
    'HANDCRAFTED DETAILS',
    'PAN INDIA DELIVERY',
    'INTERNATIONAL SHIPPING',
  ];

  const TickerContent = () => (
    <div className="flex shrink-0 items-center">
      {items.map((item, index) => (
        <div
          key={`${item}-${index}`}
          className="flex shrink-0 items-center"
        >
          <span className="whitespace-nowrap text-xs md:text-sm font-semibold tracking-[0.18em] text-[#D4AF70]">
            {item}
          </span>

          <span
            aria-hidden="true"
            className="mx-5 md:mx-7 text-[10px] md:text-xs text-[#D4AF70]"
          >
            ✦
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="w-full overflow-hidden bg-black border-y border-[#C9A35C]/40">
      <div className="ticker-track flex w-max items-center py-3">
        <TickerContent />
        <TickerContent />
      </div>

      <style jsx>{`
        .ticker-track {
          animation: ticker 32s linear infinite;
          will-change: transform;
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
