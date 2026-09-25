"use client";

import React from "react";
import Navbar from "@/components/Navbar/Navbar";
import AbcHeadingPage from "@/components/Abc/AbcHeading/AbcHeading";
import Kindergarten from "@/components/Abc/AbcList/Kindergarten/Kingergarten";
import Footer from "@/components/Footer/Footer";
import Cookies from "@/components/Cookies/Cookies";
import "@/app/globals.css";

export default function KindergartenPage() {
  return (
    <>
      <div style={{ overflow: "hidden" }}>
        <section className="kuziSport">
          <div className="main">
            <Navbar />
            <AbcHeadingPage />
            <Kindergarten />
          </div>
          <Footer />
        </section>
      </div>
      <Cookies />
    </>
  );
}
