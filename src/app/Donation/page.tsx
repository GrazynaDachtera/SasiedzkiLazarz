"use client";

import React, { useRef } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Donation from "@/components/Donation/Donation";
import Footer from "@/components/Footer/Footer";
import Cookies from "@/components/Cookies/Cookies";
import "@/app/globals.css";
import { useSmoothScrollbar } from "@/components/hooks/useSmoothScrollbar";

export default function HelpPage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  useSmoothScrollbar(scrollRef);

  return (
    <>
      <div ref={scrollRef} style={{ overflow: "hidden" }}>
        <section className="kuziSport">
          <div className="main">
            <Navbar />
            <Donation />
          </div>
          <Footer />
        </section>
      </div>
      <Cookies />
    </>
  );
}
