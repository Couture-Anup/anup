"use client";

import { FormEvent, useState } from "react";

const WHATSAPP_NUMBER = "919625981155";

export default function FloatingSocialBar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    const name = form.get("name")?.toString() || "";
    const phone = form.get("phone")?.toString() || "";
    const email = form.get("email")?.toString() || "";
    const requirement = form.get("requirement")?.toString() || "";
    const message = form.get("message")?.toString() || "";

    const whatsappMessage = `
Hello Anup Gupta Studio,

I would like to make an enquiry.

Name: ${name}
Phone / WhatsApp: ${phone}
Email: ${email}
Requirement: ${requirement}

Message:
${message}
    `.trim();

    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      whatsappMessage
    )}`;

    window.open(whatsappURL, "_blank", "noopener,noreferrer");
  };

  const iconBox =
    "group flex h-14 w-14 items-center justify-center border-b border-gray-100 bg-white transition-all duration-300 hover:w-[62px] hover:bg-gray-50";

  return (
    <>
      {/* Floating Social Bar */}
      <div className="fixed left-0 top-1/2 z-[9998] -translate-y-1/2 overflow-hidden rounded-r-2xl border border-l-0 border-gray-200 bg-white shadow-2xl">

        {/* WhatsApp */}
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          title="WhatsApp"
          className={iconBox}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6 fill-[#25D366]"
            aria-hidden="true"
          >
            <path d="M12.04 2a9.84 9.84 0 0 0-8.42 14.93L2 22l5.21-1.56A9.93 9.93 0 1 0 12.04 2Zm0 17.98a8.14 8.14 0 0 1-4.15-1.13l-.3-.18-3.09.92.94-3.01-.2-.31A8.13 8.13 0 1 1 12.04 19.98Zm4.46-6.09c-.24-.12-1.44-.71-1.66-.79-.22-.08-.38-.12-.54.12-.16.24-.62.79-.76.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.95-1.2-.72-.64-1.21-1.44-1.35-1.68-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.31-.74-1.79-.2-.47-.4-.41-.54-.42h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.69 2.58 4.1 3.62.57.25 1.02.4 1.37.51.58.18 1.1.16 1.52.1.46-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28Z" />
          </svg>
        </a>

        {/* Facebook */}
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
            className="h-6 w-6 fill-[#1877F2]"
            aria-hidden="true"
          >
            <path d="M13.5 22v-9h3l.45-3.5H13.5V7.27c0-1.01.28-1.7 1.73-1.7H17V2.44A23.5 23.5 0 0 0 14.4 2c-2.57 0-4.33 1.57-4.33 4.45V9.5H7v3.5h3.07v9h3.43Z" />
          </svg>
        </a>

        {/* Instagram */}
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
            className="h-6 w-6"
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

        {/* LinkedIn */}
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
            className="h-6 w-6 fill-[#0A66C2]"
            aria-hidden="true"
          >
            <path d="M5.34 3.5A2.34 2.34 0 1 1 .66 3.5a2.34 2.34 0 0 1 4.68 0ZM1 7h4.67v15H1V7Zm7.5 0h4.48v2.05h.06c.62-1.18 2.15-2.42 4.42-2.42 4.73 0 5.6 3.11 5.6 7.16V22h-4.67v-7.27c0-1.74-.03-3.97-2.42-3.97-2.42 0-2.79 1.89-2.79 3.84V22H8.5V7Z" />
          </svg>
        </a>

        {/* YouTube */}
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
            className="h-7 w-7 fill-[#FF0000]"
            aria-hidden="true"
          >
            <path d="M23.5 6.2a3.02 3.02 0 0 0-2.13-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.37.51A3.02 3.02 0 0 0 .5 6.2 31.58 31.58 0 0 0 0 12a31.58 31.58 0 0 0 .5 5.8 3.02 3.02 0 0 0 2.13 2.14c1.87.51 9.37.51 9.37.51s7.5 0 9.37-.51a3.02 3.02 0 0 0 2.13-2.14A31.58 31.58 0 0 0 24 12a31.58 31.58 0 0 0-.5-5.8ZM9.6 15.62V8.38L15.86 12 9.6 15.62Z" />
          </svg>
        </a>

        {/* Enquiry Button */}
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open enquiry form"
          className="flex h-32 w-14 items-center justify-center bg-neutral-950 text-[11px] font-semibold tracking-[0.18em] text-white transition-all duration-300 hover:bg-[#b8955d]"
        >
          <span
            style={{
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
            }}
          >
            ENQUIRY
          </span>
        </button>
      </div>

      {/* Premium Enquiry Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/65 px-4 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl md:p-9"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close enquiry form"
              className="absolute right-5 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-xl text-gray-600 transition hover:bg-gray-200 hover:text-black"
            >
              ×
            </button>

            <div className="mb-7">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#a18150]">
                Anup Gupta Studio
              </p>

              <h2 className="text-2xl font-semibold tracking-tight text-neutral-950 md:text-3xl">
                Personal Styling Enquiry
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Share your requirement and our team will assist you with
                styling, customisation, pricing and appointments.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-gray-600">
                    Name *
                  </label>
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder="Your name"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-gray-600">
                    Phone / WhatsApp *
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    required
                    placeholder="+91"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-gray-600">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-gray-600">
                  Requirement *
                </label>
                <select
                  name="requirement"
                  required
                  defaultValue=""
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                >
                  <option value="" disabled>
                    Select your requirement
                  </option>
                  <option value="Designer Shirt">Designer Shirt</option>
                  <option value="Bespoke Suit">Bespoke Suit</option>
                  <option value="Tuxedo">Tuxedo</option>
                  <option value="Wedding Wear">Wedding Wear</option>
                  <option value="Kurta / Indo-Western">
                    Kurta / Indo-Western
                  </option>
                  <option value="Sherwani">Sherwani</option>
                  <option value="Tailoring Appointment">
                    Tailoring Appointment
                  </option>
                  <option value="International Order">
                    International Order
                  </option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-gray-600">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Tell us about the occasion, outfit or service you are looking for..."
                  className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                />
              </div>

              <button
                type="submit"
                className="mt-2 w-full rounded-xl bg-neutral-950 px-6 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-white transition duration-300 hover:bg-[#b8955d]"
              >
                Send Enquiry on WhatsApp
              </button>

              <p className="text-center text-[11px] leading-5 text-gray-400">
                Clicking Send Enquiry will open WhatsApp with your enquiry
                details ready to send.
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
