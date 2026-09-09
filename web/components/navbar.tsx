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

const GOLD = '#C9A35C';

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
  rightAlign?: boolean;
}) {
  return (
    <div className="group h-full flex items-center">
      <Link
        href={href}
        className="
          h-full flex items-center gap-1
          text-[#C9A35C]
          hover:text-[#F1D18A]
          transition-colors duration-300
        "
      >
        {label}
      </Link>

      {(links || columns) && (
        <div
          className="
            absolute top-[64px] left-0 w-full
            bg-[#080808]
            border-t border-[#C9A35C]/30
            shadow-2xl
            opacity-0 invisible
            group-hover:opacity-100
            group-hover:visible
            transition-all duration-300
            z-50
          "
        >
          <div className="max-w-[1600px] mx-auto px-8 py-10 flex">

            {links && !columns && (
              <div className="w-[400px] flex flex-col gap-4">
                {links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="
                      text-sm font-medium tracking-wide
                      text-[#C9A35C]
                      hover:text-[#F1D18A]
                      transition-colors uppercase
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
                    className="flex flex-col gap-4 w-[250px]"
                  >
                    {col.title && (
                      <h4
                        className="
                          text-xs text-[#8F7444]
                          font-semibold tracking-widest
                          uppercase mb-1
                        "
                      >
                        {col.title}
                      </h4>
                    )}

                    {col.links.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        className="
                          text-sm font-medium tracking-wide
                          text-[#C9A35C]
                          hover:text-[#F1D18A]
                          transition-colors uppercase
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
              <div className="flex-1 flex gap-6 justify-end">
                {images.map((img, i) => (
                  <Link
                    href={img.href}
                    key={i}
                    className="
                      relative w-[300px]
                      aspect-[3/4]
                      group/img
                      overflow-hidden
                      cursor-pointer block
                    "
                  >
                    <Image
                      src={img.src}
                      alt={img.label}
                      fill
                      className="
                        object-cover
                        transition-transform
                        duration-700
                        group-hover/img:scale-105
                      "
                      referrerPolicy="no-referrer"
                    />

                    <div
                      className="
                        absolute inset-x-0 bottom-0 p-4
                        bg-gradient-to-t
                        from-black/80
                        to-transparent
                      "
                    >
                      <span
                        className="
                          text-[#E8C675]
                          text-xs font-semibold
                          uppercase tracking-wider
                        "
                      >
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
      {/* =========================================================
          SIZE-INCLUSIVE ANNOUNCEMENT BAR
          WHITE BACKGROUND + BLACK TEXT
      ========================================================== */}

      <div
        className="
          bg-white text-black
          min-h-[44px]
          py-2.5
          relative
          flex items-center justify-center
          border-b border-[#C9A35C]/30
        "
      >
        {activeAnnouncements.length > 1 && (
          <button
            suppressHydrationWarning
            onClick={prevAnnouncement}
            className="
              absolute left-4 md:left-8
              text-gray-500
              hover:text-black
              transition-colors
            "
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}

        <div
          className="
            text-[11px] sm:text-xs
            text-center
            font-bold
            tracking-wide
            animate-in fade-in
            duration-500
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
              absolute right-4 md:right-8
              text-gray-500
              hover:text-black
              transition-colors
            "
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* =========================================================
          PREMIUM BLACK + GOLD NAVIGATION
      ========================================================== */}

      <header
        className="
          sticky top-0 z-50
          bg-[#050505]
          border-b border-[#C9A35C]/40
          shadow-[0_6px_25px_rgba(0,0,0,0.22)]
        "
      >
        {/* ================= MOBILE HEADER ================= */}

        <div
          className="
            lg:hidden
            px-4
            h-[64px]
            flex items-center justify-between
          "
        >
          <div className="flex items-center gap-4 flex-1">
            <button
              className="
                text-[#C9A35C]
                hover:text-[#F1D18A]
                transition-colors
                p-1 -ml-1
              "
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" strokeWidth={1.5} />
            </button>
          </div>

          {/* MOBILE GOLD LOGO */}

          <Link
            href="/"
            className="
              flex items-center justify-center
              shrink-0
            "
          >
            <Image
              src="/anup-gupta-gold-logo.png"
              alt="Anup Gupta Menswear Designer"
              width={180}
              height={180}
              priority
              className="
                h-[54px]
                w-auto
                object-contain
              "
            />
          </Link>

          <div
            className="
              flex items-center gap-4
              justify-end flex-1
            "
          >
            <SearchModal
              triggerClass="
                text-[#C9A35C]
                hover:text-[#F1D18A]
                transition-colors p-1
              "
            />

            <button
              onClick={() => setIsCartOpen(true)}
              className="
                text-[#C9A35C]
                hover:text-[#F1D18A]
                transition-colors
                relative p-1 -mr-1
                cursor-pointer
              "
            >
              <ShoppingBag
                className="w-5 h-5"
                strokeWidth={1.5}
              />

              {cartCount > 0 && (
                <span
                  className="
                    absolute -top-1 -right-1
                    bg-[#C9A35C]
                    text-black
                    text-[9px]
                    font-bold
                    w-4 h-4
                    rounded-full
                    flex items-center justify-center
                  "
                >
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* ================= DESKTOP HEADER ================= */}

        <div
          className="
            hidden lg:flex
            px-8
            h-[78px]
            items-center justify-between
            max-w-[1800px]
            mx-auto
          "
        >
          {/* GOLD LOGO */}

          <Link
            href="/"
            className="
              flex items-center
              justify-start
              shrink-0
              w-[220px]
              h-full
            "
          >
            <Image
              src="/anup-gupta-gold-logo.png"
              alt="Anup Gupta Menswear Designer"
              width={260}
              height={260}
              priority
              className="
                h-[70px]
                w-auto
                object-contain
              "
            />
          </Link>

          {/* ================= NAVIGATION ================= */}

          <nav
            className="
              flex
              gap-6 xl:gap-8
              text-[11px]
              font-semibold
              tracking-[0.12em]
              uppercase
              h-full
              flex-1
              justify-center
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
                  images={
                    images.length > 0
                      ? images
                      : undefined
                  }
                />
              );
            })}

            {/* SHOP BY */}

            <NavItem
              label="Shop By"
              columns={[
                {
                  title: 'Collections',
                  links: (
                    navigation?.collections || []
                  ).map((col: any) => ({
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

          {/* ================= RIGHT ICONS ================= */}

          <div
            className="
              flex items-center gap-5
              justify-end
              w-[220px]
              h-full
            "
          >
            <SearchModal
              triggerClass="
                text-[#C9A35C]
                hover:text-[#F1D18A]
                transition-colors p-1
              "
            />

            {/* PROFILE */}

            <div
              className="
                relative
                group/profile
                h-full
                flex items-center
              "
            >
              {user ? (
                <Link
                  href="/profile"
                  className="
                    text-[#C9A35C]
                    hover:text-[#F1D18A]
                    transition-colors
                    p-1
                    flex items-center
                    h-full
                  "
                >
                  <User
                    className="w-[18px] h-[18px]"
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
                    text-[#C9A35C]
                    hover:text-[#F1D18A]
                    transition-colors
                    p-1
                    flex items-center
                    h-full
                  "
                >
                  <User
                    className="w-[18px] h-[18px]"
                    strokeWidth={2}
                  />
                </button>
              )}

              {/* PROFILE DROPDOWN */}

              <div
                className="
                  absolute top-full right-0
                  w-[200px]
                  bg-[#080808]
                  border border-[#C9A35C]/30
                  shadow-xl
                  opacity-0 invisible
                  group-hover/profile:opacity-100
                  group-hover/profile:visible
                  transition-all duration-300
                  z-50
                  flex flex-col
                  py-2
                  rounded-b-md
                "
              >
                {user ? (
                  <>
                    <div
                      className="
                        px-4 py-2
                        border-b border-[#C9A35C]/20
                        mb-1
                      "
                    >
                      <span
                        className="
                          block
                          text-[11px]
                          font-semibold
                          text-[#E7C77E]
                          truncate
                        "
                      >
                        {user.displayName || user.email}
                      </span>
                    </div>

                    {sanityUser?.isAdmin && (
                      <Link
                        href="/admin"
                        className="
                          px-4 py-2.5
                          text-[11px]
                          font-bold
                          tracking-wider
                          uppercase
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
                        font-semibold
                        tracking-wider
                        uppercase
                        text-[#C9A35C]
                        hover:text-[#F1D18A]
                        hover:bg-[#15120c]
                      "
                    >
                      Profile
                    </Link>

                    <button
                      onClick={() => signOut(auth)}
                      className="
                        text-left
                        cursor-pointer
                        px-4 py-2.5
                        text-[11px]
                        font-semibold
                        tracking-wider
                        uppercase
                        text-red-400
                        hover:bg-[#15120c]
                        border-t border-[#C9A35C]/20
                        mt-1 pt-3.5
                        w-full
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
                        text-left w-full
                        cursor-pointer
                        px-4 py-2.5
                        text-[11px]
                        font-semibold
                        tracking-wider
                        uppercase
                        text-[#C9A35C]
                        hover:text-[#F1D18A]
                        hover:bg-[#15120c]
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
                        text-left w-full
                        cursor-pointer
                        px-4 py-2.5
                        text-[11px]
                        font-semibold
                        tracking-wider
                        uppercase
                        text-[#C9A35C]
                        hover:text-[#F1D18A]
                        hover:bg-[#15120c]
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
                text-[#C9A35C]
                hover:text-[#F1D18A]
                transition-colors
                relative p-1 -mr-1
                cursor-pointer
              "
            >
              <ShoppingBag
                className="w-[18px] h-[18px]"
                strokeWidth={2}
              />

              {cartCount > 0 && (
                <span
                  className="
                    absolute -top-1 -right-1
                    bg-[#C9A35C]
                    text-black
                    text-[9px]
                    font-bold
                    w-4 h-4
                    rounded-full
                    flex items-center justify-center
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

      {/* =========================================================
          MOBILE MENU
      ========================================================== */}

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">

          <div
            className="
              absolute inset-0
              bg-black/70
              transition-opacity
            "
            onClick={() => setIsMobileMenuOpen(false)}
          />

          <div
            className="
              absolute inset-y-0 left-0
              w-[85%]
              max-w-[400px]
              bg-[#070707]
              flex flex-col
              h-full
              shadow-2xl
              animate-in
              slide-in-from-left
              duration-300
              border-r border-[#C9A35C]/30
            "
          >
            {/* MOBILE MENU HEADER */}

            <div
              className="
                flex items-center justify-between
                p-4
                border-b border-[#C9A35C]/20
              "
            >
              <span
                className="
                  text-[13px]
                  font-semibold
                  uppercase
                  tracking-wider
                  text-[#C9A35C]
                "
              >
                Menu
              </span>

              <button
                onClick={() =>
                  setIsMobileMenuOpen(false)
                }
                className="
                  p-2
                  text-[#C9A35C]
                  hover:text-[#F1D18A]
                  transition-colors
                  -mr-2
                "
              >
                <X
                  className="w-5 h-5"
                  strokeWidth={1.5}
                />
              </button>
            </div>

            {/* MOBILE LINKS */}

            <div className="flex-1 overflow-y-auto py-4">

              <nav
                className="
                  flex flex-col
                  text-[13px]
                  font-semibold
                  tracking-wider
                  uppercase
                  text-[#C9A35C]
                "
              >
                <Link
                  href="/collection/new-in"
                  className="
                    px-6 py-4
                    border-b border-[#C9A35C]/10
                    flex items-center justify-between
                  "
                  onClick={() =>
                    setIsMobileMenuOpen(false)
                  }
                >
                  New In

                  <ChevronRight
                    className="
                      w-4 h-4
                      text-[#8F7444]
                    "
                  />
                </Link>

                {navigation?.categories?.map(
                  (cat: any) => (
                    <div
                      key={cat.slug}
                      className="
                        flex flex-col
                        border-b border-[#C9A35C]/10
                      "
                    >
                      <Link
                        href={`/category/${cat.slug}`}
                        className="
                          px-6 py-4
                          flex items-center
                          justify-between
                        "
                        onClick={() =>
                          setIsMobileMenuOpen(false)
                        }
                      >
                        {cat.title}

                        <ChevronRight
                          className="
                            w-4 h-4
                            text-[#8F7444]
                          "
                        />
                      </Link>

                      {cat.subcategories?.map(
                        (sub: any) => (
                          <Link
                            key={sub.slug}
                            href={`/category/${sub.slug}`}
                            className="
                              px-10 py-3
                              text-[11px]
                              text-[#A98B52]
                              flex items-center
                              justify-between
                            "
                            onClick={() =>
                              setIsMobileMenuOpen(false)
                            }
                          >
                            {sub.title}
                          </Link>
                        )
                      )}
                    </div>
                  )
                )}

                {navigation?.collections?.map(
                  (col: any) => (
                    <Link
                      key={col.slug}
                      href={`/collection/${col.slug}`}
                      className="
                        px-6 py-4
                        border-b border-[#C9A35C]/10
                        flex items-center
                        justify-between
                      "
                      onClick={() =>
                        setIsMobileMenuOpen(false)
                      }
                    >
                      {col.title}

                      <ChevronRight
                        className="
                          w-4 h-4
                          text-[#8F7444]
                        "
                      />
                    </Link>
                  )
                )}
              </nav>
            </div>

            {/* MOBILE ACCOUNT */}

            <div
              className="
                p-6
                bg-[#0C0C0C]
                border-t border-[#C9A35C]/20
                flex flex-col gap-4
              "
            >
              {user ? (
                <>
                  <div
                    className="
                      flex items-center gap-3
                      text-sm font-medium
                      text-[#C9A35C]
                      pb-2
                      border-b border-[#C9A35C]/20
                    "
                  >
                    <User
                      className="w-5 h-5"
                      strokeWidth={1.5}
                    />

                    <div className="flex flex-col">
                      <span>My Account</span>

                      <span
                        className="
                          text-[11px]
                          font-normal
                          text-[#8F7444]
                        "
                      >
                        {user.displayName || user.email}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">

                    {sanityUser?.isAdmin && (
                      <Link
                        href="/admin"
                        className="
                          text-left w-full
                          px-4 py-3
                          text-[13px]
                          font-semibold
                          text-[#E7C77E]
                          bg-[#15120c]
                          rounded-lg
                        "
                        onClick={() =>
                          setIsMobileMenuOpen(false)
                        }
                      >
                        Admin Portal
                      </Link>
                    )}

                    <Link
                      href="/profile"
                      className="
                        text-left w-full
                        px-4 py-3
                        text-[13px]
                        font-semibold
                        text-[#C9A35C]
                        bg-[#111]
                        rounded-lg
                      "
                      onClick={() =>
                        setIsMobileMenuOpen(false)
                      }
                    >
                      Profile
                    </Link>

                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        signOut(auth);
                      }}
                      className="
                        text-left w-full
                        px-4 py-3
                        text-[13px]
                        font-semibold
                        text-red-400
                        bg-[#111]
                        rounded-lg
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
                      w-full
                      px-4 py-3.5
                      text-[13px]
                      font-semibold
                      text-[#C9A35C]
                      border border-[#C9A35C]/40
                      bg-[#111]
                      rounded-lg
                      flex items-center
                      justify-center
                      gap-2
                    "
                  >
                    <User className="w-4 h-4" />
                    Log In
                  </button>

                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setAuthModalMode('signup');
                      setIsAuthModalOpen(true);
                    }}
                    className="
                      w-full
                      px-4 py-3.5
                      text-[13px]
                      font-semibold
                      text-black
                      bg-[#C9A35C]
                      hover:bg-[#E2C176]
                      transition-colors
                      rounded-lg
                      text-center
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
