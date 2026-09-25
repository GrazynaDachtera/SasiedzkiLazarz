// src/app/layout.tsx
import type { Metadata } from "next";
import Script from "next/script";
import { Poppins } from "next/font/google";
import { Suspense } from "react";
import GAReporter from "./GAReporter";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-poppins",
  // Fonts are small next to the hero image; don't let 10 font preloads compete with it.
  preload: false,
});

export const metadata: Metadata = {
  title: { default: "Sąsiedzki Łazarz", template: "%s | Sąsiedzki Łazarz" },
  description: "Łazarski portal sąsiedzki.",
  icons: { icon: "/icon.png" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl" className={poppins.variable}>
      <body>
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

        {/* wrap hooks-based client component in Suspense */}
        <Suspense fallback={null}>
          <GAReporter />
        </Suspense>

        {children}
      </body>
    </html>
  );
}
