"use client";

import React from "react";
import Navbar from "@/components/Navbar/Navbar";
import AboutFoundationHeading from "@/components/AboutFoundation/AboutFoundationHeading/AboutFoundationHeading";
import Mission from "@/components/AboutFoundation/Mission/Mission";
import AreasOfActivity from "@/components/AboutFoundation/AreasOfActivity/AreasOfActivity";
import Members from "@/components/AboutFoundation/Members/Members";
import Footer from "@/components/Footer/Footer";
import Cookies from "@/components/Cookies/Cookies";
import "@/app/globals.css";

export default function AboutUsPage() {
  return (
    <>
      <div style={{ overflow: "hidden" }}>
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
