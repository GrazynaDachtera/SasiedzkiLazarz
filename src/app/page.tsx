"use client";

import React, { useRef } from "react";
import Navbar from "../components/Navbar/Navbar";
import Header from "../components/Header/Header";
import Reviews from "../components/Reviews/Reviews";
import ProjectsHomePage from "../components/ProjectsHomePage/ProjectsHomePage";
import News from "../components/News/News";
import MapComponent from "@/components/MapComponent/MapComponent";
import Footer from "../components/Footer/Footer";
import Cookies from "../components/Cookies/Cookies";
import "../app/globals.css";
import { Poppins } from "next/font/google";
import { useSmoothScrollbar } from "@/components/hooks/useSmoothScrollbar";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null);
  useSmoothScrollbar(scrollRef);

  return (
    <>
      <div ref={scrollRef} style={{ overflow: "hidden" }}>
        <section className={`kuziSport ${poppins.className}`}>
          <div className="main">
            <Navbar />
          </div>
          <Header />
          <Reviews />
          <ProjectsHomePage />
          <News />
          <MapComponent />
          <Footer />
        </section>
      </div>
      <Cookies />
    </>
  );
}
