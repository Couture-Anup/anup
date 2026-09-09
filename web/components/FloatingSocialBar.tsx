Today 11:44 AM
Pasted text.txt
Document
ye perfect hai lekin  mobile me size 30% kam kro mobile me aur calling button aur equiy from form fill krne ke ad wo whatsapp pr q le ja rha hai direct apne app msg jaye aur whatsap ke sath sath email pr bh jaye aisha chahta hu mai 
unale to q?
Edit
Edit
Edit
Edit
i want this so we need t create new branch or iin the same code we can use it

Haan, image ki zarurat nahi padegi. Pure code se same premium black + gold header bar ban jayega, aur better hoga kyunki text sharp rahega, responsive hoga, aur WhatsApp number clickable rahega.

Aap existing header ke upar ye complete component use karo:

"use client";

const WHATSAPP_NUMBER = "919625981155";

export default function PremiumWhatsAppBar() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Connect with Anup Gupta Studio on WhatsApp"
      className="
        group relative block w-full overflow-hidden
        border-y border-[#B8955D]/70
        bg-black
      "
    >
      {/* subtle luxury background pattern */}
      <div
        className="
          pointer-events-none absolute inset-0
          opacity-[0.16]
        "
        style={{
          backgroundImage: `
            radial-gradient(circle at 10% 50%, rgba(184,149,93,0.35) 0, transparent 26%),
            radial-gradient(circle at 90% 50%, rgba(184,149,93,0.35) 0, transparent 26%),
            linear-gradient(90deg, transparent 0%, rgba(184,149,93,0.08) 50%, transparent 100%)
          `,
        }}
      />

      {/* left ornament */}
      <div className="pointer-events-none absolute left-0 top-1/2 hidden -translate-y-1/2 items-center md:flex">
        <div className="h-px w-20 bg-[#B8955D]/70" />
        <span className="mx-2 h-2 w-2 rotate-45 border border-[#D4AF70] bg-black" />
      </div>

      {/* right ornament */}
      <div className="pointer-events-none absolute right-0 top-1/2 hidden -translate-y-1/2 items-center md:flex">
        <span className="mx-2 h-2 w-2 rotate-45 border border-[#D4AF70] bg-black" />
        <div className="h-px w-20 bg-[#B8955D]/70" />
      </div>

      <div
        className="
          relative mx-auto flex min-h-[58px] max-w-[1500px]
          items-center justify-center
          px-4 py-3
          sm:px-6
          md:min-h-[72px]
          md:px-28
        "
      >
        <div
          className="
            flex flex-col items-center justify-center
            gap-2 text-center
            md:flex-row md:gap-5
          "
        >
          {/* first text */}
          <p
            className="
              font-serif
              text-[12px]
              leading-5
              tracking-[0.01em]
              text-[#D6B16A]
              sm:text-[13px]
              md:text-[17px]
              lg:text-[20px]
            "
          >
            Need assistance with your order, delivery, or any questions?
          </p>

          {/* separator */}
          <span
            className="
              hidden h-6 w-px
              bg-[#B8955D]/70
              md:block
            "
          />

          {/* WhatsApp area */}
          <div className="flex items-center justify-center gap-2.5">
            {/* WhatsApp icon */}
            <div
              className="
                flex h-7 w-7 items-center justify-center
                rounded-full
                border border-[#D4AF70]/70
                transition-all duration-300
                group-hover:border-[#E7C980]
                group-hover:shadow-[0_0_18px_rgba(212,175,112,0.35)]
                md:h-9 md:w-9
              "
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 fill-[#D4AF70] md:h-5 md:w-5"
                aria-hidden="true"
              >
                <path d="M12.04 2a9.84 9.84 0 0 0-8.42 14.93L2 22l5.21-1.56A9.93 9.93 0 1 0 12.04 2Zm0 17.98a8.14 8.14 0 0 1-4.15-1.13l-.3-.18-3.09.92.94-3.01-.2-.31A8.13 8.13 0 1 1 12.04 19.98Zm4.46-6.09c-.24-.12-1.44-.71-1.66-.79-.22-.08-.38-.12-.54.12-.16.24-.62.79-.76.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.95-1.2-.72-.64-1.21-1.44-1.35-1.68-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.31-.74-1.79-.2-.47-.4-.41-.54-.42h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.69 2.58 4.1 3.62.57.25 1.02.4 1.37.51.58.18 1.1.16 1.52.1.46-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28Z" />
              </svg>
            </div>

            {/* second text */}
            <p
              className="
                font-serif
                text-[11px]
                leading-5
                text-[#D6B16A]
                sm:text-[12px]
                md:text-[16px]
                lg:text-[19px]
              "
            >
              Connect with us on WhatsApp at{" "}
              <span className="font-semibold text-[#E5C272]">
                +91 96259 81155
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* bottom glow line */}
      <div
        className="
          pointer-events-none absolute bottom-0 left-1/2
          h-px w-[70%] -translate-x-1/2
          bg-gradient-to-r
          from-transparent
          via-[#D4AF70]/70
          to-transparent
        "
      />
    </a>
  );
}

Phir apne header file me import karo:

import PremiumWhatsAppBar from "./PremiumWhatsAppBar";

Aur main header se just upar:

<>
  <PremiumWhatsAppBar />

  <header>
    {/* existing navbar */}
  </header>
</>

Isse image jaisa premium black-gold look code se banega, lekin image se better rahega because:

text blur nahi hoga,
mobile par properly resize hoga,
WhatsApp number clickable rahega,
future me wording/number easily change hoga,
website load bhi lighter rahegi.

Agar chaho, main iska aur bhi exact version bana sakta hoon jo aapke screenshot jaisa ho — side floral/cloud ornaments ke saath.

Pasted text(1).txt
Document
is code ke sath implemen kro sare kr sare

Haan bhai — aapke current code ke andar hi sab kuch merge kar diya hai. Aapke existing component me already WhatsApp 919625981155, call popup, mobile compact sizing aur social links hain. Ab usi me premium black + gold header WhatsApp bar bhi add kar rahe hain.

Purani FloatingSocialBar.tsx ka poora code delete karke ye complete code paste kar do. Isme:

Top premium black/gold WhatsApp strip
Pure CSS/code design — koi image nahi
Header strip fully clickable
WhatsApp number +91 96259 81155
Bottom-right permanent WhatsApp button
Left floating social bar
Mobile me small size
Call button light green
Call click → Call Now / WhatsApp choice
Facebook / Instagram / LinkedIn / YouTube
Enquiry button/form bilkul nahi
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
Ek important placement

Aapke current component me global WhatsApp button already sab devices par fixed hai. Upar wale new version me woh same functionality retain hai, bas mobile par aur compact kar diya hai.

Premium black/gold bar tab header ke bilkul upar dikhega jab <FloatingSocialBar /> ko layout/header se pehle render kiya gaya ho.

Agar aapke layout.tsx me abhi:

<Header />
<FloatingSocialBar />

hai, to ise:

<FloatingSocialBar />
<Header />

karna padega.

Lekin ek aur better structure hai: agar ye component currently globally render ho raha hai, to top bar bhi har page par automatically dikhega, aur bottom WhatsApp + floating social buttons bhi har page par rahenge.

Pasted text(2).txt
Document
change the code 
Pasted text(3).txt
Document
ye wali line header me chhiye tha footer me chla gya hai code diya hai change the code taki ye line header me aye footer me nhi webise ke 
?
kya kr diya hai yar proper arrangement chahiye tha pura kharab kr dya tumne mujhe chhiye all sizes exliusive avibaleb hai ushe upr ye asssistant wali line chahiye 

Samajh gaya. Aapko order ye chahiye:

1. Sabse upar: black-gold assistance / WhatsApp line
2. Uske neeche: existing black bar — “All our products are Size-Inclusive”
3. Uske neeche: logo + navigation
4. Uske neeche: hero banner

Abhi jo code diya tha usme assistance bar fixed ho gayi, isi wajah se layout overlap aur arrangement kharab hua. Isliye fixed top bar hata deni chahiye aur assistance bar ko actual header flow me existing Size-Inclusive bar ke upar render karna hoga.

Aapko FloatingSocialBar.tsx se premium header bar ka code poora remove kar dena chahiye. FloatingSocialBar sirf floating social buttons ke liye rahe.

Phir actual header component me structure ye hona chahiye:

<>
  {/* PREMIUM ASSISTANCE BAR */}
  <PremiumWhatsAppHeader />

  {/* EXISTING SIZE-INCLUSIVE BAR */}
  <div className="bg-[#1a1a1a] py-2 text-center text-xs font-semibold text-white">
    All our products are Size-Inclusive
  </div>

  {/* EXISTING MAIN HEADER */}
  <header>
    {/* logo + navigation */}
  </header>
</>

Aur PremiumWhatsAppHeader.tsx ke liye ye clean code use karo:

"use client";

const WHATSAPP_NUMBER = "919625981155";

export default function PremiumWhatsAppHeader() {
  return (
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
            "radial-gradient(circle at 8% 50%, rgba(212,175,112,.16), transparent 24%), radial-gradient(circle at 92% 50%, rgba(212,175,112,.16), transparent 24%), linear-gradient(90deg,#020202,#0b0906 50%,#020202)",
        }}
      />

      <div className="pointer-events-none absolute left-4 top-1/2 hidden -translate-y-1/2 items-center lg:flex">
        <div className="h-px w-14 bg-gradient-to-r from-transparent to-[#D4AF70]" />
        <span className="mx-2 h-2 w-2 rotate-45 border border-[#D4AF70]" />
        <div className="h-px w-7 bg-[#D4AF70]/60" />
      </div>

      <div className="pointer-events-none absolute right-4 top-1/2 hidden -translate-y-1/2 items-center lg:flex">
        <div className="h-px w-7 bg-[#D4AF70]/60" />
        <span className="mx-2 h-2 w-2 rotate-45 border border-[#D4AF70]" />
        <div className="h-px w-14 bg-gradient-to-l from-transparent to-[#D4AF70]" />
      </div>

      <div className="relative mx-auto flex min-h-[46px] max-w-[1500px] items-center justify-center px-3 py-2 md:min-h-[52px] md:px-24">
        <div className="flex flex-col items-center justify-center gap-1 text-center md:flex-row md:gap-4">

          <p className="font-serif text-[10px] leading-4 text-[#D6B16A] sm:text-[11px] md:text-[14px] lg:text-[16px]">
            Need assistance with your order, delivery, or any questions?
          </p>

          <span className="hidden h-6 w-px bg-[#D4AF70]/50 md:block" />

          <div className="flex items-center justify-center gap-2">

            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-[#D4AF70]/70 md:h-8 md:w-8">
              <svg
                viewBox="0 0 24 24"
                className="h-3.5 w-3.5 fill-[#D4AF70] md:h-4 md:w-4"
                aria-hidden="true"
              >
                <path d="M12.04 2a9.84 9.84 0 0 0-8.42 14.93L2 22l5.21-1.56A9.93 9.93 0 1 0 12.04 2Zm0 17.98a8.14 8.14 0 0 1-4.15-1.13l-.3-.18-3.09.92.94-3.01-.2-.31A8.13 8.13 0 1 1 12.04 19.98Zm4.46-6.09c-.24-.12-1.44-.71-1.66-.79-.22-.08-.38-.12-.54.12-.16.24-.62.79-.76.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.95-1.2-.72-.64-1.21-1.44-1.35-1.68-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.31-.74-1.79-.2-.47-.4-.41-.54-.42h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.69 2.58 4.1 3.62.57.25 1.02.4 1.37.51.58.18 1.1.16 1.52.1.46-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28Z" />
              </svg>
            </span>

            <p className="font-serif text-[9.5px] leading-4 text-[#D6B16A] sm:text-[11px] md:text-[14px] lg:text-[16px]">
              Connect with us on WhatsApp at{" "}
              <span className="font-semibold text-[#E9C979]">
                +91 96259 81155
              </span>
            </p>

          </div>
        </div>
      </div>
    </a>
  );
}

Important: assistance bar ko fixed top-0 mat dena. Isi se overlap hua tha.

Aapke screenshot ke hisaab se correct final arrangement:

Assistance / WhatsApp bar
All our products are Size-Inclusive
Logo + categories/nav
Hero image

Agar aap mujhe actual header/navbar file ka code bhej do jisme “All our products are Size-Inclusive” likha hua hai, main usi file ka complete corrected code de dunga, bina layout ko disturb kiye.

pura new code do 

Haan. Ab main aapko clean final structure de raha hoon jisse arrangement exactly ye rahega:

1. Premium black/gold assistance bar
2. Existing “All our products are Size-Inclusive” bar
3. Existing logo + menu/header
4. Hero banner

Aapke current FloatingSocialBar.tsx ke andar premium header bar bhi rakha hua hai, isi wajah se positioning problem aa rahi thi. Floating component ko floating buttons ke liye hi rehne dena better hai.

1. New file banao: components/PremiumTopBars.tsx
"use client";

const WHATSAPP_NUMBER = "919625981155";

export default function PremiumTopBars() {
  return (
    <div className="relative z-[100] w-full">

      {/* =====================================================
          PREMIUM ASSISTANCE / WHATSAPP BAR
      ====================================================== */}

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
        {/* BLACK + GOLD BACKGROUND */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 8% 50%, rgba(212,175,112,0.16), transparent 24%), radial-gradient(circle at 92% 50%, rgba(212,175,112,0.16), transparent 24%), linear-gradient(90deg,#020202 0%,#0b0906 50%,#020202 100%)",
          }}
        />

        {/* SUBTLE GOLD TEXTURE */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, transparent 0px, transparent 12px, rgba(212,175,112,0.14) 13px, transparent 14px)",
          }}
        />

        {/* LEFT DECORATION */}
        <div className="pointer-events-none absolute left-3 top-1/2 hidden -translate-y-1/2 items-center lg:flex">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#D4AF70]" />

          <span className="mx-2 h-2 w-2 rotate-45 border border-[#D4AF70]" />

          <div className="h-px w-6 bg-[#D4AF70]/60" />
        </div>

        {/* RIGHT DECORATION */}
        <div className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 items-center lg:flex">
          <div className="h-px w-6 bg-[#D4AF70]/60" />

          <span className="mx-2 h-2 w-2 rotate-45 border border-[#D4AF70]" />

          <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#D4AF70]" />
        </div>

        {/* CONTENT */}
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
              gap-1
              text-center
              md:flex-row
              md:gap-4
            "
          >
            {/* FIRST TEXT */}
            <p
              className="
                font-serif
                text-[9px]
                leading-4
                tracking-[0.01em]
                text-[#D6B16A]
                sm:text-[10px]
                md:text-[13px]
                lg:text-[15px]
                xl:text-[16px]
              "
            >
              Need assistance with your order, delivery, or any questions?
            </p>

            {/* DIVIDER */}
            <span className="hidden h-6 w-px bg-[#D4AF70]/50 md:block" />

            {/* WHATSAPP AREA */}
            <div className="flex items-center justify-center gap-2">

              {/* ICON */}
              <span
                className="
                  flex h-5 w-5 shrink-0
                  items-center justify-center
                  rounded-full
                  border border-[#D4AF70]/70
                  transition-all duration-300
                  group-hover:border-[#EBCB7B]
                  group-hover:shadow-[0_0_14px_rgba(212,175,112,0.35)]
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

              {/* TEXT */}
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
                <span className="font-semibold tracking-wide text-[#E9C979]">
                  +91 96259 81155
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* GOLD BOTTOM GLOW */}
        <div
          className="
            pointer-events-none
            absolute bottom-0 left-1/2
            h-px w-[80%]
            -translate-x-1/2
            bg-gradient-to-r
            from-transparent
            via-[#D4AF70]/70
            to-transparent
          "
        />
      </a>

      {/* =====================================================
          EXISTING SIZE INCLUSIVE BAR
      ====================================================== */}

      <div
        className="
          flex min-h-[34px]
          w-full items-center justify-center
          bg-[#1a1a1a]
          px-4 py-2
          text-center
        "
      >
        <p className="text-[10px] font-semibold text-white sm:text-[11px] md:text-xs">
          All our products are Size-Inclusive
        </p>
      </div>
    </div>
  );
}
2. layout.tsx me arrangement

Aapke layout me PremiumTopBars ko Header ke immediately pehle rakho:

import PremiumTopBars from "@/components/PremiumTopBars";
import Header from "@/components/Header";
import FloatingSocialBar from "@/components/FloatingSocialBar";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>

        {/* 1. PREMIUM WHATSAPP BAR
            2. SIZE-INCLUSIVE BAR */}
        <PremiumTopBars />

        {/* 3. LOGO + NAVIGATION */}
        <Header />

        {/* 4. WEBSITE CONTENT / HERO */}
        <main>
          {children}
        </main>

        {/* FLOATING SOCIAL BUTTONS */}
        <FloatingSocialBar />

        {/* FOOTER */}
        <Footer />

      </body>
    </html>
  );
}
Important

Aapke current FloatingSocialBar.tsx me black-gold header section abhi bhi lines 16 onward maujood hai. Us section ko wahan se delete karna zaroori hai, warna same assistance bar duplicate ho sakti hai.

FloatingSocialBar.tsx me sirf ye rehna chahiye:

Bottom-right WhatsApp + left call/social buttons + call popup.

Aur aapka existing call/WhatsApp number already +91 96259 81155 configured hai.

Final appearance exactly:

BLACK/GOLD ASSISTANCE BAR
⬇
All our products are Size-Inclusive
⬇
ANUP GUPTA logo + Shirts / Kurtas / Bundi Kurta / Tuxedo / Bandhgala...
⬇
Hero Banner

Kahin bhi fixed top-0 use nahi karna hai for these two top bars. Isi se previous overlap hua tha.

ishme left me jo calling au bottom me whatsapp sab aisha hi hai ?

Haan, agar aap PremiumTopBars ko alag component bana kar layout.tsx me add karte ho, to left side calling/social floating bar aur bottom-right WhatsApp button waise hi rahenge—unko touch nahi karna hai.

Aapke current FloatingSocialBar me bottom-right WhatsApp button already separately defined hai, aur left floating social bar bhi separately defined hai. Call button bhi isi left floating bar me light green background ke saath configured hai.

Final arrangement ye hoga:

Top: Premium assistance bar
Uske neeche: “All our products are Size-Inclusive”
Uske neeche: logo + navigation
Left side: Call + Facebook + Instagram + LinkedIn + YouTube
Bottom-right: WhatsApp floating button
Call click: popup with Call Now / WhatsApp

Bas ek cheez dhyan rahe: FloatingSocialBar.tsx se jo black-gold top header section hai, woh delete karna hai. Sirf floating buttons wala part rehna chahiye.

"use client";

import { useState } from "react";

const WHATSAPP_NUMBER = "919625981155";
const CALL_NUMBER = "+919625981155";

export default function FloatingSocialBar() {
const [showContactOptions, setShowContactOptions] = useState(false);

const iconBox =
"group flex h-9 w-9 md md items-center justify-center border-b border-gray-100 bg-white transition-all duration-300 hover md:hover:w-[62px]";

return (
<>
{/* =========================================
GLOBAL WHATSAPP BUTTON
ALL DEVICES
========================================== */}

  <a
    href={`https://wa.me/${WHATSAPP_NUMBER}`}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="WhatsApp Anup Gupta Studio"
    title="WhatsApp"
    className="
      fixed bottom-4 right-4
      md:bottom-6 md:right-6
      z-[9999]
      flex h-11 w-11
      md:h-14 md:w-14
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
      className="h-5 w-5 md:h-7 md:w-7 fill-white"
      aria-hidden="true"
    >
      <path d="M12.04 2a9.84 9.84 0 0 0-8.42 14.93L2 22l5.21-1.56A9.93 9.93 0 1 0 12.04 2Zm0 17.98a8.14 8.14 0 0 1-4.15-1.13l-.3-.18-3.09.92.94-3.01-.2-.31A8.13 8.13 0 1 1 12.04 19.98Zm4.46-6.09c-.24-.12-1.44-.71-1.66-.79-.22-.08-.38-.12-.54.12-.16.24-.62.79-.76.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.95-1.2-.72-.64-1.21-1.44-1.35-1.68-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.31-.74-1.79-.2-.47-.4-.41-.54-.42h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.69 2.58 4.1 3.62.57.25 1.02.4 1.37.51.58.18 1.1.16 1.52.1.46-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28Z" />
    </svg>
  </a>

  {/* =========================================
      LEFT FLOATING SOCIAL BAR
  ========================================== */}

  <div
    className="
      fixed left-0 top-1/2
      z-[9998]
      -translate-y-1/2
      overflow-hidden
      rounded-r-lg
      md:rounded-r-2xl
      border border-l-0 border-gray-200
      bg-white
      shadow-xl md:shadow-2xl
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
        h-9 w-9
        md:h-14 md:w-14
        items-center justify-center
        border-b border-green-100
        bg-[#dcfce7]
        transition-all duration-300
        hover:bg-[#bbf7d0]
        md:hover:w-[62px]
      "
    >
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4 md:h-6 md:w-6 fill-[#15803d]"
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
        className="h-4 w-4 md:h-6 md:w-6 fill-[#1877F2]"
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
        className="h-4 w-4 md:h-6 md:w-6"
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
        className="h-4 w-4 md:h-6 md:w-6 fill-[#0A66C2]"
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
        className="h-[17px] w-[17px] md:h-7 md:w-7 fill-[#FF0000]"
        aria-hidden="true"
      >
        <path d="M23.5 6.2a3.02 3.02 0 0 0-2.13-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.37.51A3.02 3.02 0 0 0 .5 6.2 31.58 31.58 0 0 0 0 12a31.58 31.58 0 0 0 .5 5.8 3.02 3.02 0 0 0 2.13 2.14c1.87.51 9.37.51 9.37.51s7.5 0 9.37-.51a3.02 3.02 0 0 0 2.13-2.14A31.58 31.58 0 0 0 24 12a31.58 31.58 0 0 0-.5-5.8ZM9.6 15.62V8.38L15.86 12 9.6 15.62Z" />
      </svg>
    </a>
  </div>

  {/* =========================================
      CALL / WHATSAPP POPUP
  ========================================== */}

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
          bg-white
          p-7
          shadow-2xl
        "
        onClick={(e) => e.stopPropagation()}
      >
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

        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#a18150]">
          Anup Gupta Studio
        </p>

        <h3 className="mt-2 text-xl font-semibold text-neutral-950">
          Connect With Us
        </h3>

        <p className="mt-2 text-sm text-gray-500">
          Choose how you would like to contact our team.
        </p>

        <p className="mt-4 text-sm font-semibold text-neutral-900">
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
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  )}
</>

);
}

Close
