"use client";

import React from "react";
import Navbar from "@/components/Navbar/Navbar";
import AbcHeadingPage from "@/components/Abc/AbcHeading/AbcHeading";
import Parks from "@/components/Abc/AbcList/Parks/Parks";
import Footer from "@/components/Footer/Footer";
import Cookies from "@/components/Cookies/Cookies";
import "@/app/globals.css";

export default function ParksPage() {
  return (
    <>
      <div style={{ overflow: "hidden" }}>
        <section className="kuziSport">
          <div className="main">
            <Navbar />
            <AbcHeadingPage />
            <Parks />
          </div>
          <Footer />
        </section>
      </div>
      <Cookies />
    </>
  );
}
