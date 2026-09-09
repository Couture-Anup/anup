{/* GLOBAL WHATSAPP - ALL DEVICES */}
<a
  href={`https://wa.me/${WHATSAPP_NUMBER}`}
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Chat with Anup Gupta Studio on WhatsApp"
  title="WhatsApp"
  className="
    fixed bottom-5 right-5 z-[9999]
    flex h-14 w-14
    items-center justify-center
    rounded-full
    bg-[#25D366]
    shadow-[0_8px_28px_rgba(0,0,0,0.25)]
    transition-all duration-300
    hover:scale-110
    active:scale-95
  "
>
  <svg
    viewBox="0 0 24 24"
    className="h-7 w-7 fill-white"
    aria-hidden="true"
  >
    <path d="M12.04 2a9.84 9.84 0 0 0-8.42 14.93L2 22l5.21-1.56A9.93 9.93 0 1 0 12.04 2Zm0 17.98a8.14 8.14 0 0 1-4.15-1.13l-.3-.18-3.09.92.94-3.01-.2-.31A8.13 8.13 0 1 1 12.04 19.98Zm4.46-6.09c-.24-.12-1.44-.71-1.66-.79-.22-.08-.38-.12-.54.12-.16.24-.62.79-.76.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.95-1.2-.72-.64-1.21-1.44-1.35-1.68-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.31-.74-1.79-.2-.47-.4-.41-.54-.42h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.69 2.58 4.1 3.62.57.25 1.02.4 1.37.51.58.18 1.1.16 1.52.1.46-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28Z" />
  </svg>

  {/* Online Indicator */}
  <span className="absolute right-0 top-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-green-400" />
</a>
