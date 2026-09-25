"use client";

import React from "react";
import Navbar from "@/components/Navbar/Navbar";
import ProjectsHeading from "@/components/Projects/ProjectsHeading/ProjectsHeading";
import Project9 from "@/components/Projects/Project9/Project9";
import Footer from "@/components/Footer/Footer";
import Cookies from "@/components/Cookies/Cookies";
import "@/app/globals.css";

export default function Project9Subpage() {
  return (
    <>
      <div style={{ overflow: "hidden" }}>
        <section className="kuziSport">
          <div className="main">
            <Navbar />
            <ProjectsHeading />
            <Project9 />
          </div>
          <Footer />
        </section>
      </div>
      <Cookies />
    </>
  );
}
