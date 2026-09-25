"use client";

import React from "react";
import Navbar from "@/components/Navbar/Navbar";
import AbcHeadingPage from "@/components/Abc/AbcHeading/AbcHeading";
import AboutAbc from "@/components/Abc/AboutAbc/AboutAbc";
import Footer from "@/components/Footer/Footer";
import Cookies from "@/components/Cookies/Cookies";
import "@/app/globals.css";

export default function AbcPage() {
  return (
    <>
      <div style={{ overflow: "hidden" }}>
        <section className="kuziSport">
          <div className="main">
            <Navbar />
            <AbcHeadingPage />
            <AboutAbc />
          </div>
          <Footer />
        </section>
      </div>
      <Cookies />
    </>
  );
}
