"use client";

import React from "react";
import Navbar from "@/components/Navbar/Navbar";
import ProjectsHeading from "@/components/Projects/ProjectsHeading/ProjectsHeading";
import Projects from "@/components/Projects/Projects";
import Footer from "@/components/Footer/Footer";
import Cookies from "@/components/Cookies/Cookies";
import "@/app/globals.css";

export default function ProjectsPage() {
  return (
    <>
      <div style={{ overflow: "hidden" }}>
        <section className="kuziSport">
          <div className="main">
            <Navbar />
            <ProjectsHeading />
            <Projects />
          </div>
          <Footer />
        </section>
      </div>
      <Cookies />
    </>
  );
}
