"use client";

import React from "react";
import Navbar from "@/components/Navbar/Navbar";
import NewsPageHeading from "@/components/NewsPage/NewsPageHeading/NewsPageHeading";
import NewsPage from "@/components/NewsPage/NewsPage";
import Footer from "@/components/Footer/Footer";
import Cookies from "@/components/Cookies/Cookies";
import "@/app/globals.css";

export default function NewsSubpage() {
  return (
    <>
      <div style={{ overflow: "hidden" }}>
        <section className="kuziSport">
          <div className="main">
            <Navbar />
            <NewsPageHeading />
            <NewsPage />
          </div>
          <Footer />
        </section>
      </div>
      <Cookies />
    </>
  );
}
