"use client";

import React from "react";
import Link from "next/link";
import "./Projects.scss";

const ArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="butt"
    strokeLinejoin="miter"
    className="projects-arrow-icon"
  >
    <path d="M7 7 L17 17" />
    <path d="M17 7 L17 17 L7 17" />
  </svg>
);

export default function AbcPage() {
  const features = [
    { title: "Park-sad przy Hetmańskiej", href: "/Projects/Project1" },
    { title: "Sąsiedzkie sprzątanie Łazarza", href: "/Projects/Project2" },
    { title: "Ognioodporny Łazarz", href: "/Projects/Project3" },
    { title: "Blajba na łazarskim fyrtlu", href: "/Projects/Project4" },
    {
      title: "Spotkania sąsiedzkie przy wspólnym stole",
      href: "/Projects/Project5",
    },
    {
      title: "Wiosenne nasadzenia drzew owocowych",
      href: "/Projects/Project6",
    },
  ];

  return (
    <section className="projects-heading">
      <div className="projects-heading-grid-wrapper">
        <div className="projects-heading-container">
          <div className="projects-heading-grid">
            {features.map((feature) => (
              <Link
                href={feature.href}
                className="projects-grid-item"
                key={feature.href}
              >
                <span className="projects-grid-item-icon-wrapper">
                  <ArrowIcon />
                </span>
                <span className="projects-grid-item-text">
                  <h3 className="projects-grid-item-title">{feature.title}</h3>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
