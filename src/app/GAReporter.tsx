// src/app/GAReporter.tsx
"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const isProd = process.env.NODE_ENV === "production";

export default function GAReporter() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (
      !GA_ID ||
      typeof window === "undefined" ||
      typeof window.gtag !== "function"
    )
      return;

    const url = pathname + (searchParams?.toString() ? `?${searchParams}` : "");

    // Ręczny page_view (pierwsze renderowanie + kolejne nawigacje)
    window.gtag("event", "page_view", {
      page_path: url,
      page_location: window.location.href,
      page_title: document.title,
      ...(isProd ? {} : { debug_mode: true }),
    });
  }, [pathname, searchParams]);

  return null;
}
