"use client";

import React from "react";
import Navbar from "@/components/Navbar/Navbar";
import DownloadMaterials from "@/components/DownloadMaterials/DownloadMaterials";
import Footer from "@/components/Footer/Footer";
import Cookies from "@/components/Cookies/Cookies";
import "@/app/globals.css";

export default function DownloadMaterialsPage() {
  return (
    <>
      <div style={{ overflow: "hidden" }}>
        <section className="kuziSport">
          <div className="main">
            <Navbar />
            <DownloadMaterials />
          </div>
          <Footer />
        </section>
      </div>
      <Cookies />
    </>
  );
}
