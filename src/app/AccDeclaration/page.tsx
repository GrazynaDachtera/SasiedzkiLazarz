"use client";

import React from "react";
import Navbar from "@/components/Navbar/Navbar";
import AccDeclaration from "@/components/AccDeclaration/AccDeclaration";
import Footer from "@/components/Footer/Footer";
import Cookies from "@/components/Cookies/Cookies";
import "@/app/globals.css";

export default function AccDeclarationPage() {
  return (
    <>
      <div style={{ overflow: "hidden" }}>
        <section className="kuziSport">
          <div className="main">
            <Navbar />
            <AccDeclaration />
          </div>
          <Footer />
        </section>
      </div>
      <Cookies />
    </>
  );
}
