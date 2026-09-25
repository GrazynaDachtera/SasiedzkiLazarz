"use client";

import React from "react";
import Navbar from "@/components/Navbar/Navbar";
import ContactComponent from "@/components/ContactComponent/ContactComponent";
import MapComponent from "@/components/MapComponent/MapComponent";
import Footer from "@/components/Footer/Footer";
import Cookies from "@/components/Cookies/Cookies";
import "@/app/globals.css";

export default function Contact() {
  return (
    <>
      <div style={{ overflow: "hidden" }}>
        <section className="kuziSport">
          <div className="main">
            <Navbar />
            <ContactComponent />
          </div>
          <MapComponent />
          <Footer />
        </section>
      </div>
      <Cookies />
    </>
  );
}
