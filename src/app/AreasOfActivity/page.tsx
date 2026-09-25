"use client";

import React from "react";
import Navbar from "@/components/Navbar/Navbar";
import AreasExtendedHeading from "@/components/AboutFoundation/AreasOfActivity/AreasExtended/AreasExtendedHeading/AreasExtendedHeading";
import AreasExtended from "@/components/AboutFoundation/AreasOfActivity/AreasExtended/AreasExtended";
import MapComponent from "@/components/MapComponent/MapComponent";
import Footer from "@/components/Footer/Footer";
import Cookies from "@/components/Cookies/Cookies";
import "@/app/globals.css";

export default function AreasOfActivity() {
  return (
    <>
      <div style={{ overflow: "hidden" }}>
        <section className="kuziSport">
          <div className="main">
            <Navbar />
            <AreasExtendedHeading />
            <AreasExtended />
            <MapComponent />
            <Footer />
          </div>
        </section>
      </div>
      <Cookies />
    </>
  );
}
