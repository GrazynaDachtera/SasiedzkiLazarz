"use client";

import React from "react";
import Navbar from "@/components/Navbar/Navbar";
import DonationHeadingPage from "@/components/Donation/DonationHeading/DonationHeading";
import Donation from "@/components/Donation/Donation";
import Footer from "@/components/Footer/Footer";
import Cookies from "@/components/Cookies/Cookies";
import "@/app/globals.css";

export default function HelpPage() {
  return (
    <>
      <div style={{ overflow: "hidden" }}>
        <section className="kuziSport">
          <div className="main">
            <Navbar />
            <DonationHeadingPage />
            <Donation />
          </div>
          <Footer />
        </section>
      </div>
      <Cookies />
    </>
  );
}
