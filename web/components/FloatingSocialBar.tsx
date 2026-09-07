"use client";

export default function FloatingSocialBar() {
  const iconClass =
    "w-14 h-14 flex items-center justify-center text-xl font-bold hover:bg-gray-100 transition-colors";

  return (
    <div className="fixed left-0 top-1/2 -translate-y-1/2 z-[9999] flex flex-col bg-white rounded-r-xl shadow-xl overflow-hidden">

      {/* WhatsApp */}
      <a
        href="https://wa.me/919625981155"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className={`${iconClass} text-green-500`}
      >
        WA
      </a>

      {/* Facebook */}
      <a
        href="https://www.facebook.com/profile.php?id=61561000412885"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Facebook"
        className={`${iconClass} text-blue-600 text-2xl`}
      >
        f
      </a>

      {/* Instagram */}
      <a
        href="https://www.instagram.com/anupguptadesigner/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className={`${iconClass} text-pink-500`}
      >
        IG
      </a>

      {/* LinkedIn */}
      <a
        href="https://www.linkedin.com/in/anup-gupta-b05b99425/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        className={`${iconClass} text-blue-700`}
      >
        in
      </a>

      {/* YouTube */}
      <a
        href="https://www.youtube.com/channel/UCmSXqR5sF3Kz-FKenpm7rHg"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="YouTube"
        className={`${iconClass} text-red-600`}
      >
        ▶
      </a>

      {/* Enquiry */}
      <a
        href="/contact"
        aria-label="Enquiry"
        className="w-14 h-32 bg-blue-600 text-white flex items-center justify-center text-xs font-bold tracking-wider"
        style={{
          writingMode: "vertical-rl",
          transform: "rotate(180deg)",
        }}
      >
        ENQUIRY
      </a>

    </div>
  );
}
