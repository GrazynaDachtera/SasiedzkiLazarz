"use client";

import React, { useRef } from "react";
import Navbar from "@/components/Navbar/Navbar";
import AboutFoundationHeading from "@/components/AboutFoundation/AboutFoundationHeading/AboutFoundationHeading";
import Mission from "@/components/AboutFoundation/Mission/Mission";
import AreasOfActivity from "@/components/AboutFoundation/AreasOfActivity/AreasOfActivity";
import Members from "@/components/AboutFoundation/Members/Members";
import Footer from "@/components/Footer/Footer";
import Cookies from "@/components/Cookies/Cookies";
import "@/app/globals.css";
import { useSmoothScrollbar } from "@/components/hooks/useSmoothScrollbar";

export default function AboutUsPage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  useSmoothScrollbar(scrollRef);

  return (
    <>
      <div ref={scrollRef} style={{ overflow: "hidden" }}>
        <section className="kuziSport">
          <div className="main">
            <Navbar />
            <AboutFoundationHeading />
            <Mission />
            <AreasOfActivity />
            <Members />
          </div>
          <Footer />
        </section>
      </div>
      <Cookies />
    </>
  );
}
