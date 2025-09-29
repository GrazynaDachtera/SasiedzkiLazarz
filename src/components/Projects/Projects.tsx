"use client";

import React from "react";
import Link from "next/link";
import "./Projects.scss";

const ArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="butt"
    strokeLinejoin="miter"
    className="projects-arrow-icon"
    aria-hidden="true"
  >
    <path d="M7 7 L17 17" />
    <path d="M17 7 L17 17 L7 17" />
  </svg>
);

export default function ProjectsPage() {
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
          <div className="projects-heading-grid" role="list">
            {features.map((feature) => (
              <Link
                href={feature.href}
                className="projects-card"
                key={feature.href}
                role="listitem"
                aria-label={feature.title}
              >
                <span className="projects-card-title">{feature.title}</span>
                <span className="projects-card-icon">
                  <ArrowIcon />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
