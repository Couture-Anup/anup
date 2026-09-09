import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';
import { ToastProvider } from '@/contexts/ToastContext';
import { CartSidebar } from '@/components/cart-sidebar';
import { client } from '@/lib/sanity';
import {
  ANNOUNCEMENT_BAR_QUERY,
  NAVIGATION_QUERY,
} from '@/lib/queries';

import FloatingSocialBar from '@/components/FloatingSocialBar';

export const metadata: Metadata = {
  title: "Premium Men's Ethnic Wear & Party Shirts Online – Anup Gupta",
  description:
    "Premium Men's Ethnic Wear & Party Shirts Online. Crafted to stand out with signature hand embroidery.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [announcements, navigationData] = await Promise.all([
    client.fetch(ANNOUNCEMENT_BAR_QUERY).catch(() => []),
    client.fetch(NAVIGATION_QUERY).catch(() => null),
  ]);

  return (
    <html lang="en">
      <body
        className="antialiased bg-white"
        suppressHydrationWarning
      >
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-412936166"
          strategy="afterInteractive"
        />

        <Script id="google-ads-tag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-412936166');
          `}
        </Script>

        <ToastProvider>
          <AuthProvider>
            <CartProvider>
              <div className="print:hidden contents">
                <Navbar
                  announcements={announcements}
                  navigation={navigationData}
                />
              </div>

              <main>{children}</main>

              <div className="print:hidden">
                <Footer />
              </div>

              <FloatingSocialBar />

              <CartSidebar />
            </CartProvider>
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
