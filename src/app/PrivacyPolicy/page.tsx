"use client";

import React from "react";
import Navbar from "@/components/Navbar/Navbar";
import PrivacyPolicy from "@/components/PrivacyPolicy/PrivacyPolicy";
import Footer from "@/components/Footer/Footer";
import Cookies from "@/components/Cookies/Cookies";
import "@/app/globals.css";

export default function PrivacyPolicyPage() {
  return (
    <>
      <div style={{ overflow: "hidden" }}>
        <section className="kuziSport">
          <div className="main">
            <Navbar />
            <PrivacyPolicy />
          </div>
          <Footer />
        </section>
      </div>
      <Cookies />
    </>
  );
}
