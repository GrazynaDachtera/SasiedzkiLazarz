"use client";

import React from "react";
import Navbar from "@/components/Navbar/Navbar";
import AbcHeadingPage from "@/components/Abc/AbcHeading/AbcHeading";
import School from "@/components/Abc/AbcList/School/School";
import Footer from "@/components/Footer/Footer";
import Cookies from "@/components/Cookies/Cookies";
import "@/app/globals.css";

export default function SchoolPage() {
  return (
    <>
      <div style={{ overflow: "hidden" }}>
        <section className="kuziSport">
          <div className="main">
            <Navbar />
            <AbcHeadingPage />
            <School />
          </div>
          <Footer />
        </section>
      </div>
      <Cookies />
    </>
  );
}
