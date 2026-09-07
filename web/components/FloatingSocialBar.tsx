"use client";

import {
  FaWhatsapp,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

export default function FloatingSocialBar() {
  return (
    <div className="fixed left-0 top-1/2 -translate-y-1/2 z-[9999] flex flex-col bg-white rounded-r-xl shadow-lg overflow-hidden">

      <a
        href="https://wa.me/9625981155"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="w-14 h-14 flex items-center justify-center text-green-500 text-2xl hover:bg-gray-100"
      >
        <FaWhatsapp />
      </a>

      <a
        href="#"
        aria-label="Facebook"
        className="w-14 h-14 flex items-center justify-center text-blue-600 text-2xl hover:bg-gray-100"
      >
        <FaFacebookF />
      </a>

      <a
        href="https://www.facebook.com/profile.php?id=61561000412885"
        aria-label="Instagram"
        className="w-14 h-14 flex items-center justify-center text-pink-500 text-2xl hover:bg-gray-100"
      >
        <FaInstagram />
      </a>

      <a
        href="https://www.linkedin.com/in/anup-gupta-b05b99425/"
        aria-label="LinkedIn"
        className="w-14 h-14 flex items-center justify-center text-blue-700 text-2xl hover:bg-gray-100"
      >
        <FaLinkedinIn />
      </a>

      <a
        href="#"
        aria-label="YouTube"
        className="w-14 h-14 flex items-center justify-center text-red-600 text-2xl hover:bg-gray-100"
      >
        <FaYoutube />
      </a>

      <a
        href="https://www.youtube.com/channel/UCmSXqR5sF3Kz-FKenpm7rHg"
        className="w-14 h-32 bg-blue-600 text-white flex items-center justify-center text-sm font-bold tracking-wider"
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
