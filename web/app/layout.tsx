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
import TextOverride from '@/components/TextOverride';

export const metadata: Metadata = {
  title: "Premium Men's Ethnic Wear & Party Shirts Online – Anup Gupta",

  description:
    "Premium Men's Ethnic Wear & Party Shirts Online. Crafted to stand out with signature hand embroidery.",

  icons: {
    icon: [
      {
        url: '/logo/icon.png',
        type: 'image/png',
      },
    ],

    shortcut: '/logo/icon.png',
    apple: '/logo/icon.png',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [announcements, navigationData] = await Promise.all([
    client
      .fetch(ANNOUNCEMENT_BAR_QUERY)
      .catch(() => []),

    client
      .fetch(NAVIGATION_QUERY)
      .catch(() => null),
  ]);

  return (
    <html lang="en">
      <head>
        {/* GOOGLE TAG MANAGER */}
        <Script
          id="google-tag-manager"
          strategy="beforeInteractive"
        >
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

              j.src=
                'https://www.googletagmanager.com/gtm.js?id='
                +i+dl;

              f.parentNode.insertBefore(j,f);

            })(window,document,'script','dataLayer','GTM-5MHQ73ZH');
          `}
        </Script>
        {/* END GOOGLE TAG MANAGER */}
      </head>

      <body
        className="antialiased bg-white"
        suppressHydrationWarning
      >
        {/* GOOGLE TAG MANAGER NOSCRIPT */}
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
        {/* END GOOGLE TAG MANAGER NOSCRIPT */}

        <ToastProvider>
          <AuthProvider>
            <CartProvider>

              {/* NAVBAR */}
              <div className="print:hidden contents">
                <Navbar
                  announcements={announcements}
                  navigation={navigationData}
                />
              </div>

              {/* MAIN WEBSITE */}
              <main>
                {children}
              </main>

              {/* FOOTER */}
              <div className="print:hidden">
                <Footer />
              </div>

              {/* TEXT OVERRIDE */}
              <TextOverride />

              {/* FLOATING SOCIAL BUTTONS */}
              <FloatingSocialBar />

              {/* CART SIDEBAR */}
              <CartSidebar />

            </CartProvider>
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
