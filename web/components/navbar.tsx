"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Search,
  UserRound,
  ShoppingBag,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

type NavbarProps = {
  announcements?: any;
  navigation?: any;
};

const menuItems = [
  { label: "SHIRTS", href: "/category/shirts" },
  { label: "KURTAS", href: "/category/kurtas" },
  { label: "BUNDI KURTA", href: "/category/bundi-kurta" },
  { label: "TUXEDO", href: "/category/tuxedo" },
  { label: "BANDHGALA", href: "/category/bandhgala" },
  { label: "INDO LUXE", href: "/category/indo-western" },
  { label: "ACCESSORIES", href: "/category/accessories" },
  { label: "SHOP BY", href: "/collection/all" },
];

export function Navbar({
  announcements,
  navigation,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="relative z-50 w-full bg-[#050505] border-b border-[#1d1d1d]">

      <div className="w-full px-6 md:px-10 lg:px-14">
        <div className="relative flex h-[125px] items-center">

          {/* LOGO */}
          <Link
            href="/"
            aria-label="Anup Gupta Studio"
            className="relative z-10 flex shrink-0 items-center"
          >
            <Image
              src="/logo.png"
              alt="Anup Gupta Studio"
              width={145}
              height={100}
              priority
              className="h-auto w-[105px] object-contain md:w-[120px] lg:w-[130px]"
            />
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 xl:flex 2xl:gap-9">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="
                  relative
                  whitespace-nowrap
                  text-[13px]
                  font-semibold
                  tracking-[0.10em]
                  text-[#b8954e]
                  transition-colors
                  duration-300
                  hover:text-[#e3bd68]

                  after:absolute
                  after:-bottom-3
                  after:left-1/2
                  after:h-px
                  after:w-0
                  after:-translate-x-1/2
                  after:bg-[#d0a557]
                  after:transition-all
                  after:duration-300

                  hover:after:w-full
                "
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* RIGHT ICONS */}
          <div className="ml-auto flex items-center gap-6 text-[#bd974d]">

            {/* SEARCH */}
            <button
              type="button"
              aria-label="Search"
              className="transition-all duration-300 hover:scale-110 hover:text-[#e3bd68]"
            >
              <Search
                className="h-[23px] w-[23px]"
                strokeWidth={1.6}
              />
            </button>

            {/* ACCOUNT */}
            <Link
              href="/account"
              aria-label="Account"
              className="transition-all duration-300 hover:scale-110 hover:text-[#e3bd68]"
            >
              <UserRound
                className="h-[23px] w-[23px]"
                strokeWidth={1.6}
              />
            </Link>

            {/* CART */}
            <Link
              href="/cart"
              aria-label="Cart"
              className="relative transition-all duration-300 hover:scale-110 hover:text-[#e3bd68]"
            >
              <ShoppingBag
                className="h-[23px] w-[23px]"
                strokeWidth={1.6}
              />
            </Link>

            {/* MOBILE HAMBURGER */}
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="xl:hidden transition-colors hover:text-[#e3bd68]"
            >
              {mobileOpen ? (
                <X
                  className="h-[25px] w-[25px]"
                  strokeWidth={1.6}
                />
              ) : (
                <Menu
                  className="h-[25px] w-[25px]"
                  strokeWidth={1.6}
                />
              )}
            </button>

          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="absolute left-0 top-full w-full border-t border-[#242424] bg-[#050505] shadow-2xl xl:hidden">
          <nav className="flex flex-col px-6 py-4">

            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="
                  border-b border-[#1d1d1d]
                  py-4
                  text-[13px]
                  font-semibold
                  tracking-[0.12em]
                  text-[#b8954e]
                  transition-colors
                  hover:text-[#e3bd68]
                "
              >
                {item.label}
              </Link>
            ))}

          </nav>
        </div>
      )}

    </header>
  );
}
