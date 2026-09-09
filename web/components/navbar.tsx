"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Search,
  UserRound,
  ShoppingBag,
  MessageCircle,
  Diamond,
} from "lucide-react";

const WHATSAPP_NUMBER = "919625981155";

const menuItems = [
  { name: "SHIRTS", href: "/collections/shirts" },
  { name: "KURTAS", href: "/collections/kurtas" },
  { name: "BUNDI KURTA", href: "/collections/bundi-kurta" },
  { name: "TUXEDO", href: "/collections/tuxedo" },
  { name: "BANDHGALA", href: "/collections/bandhgala" },
  { name: "INDO LUXE", href: "/collections/indo-luxe" },
  { name: "ACCESSORIES", href: "/collections/accessories" },
  { name: "SHOP BY", href: "/collections" },
];

export function Navbar() {
  return (
    <header className="w-full">
      {/* ============================= */}
      {/* PREMIUM ASSISTANCE BAR */}
      {/* ============================= */}

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
        {/* Premium background */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 5% 50%, rgba(196,154,73,0.13), transparent 20%), radial-gradient(circle at 95% 50%, rgba(196,154,73,0.13), transparent 20%), linear-gradient(90deg,#090806 0%,#151108 50%,#090806 100%)",
          }}
        />

        {/* Left ornament */}
        <div className="absolute left-5 hidden items-center gap-2 xl:flex">
          <span className="h-px w-14 bg-gradient-to-r from-transparent to-[#9f7c3b]" />
          <Diamond
            strokeWidth={1}
            className="h-3.5 w-3.5 text-[#c39a50]"
          />
          <span className="h-px w-8 bg-[#9f7c3b]" />
        </div>

        {/* Content */}
        <div className="relative flex flex-wrap items-center justify-center gap-x-7 gap-y-1 text-center">
          <span
            className="
              font-serif text-[17px] leading-none
              text-[#e8b94f]
              md:text-[19px]
            "
          >
            Need assistance with your order, delivery, or any questions?
          </span>

          <span className="hidden h-6 w-px bg-[#8e7139]/50 md:block" />

          <span className="flex items-center gap-3 font-serif text-[17px] font-semibold text-[#e8b94f] md:text-[18px]">
            <span
              className="
                flex h-36px w-36px items-center justify-center
                rounded-full border border-[#c69b48]
              "
            >
              <MessageCircle className="h-4 w-4" strokeWidth={1.7} />
            </span>

            <span>
              Connect with us on WhatsApp at{" "}
              <strong className="font-bold tracking-[0.02em]">
                +91 96259 81155
              </strong>
            </span>
          </span>
        </div>

        {/* Right ornament */}
        <div className="absolute right-5 hidden items-center gap-2 xl:flex">
          <span className="h-px w-8 bg-[#9f7c3b]" />
          <Diamond
            strokeWidth={1}
            className="h-3.5 w-3.5 text-[#c39a50]"
          />
          <span className="h-px w-14 bg-gradient-to-l from-transparent to-[#9f7c3b]" />
        </div>
      </a>

      {/* ============================= */}
      {/* SIZE INCLUSIVE BAR */}
      {/* ============================= */}

      <div
        className="
          flex h-[30px] items-center justify-center
          bg-white px-4 text-center
          text-[12px] font-bold text-black
        "
      >
        All our products are Size-Inclusive
      </div>

      {/* ============================= */}
      {/* MAIN NAVIGATION */}
      {/* ============================= */}

      <nav
        className="
          relative flex min-h-[145px] w-full
          items-center justify-between
          border-b border-white/5
          bg-[#030303]
          px-7
          lg:px-14
        "
      >
        {/* Logo */}
        <Link
          href="/"
          className="
            relative flex w-[150px]
            flex-shrink-0 items-center
            justify-start
          "
          aria-label="Anup Gupta Studio"
        >
          <Image
            src="/logo.png"
            alt="Anup Gupta Studio"
            width={125}
            height={100}
            priority
            className="h-auto w-[110px] object-contain md:w-[125px]"
          />
        </Link>

        {/* Desktop Menu */}
        <div
          className="
            absolute left-1/2 top-1/2
            hidden -translate-x-1/2 -translate-y-1/2
            items-center gap-8
            xl:flex
          "
        >
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="
                relative whitespace-nowrap
                text-[14px] font-semibold
                tracking-[0.085em]
                text-[#b99348]
                transition-all duration-300
                hover:text-[#f0c96d]
                after:absolute after:-bottom-2
                after:left-1/2 after:h-px after:w-0
                after:-translate-x-1/2
                after:bg-[#c79b49]
                after:transition-all after:duration-300
                hover:after:w-full
              "
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Right Icons */}
        <div className="ml-auto flex items-center gap-7 text-[#c39a49]">
          <button
            type="button"
            aria-label="Search"
            className="
              transition-all duration-300
              hover:scale-110 hover:text-[#efc96e]
            "
          >
            <Search strokeWidth={1.7} className="h-[24px] w-[24px]" />
          </button>

          <Link
            href="/account"
            aria-label="Account"
            className="
              transition-all duration-300
              hover:scale-110 hover:text-[#efc96e]
            "
          >
            <UserRound
              strokeWidth={1.6}
              className="h-[23px] w-[23px]"
            />
          </Link>

          <Link
            href="/cart"
            aria-label="Cart"
            className="
              relative transition-all duration-300
              hover:scale-110 hover:text-[#efc96e]
            "
          >
            <ShoppingBag
              strokeWidth={1.6}
              className="h-[23px] w-[23px]"
            />
          </Link>
        </div>
      </nav>
    </header>
  );
}
