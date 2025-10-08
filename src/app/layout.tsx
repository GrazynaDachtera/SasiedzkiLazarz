// src/app/layout.tsx
import type { Metadata } from "next";
import Script from "next/script";
import GAReporter from "./GAReporter";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  title: {
    default: "Sąsiedzki Łazarz",
    template: "%s | Sąsiedzki Łazarz",
  },
  description: "Łazarski portal sąsiedzki.",
  icons: { icon: "/icon.png" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body>
        {/* Loader i inicjalizacja GA4 */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = gtag;
                gtag('js', new Date());
                gtag('config', '${GA_ID}', {
                  anonymize_ip: true,
                  send_page_view: false
                });
              `}
            </Script>
          </>
        )}

        {/* Rejestrowanie odsłon przy zmianach tras w App Router */}
        <GAReporter />

        {children}
      </body>
    </html>
  );
}
