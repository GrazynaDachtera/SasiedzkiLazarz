"use client";

import React from "react";
import Navbar from "@/components/Navbar/Navbar";
import AbcHeadingPage from "@/components/Abc/AbcHeading/AbcHeading";
import SportsCenter from "@/components/Abc/AbcList/SportsCenter/SportsCenter";
import Footer from "@/components/Footer/Footer";
import Cookies from "@/components/Cookies/Cookies";
import "@/app/globals.css";

export default function SportsCenterPage() {
  return (
    <>
      <div style={{ overflow: "hidden" }}>
        <section className="kuziSport">
          <div className="main">
            <Navbar />
            <AbcHeadingPage />
            <SportsCenter />
          </div>
          <Footer />
        </section>
      </div>
      <Cookies />
    </>
  );
}
