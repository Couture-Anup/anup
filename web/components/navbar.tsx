'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  User,
  ShoppingBag,
  Menu,
  X,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { SearchModal } from './search-modal';
import { AuthModal } from './auth-modal';
import { useAuth } from '@/contexts/AuthContext';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { useCart } from '@/contexts/CartContext';

function NavItem({
  label,
  href = '#',
  links,
  columns,
  images,
}: {
  label: string;
  href?: string;
  links?: { label: string; href: string }[];
  columns?: {
    title?: string;
    links: { label: string; href: string }[];
  }[];
  images?: { src: string; label: string; href: string }[];
}) {
  return (
    <div className="group flex h-full items-center">
      <Link
        href={href}
        className="
          flex h-full items-center gap-1
          text-[#C9A35C]
          transition-colors duration-300
          hover:text-[#F1D18A]
        "
      >
        {label}
      </Link>

      {(links || columns) && (
        <div
          className="
            invisible absolute left-0 top-[118px] z-50
            w-full
            border-t border-[#C9A35C]/25
            bg-[#080808]
            opacity-0
            shadow-2xl
            transition-all duration-300
            group-hover:visible
            group-hover:opacity-100
          "
        >
          <div className="mx-auto flex max-w-[1600px] px-8 py-10">

            {links && !columns && (
              <div className="flex w-[400px] flex-col gap-4">
                {links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="
                      text-sm font-medium uppercase tracking-wide
                      text-[#C9A35C]
                      transition-colors
                      hover:text-[#F1D18A]
                    "
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}

            {columns && (
              <div className="flex gap-16">
                {columns.map((col, idx) => (
                  <div
                    key={idx}
                    className="flex w-[250px] flex-col gap-4"
                  >
                    {col.title && (
                      <h4 className="mb-1 text-xs font-semibold uppercase tracking-widest text-[#8F7444]">
                        {col.title}
                      </h4>
                    )}

                    {col.links.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        className="
                          text-sm font-medium uppercase tracking-wide
                          text-[#C9A35C]
                          transition-colors
                          hover:text-[#F1D18A]
                        "
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            )}

            {images && (
              <div className="flex flex-1 justify-end gap-6">
                {images.map((img, i) => (
                  <Link
                    href={img.href}
                    key={i}
                    className="
                      group/img relative block
                      aspect-[3/4] w-[300px]
                      cursor-pointer overflow-hidden
                    "
                  >
                    <Image
                      src={img.src}
                      alt={img.label}
                      fill
                      className="
                        object-cover
                        transition-transform duration-700
                        group-hover/img:scale-105
                      "
                      referrerPolicy="no-referrer"
                    />

                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#E8C675]">
                        {img.label}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export function Navbar({
  announcements,
  navigation,
}: {
  announcements?: any[];
  navigation?: any;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const [authModalMode, setAuthModalMode] =
    useState<'login' | 'signup'>('login');

  const [currentAnnouncementIndex, setCurrentAnnouncementIndex] =
    useState(0);

  const { user, sanityUser } = useAuth();
  const { cartCount, setIsCartOpen } = useCart();

  const activeAnnouncements =
    announcements && announcements.length > 0
      ? announcements
      : [{ text: 'All our products are Size-Inclusive' }];

  useEffect(() => {
    if (activeAnnouncements.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentAnnouncementIndex(
        (prev) => (prev + 1) % activeAnnouncements.length
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [activeAnnouncements.length]);

  const nextAnnouncement = () => {
    setCurrentAnnouncementIndex(
      (prev) => (prev + 1) % activeAnnouncements.length
    );
  };

  const prevAnnouncement = () => {
    setCurrentAnnouncementIndex(
      (prev) =>
        (prev - 1 + activeAnnouncements.length) %
        activeAnnouncements.length
    );
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* =====================================================
          SIZE-INCLUSIVE BAR
          WHITE + SLIM
      ====================================================== */}

      <div
        className="
          relative
          flex min-h-[24px]
          items-center justify-center
          border-b border-[#C9A35C]/15
          bg-white
          px-4 py-[3px]
          text-black
        "
      >
        {activeAnnouncements.length > 1 && (
          <button
            suppressHydrationWarning
            onClick={prevAnnouncement}
            className="
              absolute left-4
              text-gray-400
              transition-colors
              hover:text-black
              md:left-8
            "
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>
        )}

        <div
          className="
            animate-in fade-in
            text-center
            text-[9px]
            font-bold
            tracking-wide
            duration-500
            sm:text-[9.5px]
            md:text-[10px]
          "
          key={currentAnnouncementIndex}
        >
          {activeAnnouncements[currentAnnouncementIndex].text}{' '}

          {activeAnnouncements[currentAnnouncementIndex].code && (
            <span
              className={
                activeAnnouncements[currentAnnouncementIndex].codeColor ||
                'text-gray-600'
              }
            >
              {activeAnnouncements[currentAnnouncementIndex].code}
            </span>
          )}
        </div>

        {activeAnnouncements.length > 1 && (
          <button
            suppressHydrationWarning
            onClick={nextAnnouncement}
            className="
              absolute right-4
              text-gray-400
              transition-colors
              hover:text-black
              md:right-8
            "
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* =====================================================
          MAIN PREMIUM BLACK + GOLD NAVBAR
      ====================================================== */}

      <header
        className="
          sticky top-0 z-50
          border-b border-[#C9A35C]/30
          bg-[#050505]
          shadow-[0_6px_25px_rgba(0,0,0,0.22)]
        "
      >
        {/* =====================================================
            MOBILE HEADER
        ====================================================== */}

        <div
          className="
            flex h-[76px]
            items-center justify-between
            px-4
            lg:hidden
          "
        >
          <div className="flex flex-1 items-center">
            <button
              className="
                -ml-1 p-1
                text-[#C9A35C]
                transition-colors
                hover:text-[#F1D18A]
              "
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" strokeWidth={1.5} />
            </button>
          </div>

          {/* MOBILE LOGO - FULL VISIBLE */}

          <Link
            href="/"
            className="
              flex h-full
              w-[150px]
              shrink-0
              items-center justify-center
            "
          >
            <Image
              src="/anup-gupta-gold-logo.png"
              alt="Anup Gupta Menswear Designer"
              width={150}
              height={150}
              priority
              className="
                h-[70px]
                w-[70px]
                object-contain
              "
            />
          </Link>

          <div className="flex flex-1 items-center justify-end gap-4">

            <SearchModal
              triggerClass="
                text-[#C9A35C]
                hover:text-[#F1D18A]
                transition-colors
                p-1
              "
            />

            <button
              onClick={() => setIsCartOpen(true)}
              className="
                relative -mr-1
                cursor-pointer p-1
                text-[#C9A35C]
                transition-colors
                hover:text-[#F1D18A]
              "
              aria-label="Open shopping bag"
            >
              <ShoppingBag
                className="h-5 w-5"
                strokeWidth={1.5}
              />

              {cartCount > 0 && (
                <span
                  className="
                    absolute -right-1 -top-1
                    flex h-4 w-4
                    items-center justify-center
                    rounded-full
                    bg-[#C9A35C]
                    text-[9px]
                    font-bold
                    text-black
                  "
                >
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* =====================================================
            DESKTOP HEADER
        ====================================================== */}

        <div
          className="
            mx-auto hidden
            h-[118px]
            max-w-[1900px]
            items-center justify-between
            px-8
            lg:flex
          "
        >
          {/* =====================================================
              DESKTOP LOGO
              FULL IMAGE - NO CROP - NO OVERFLOW HIDDEN
          ====================================================== */}

          <Link
            href="/"
            className="
              flex h-full
              w-[300px]
              shrink-0
              items-center justify-start
            "
          >
            <Image
              src="/anup-gupta-gold-logo.png"
              alt="Anup Gupta Menswear Designer"
              width={200}
              height={200}
              priority
              className="
                h-[108px]
                w-[108px]
                object-contain
              "
            />
          </Link>

          {/* =====================================================
              NAVIGATION
          ====================================================== */}

          <nav
            className="
              flex h-full flex-1
              items-center justify-center
              gap-5
              text-[11px]
              font-semibold
              uppercase
              tracking-[0.11em]
              xl:gap-7
            "
          >
            {navigation?.categories?.map((cat: any) => {
              const links =
                cat.subcategories?.length > 0
                  ? cat.subcategories.map((sub: any) => ({
                      label: sub.title,
                      href: `/category/${sub.slug}`,
                    }))
                  : undefined;

              const images = [];

              if (cat.imageUrl) {
                images.push({
                  src: cat.imageUrl,
                  label: `All ${cat.title} Products`,
                  href: `/category/${cat.slug}`,
                });
              }

              const subWithImage = cat.subcategories?.find(
                (sub: any) => sub.imageUrl
              );

              if (subWithImage) {
                images.push({
                  src: subWithImage.imageUrl,
                  label: `All ${subWithImage.title} Products`,
                  href: `/category/${subWithImage.slug}`,
                });
              }

              return (
                <NavItem
                  key={cat.slug}
                  label={cat.title}
                  href={`/category/${cat.slug}`}
                  links={links}
                  images={images.length > 0 ? images : undefined}
                />
              );
            })}

            <NavItem
              label="Shop By"
              columns={[
                {
                  title: 'Collections',
                  links: (navigation?.collections || []).map((col: any) => ({
                    label: col.title,
                    href: `/collection/${col.slug}`,
                  })),
                },
                {
                  title: 'Featured',
                  links: [
                    {
                      label: 'Shop All',
                      href: '/collection/all',
                    },
                    {
                      label: 'New Arrivals',
                      href: '/collection/new-in',
                    },
                    {
                      label: 'Bestsellers',
                      href: '/collection/bestsellers',
                    },
                  ],
                },
              ]}
            />
          </nav>

          {/* =====================================================
              RIGHT ICONS
          ====================================================== */}

          <div
            className="
              flex h-full
              w-[210px]
              items-center justify-end
              gap-5
            "
          >
            <SearchModal
              triggerClass="
                text-[#C9A35C]
                hover:text-[#F1D18A]
                transition-colors
                p-1
              "
            />

            {/* PROFILE */}

            <div className="group/profile relative flex h-full items-center">

              {user ? (
                <Link
                  href="/profile"
                  className="
                    flex h-full items-center p-1
                    text-[#C9A35C]
                    transition-colors
                    hover:text-[#F1D18A]
                  "
                >
                  <User
                    className="h-[18px] w-[18px]"
                    strokeWidth={2}
                  />
                </Link>
              ) : (
                <button
                  suppressHydrationWarning
                  onClick={() => {
                    setAuthModalMode('login');
                    setIsAuthModalOpen(true);
                  }}
                  className="
                    flex h-full items-center p-1
                    text-[#C9A35C]
                    transition-colors
                    hover:text-[#F1D18A]
                  "
                >
                  <User
                    className="h-[18px] w-[18px]"
                    strokeWidth={2}
                  />
                </button>
              )}

              {/* PROFILE DROPDOWN */}

              <div
                className="
                  invisible absolute
                  right-0 top-full z-50
                  flex w-[200px]
                  flex-col
                  rounded-b-md
                  border border-[#C9A35C]/25
                  bg-[#080808]
                  py-2
                  opacity-0
                  shadow-xl
                  transition-all duration-300
                  group-hover/profile:visible
                  group-hover/profile:opacity-100
                "
              >
                {user ? (
                  <>
                    <div className="mb-1 border-b border-[#C9A35C]/20 px-4 py-2">
                      <span className="block truncate text-[11px] font-semibold text-[#E7C77E]">
                        {user.displayName || user.email}
                      </span>
                    </div>

                    {sanityUser?.isAdmin && (
                      <Link
                        href="/admin"
                        className="
                          px-4 py-2.5
                          text-[11px]
                          font-bold uppercase
                          tracking-wider
                          text-[#E7C77E]
                          hover:bg-[#15120c]
                        "
                      >
                        Admin Portal
                      </Link>
                    )}

                    <Link
                      href="/profile"
                      className="
                        px-4 py-2.5
                        text-[11px]
                        font-semibold uppercase
                        tracking-wider
                        text-[#C9A35C]
                        hover:bg-[#15120c]
                        hover:text-[#F1D18A]
                      "
                    >
                      Profile
                    </Link>

                    <button
                      onClick={() => signOut(auth)}
                      className="
                        mt-1 w-full
                        cursor-pointer
                        border-t border-[#C9A35C]/20
                        px-4 py-3
                        text-left
                        text-[11px]
                        font-semibold uppercase
                        tracking-wider
                        text-red-400
                        hover:bg-[#15120c]
                      "
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      suppressHydrationWarning
                      onClick={() => {
                        setAuthModalMode('login');
                        setIsAuthModalOpen(true);
                      }}
                      className="
                        w-full
                        cursor-pointer
                        px-4 py-2.5
                        text-left
                        text-[11px]
                        font-semibold uppercase
                        tracking-wider
                        text-[#C9A35C]
                        hover:bg-[#15120c]
                        hover:text-[#F1D18A]
                      "
                    >
                      Log In
                    </button>

                    <button
                      suppressHydrationWarning
                      onClick={() => {
                        setAuthModalMode('signup');
                        setIsAuthModalOpen(true);
                      }}
                      className="
                        w-full
                        cursor-pointer
                        px-4 py-2.5
                        text-left
                        text-[11px]
                        font-semibold uppercase
                        tracking-wider
                        text-[#C9A35C]
                        hover:bg-[#15120c]
                        hover:text-[#F1D18A]
                      "
                    >
                      Create Account
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* CART */}

            <button
              suppressHydrationWarning
              onClick={() => setIsCartOpen(true)}
              className="
                relative -mr-1
                cursor-pointer p-1
                text-[#C9A35C]
                transition-colors
                hover:text-[#F1D18A]
              "
              aria-label="Open shopping bag"
            >
              <ShoppingBag
                className="h-[18px] w-[18px]"
                strokeWidth={2}
              />

              {cartCount > 0 && (
                <span
                  className="
                    absolute -right-1 -top-1
                    flex h-4 w-4
                    items-center justify-center
                    rounded-full
                    bg-[#C9A35C]
                    text-[9px]
                    font-bold
                    text-black
                  "
                >
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* AUTH MODAL */}

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authModalMode}
      />

      {/* =====================================================
          MOBILE MENU
      ====================================================== */}

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">

          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          <div
            className="
              absolute inset-y-0 left-0
              flex h-full
              w-[85%]
              max-w-[400px]
              flex-col
              border-r border-[#C9A35C]/30
              bg-[#070707]
              shadow-2xl
              animate-in slide-in-from-left
              duration-300
            "
          >
            {/* MENU HEADER */}

            <div className="flex items-center justify-between border-b border-[#C9A35C]/20 p-4">
              <span className="text-[13px] font-semibold uppercase tracking-wider text-[#C9A35C]">
                Menu
              </span>

              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="-mr-2 p-2 text-[#C9A35C] transition-colors hover:text-[#F1D18A]"
              >
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>

            {/* MOBILE LINKS */}

            <div className="flex-1 overflow-y-auto py-4">

              <nav
                className="
                  flex flex-col
                  text-[13px]
                  font-semibold uppercase
                  tracking-wider
                  text-[#C9A35C]
                "
              >
                <Link
                  href="/collection/new-in"
                  className="
                    flex items-center justify-between
                    border-b border-[#C9A35C]/10
                    px-6 py-4
                  "
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  New In

                  <ChevronRight className="h-4 w-4 text-[#8F7444]" />
                </Link>

                {navigation?.categories?.map((cat: any) => (
                  <div
                    key={cat.slug}
                    className="flex flex-col border-b border-[#C9A35C]/10"
                  >
                    <Link
                      href={`/category/${cat.slug}`}
                      className="flex items-center justify-between px-6 py-4"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {cat.title}

                      <ChevronRight className="h-4 w-4 text-[#8F7444]" />
                    </Link>

                    {cat.subcategories?.map((sub: any) => (
                      <Link
                        key={sub.slug}
                        href={`/category/${sub.slug}`}
                        className="
                          flex items-center justify-between
                          px-10 py-3
                          text-[11px]
                          text-[#A98B52]
                        "
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {sub.title}
                      </Link>
                    ))}
                  </div>
                ))}

                {navigation?.collections?.map((col: any) => (
                  <Link
                    key={col.slug}
                    href={`/collection/${col.slug}`}
                    className="
                      flex items-center justify-between
                      border-b border-[#C9A35C]/10
                      px-6 py-4
                    "
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {col.title}

                    <ChevronRight className="h-4 w-4 text-[#8F7444]" />
                  </Link>
                ))}
              </nav>
            </div>

            {/* MOBILE ACCOUNT */}

            <div
              className="
                flex flex-col gap-4
                border-t border-[#C9A35C]/20
                bg-[#0C0C0C]
                p-6
              "
            >
              {user ? (
                <>
                  <div
                    className="
                      flex items-center gap-3
                      border-b border-[#C9A35C]/20
                      pb-2
                      text-sm font-medium
                      text-[#C9A35C]
                    "
                  >
                    <User
                      className="h-5 w-5"
                      strokeWidth={1.5}
                    />

                    <div className="flex flex-col">
                      <span>My Account</span>

                      <span className="text-[11px] font-normal text-[#8F7444]">
                        {user.displayName || user.email}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">

                    {sanityUser?.isAdmin && (
                      <Link
                        href="/admin"
                        className="
                          w-full rounded-lg
                          bg-[#15120c]
                          px-4 py-3
                          text-left
                          text-[13px]
                          font-semibold
                          text-[#E7C77E]
                        "
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Admin Portal
                      </Link>
                    )}

                    <Link
                      href="/profile"
                      className="
                        w-full rounded-lg
                        bg-[#111]
                        px-4 py-3
                        text-left
                        text-[13px]
                        font-semibold
                        text-[#C9A35C]
                      "
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Profile
                    </Link>

                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        signOut(auth);
                      }}
                      className="
                        w-full rounded-lg
                        bg-[#111]
                        px-4 py-3
                        text-left
                        text-[13px]
                        font-semibold
                        text-red-400
                      "
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col gap-3">

                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setAuthModalMode('login');
                      setIsAuthModalOpen(true);
                    }}
                    className="
                      flex w-full
                      items-center justify-center
                      gap-2
                      rounded-lg
                      border border-[#C9A35C]/40
                      bg-[#111]
                      px-4 py-3.5
                      text-[13px]
                      font-semibold
                      text-[#C9A35C]
                    "
                  >
                    <User className="h-4 w-4" />
                    Log In
                  </button>

                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setAuthModalMode('signup');
                      setIsAuthModalOpen(true);
                    }}
                    className="
                      w-full rounded-lg
                      bg-[#C9A35C]
                      px-4 py-3.5
                      text-center
                      text-[13px]
                      font-semibold
                      text-black
                      transition-colors
                      hover:bg-[#E2C176]
                    "
                  >
                    Create Account
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
