"use client";

import React from "react";
import Navbar from "@/components/Navbar/Navbar";
import ProjectsHeading from "@/components/Projects/ProjectsHeading/ProjectsHeading";
import Project8 from "@/components/Projects/Project8/Project8";
import Footer from "@/components/Footer/Footer";
import Cookies from "@/components/Cookies/Cookies";
import "@/app/globals.css";

export default function Project8Subpage() {
  return (
    <>
      <div style={{ overflow: "hidden" }}>
        <section className="kuziSport">
          <div className="main">
            <Navbar />
            <ProjectsHeading />
            <Project8 />
          </div>
          <Footer />
        </section>
      </div>
      <Cookies />
    </>
  );
}
