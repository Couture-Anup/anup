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
      <head>
        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="beforeInteractive">
          {`
            (function(w,d,s,l,i){
              w[l]=w[l]||[];
              w[l].push({
                'gtm.start': new Date().getTime(),
                event:'gtm.js'
              });
              var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),
                  dl=l!='dataLayer'?'&l='+l:'';
              j.async=true;
              j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-5MHQ73ZH');
          `}
        </Script>
        {/* End Google Tag Manager */}
      </head>

      <body
        className="antialiased bg-white"
        suppressHydrationWarning
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5MHQ73ZH"
            height="0"
            width="0"
            style={{
              display: 'none',
              visibility: 'hidden',
            }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}

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
