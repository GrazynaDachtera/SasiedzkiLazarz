"use client";

import React from "react";
import Navbar from "@/components/Navbar/Navbar";
import Rodo from "@/components/Rodo/Rodo";
import Footer from "@/components/Footer/Footer";
import Cookies from "@/components/Cookies/Cookies";
import "@/app/globals.css";

export default function RodoPage() {
  return (
    <>
      <div style={{ overflow: "hidden" }}>
        <section className="kuziSport">
          <div className="main">
            <Navbar />
            <Rodo />
          </div>
          <Footer />
        </section>
      </div>
      <Cookies />
    </>
  );
}
