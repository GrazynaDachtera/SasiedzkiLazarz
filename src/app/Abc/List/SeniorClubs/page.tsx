"use client";

import React from "react";
import Navbar from "@/components/Navbar/Navbar";
import AbcHeadingPage from "@/components/Abc/AbcHeading/AbcHeading";
import SeniorClubs from "@/components/Abc/AbcList/SeniorClubs/SeniorClubs";
import Footer from "@/components/Footer/Footer";
import Cookies from "@/components/Cookies/Cookies";
import "@/app/globals.css";

export default function SeniorClubsPage() {
  return (
    <>
      <div style={{ overflow: "hidden" }}>
        <section className="kuziSport">
          <div className="main">
            <Navbar />
            <AbcHeadingPage />
            <SeniorClubs />
          </div>
          <Footer />
        </section>
      </div>
      <Cookies />
    </>
  );
}
