"use client";

import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Header from "../components/Header/Header";
import Reviews from "../components/Reviews/Reviews";
import ProjectsHomePage from "../components/ProjectsHomePage/ProjectsHomePage";
import MapComponent from "@/components/MapComponent/MapComponent";
import Footer from "../components/Footer/Footer";
import Cookies from "../components/Cookies/Cookies";
import "../app/globals.css";

export default function Home() {
  return (
    <>
      <div style={{ overflow: "hidden" }}>
        <section className="kuziSport">
          <div className="main">
            <Navbar />
          </div>
          <Header />
          <Reviews />
          <ProjectsHomePage />
          <MapComponent />
          <Footer />
        </section>
      </div>
      <Cookies />
    </>
  );
}
