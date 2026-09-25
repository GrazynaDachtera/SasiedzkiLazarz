"use client";

import React from "react";
import Navbar from "@/components/Navbar/Navbar";
import Regulations from "@/components/Regulations/Regulations";
import Footer from "@/components/Footer/Footer";
import Cookies from "@/components/Cookies/Cookies";
import "@/app/globals.css";

export default function RegulationsPage() {
  return (
    <>
      <div style={{ overflow: "hidden" }}>
        <section className="kuziSport">
          <div className="main">
            <Navbar />
            <Regulations />
          </div>
          <Footer />
        </section>
      </div>
      <Cookies />
    </>
  );
}
