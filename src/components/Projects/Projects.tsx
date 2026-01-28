"use client";

import React from "react";
import Image from "next/image";
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
    strokeWidth="2.25"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="projects-arrow-icon"
    aria-hidden="true"
    focusable="false"
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
    { title: "Spacery z historią w tle", href: "/Projects/Project7" },
    { title: "Sąsiedzkie spacery ze sprzątaniem", href: "/Projects/Project8" },
    {
      title:
        "Wystawa witrynowa „Dawny Łazarz” z okazji 125. rocznicy połączenia z Poznaniem",
      href: "/Projects/Project9",
    },
    { title: "Rudery na Łazarzu", href: "/Projects/Project10" },
  ];

  return (
    <section className="Projects" aria-labelledby="projects-hero-title">
      {/* HERO */}
      <div className="projects-hero">
        <div className="projects-container">
          <div className="projects-hero-grid">
            <div className="projects-hero-media">
              <Image
                src="/Projects/Projects.jpeg" /* replace with your Projects hero image when ready */
                alt="Zdjęcie prezentujące działania projektowe mieszkańców"
                width={652}
                height={336}
                className="projects-hero-img"
                priority
                sizes="(max-width:700px) 92vw, (max-width:1200px) 50vw, 560px"
              />
            </div>

            <div className="projects-hero-copy">
              <p className="projects-eyebrow">Nasze działania</p>
              <h1 id="projects-hero-title" className="projects-title">
                Projekty
              </h1>
              <p className="projects-desc">
                Przegląd inicjatyw realizowanych przez społeczność – od akcji
                sąsiedzkich, przez zielone nasadzenia, po wydarzenia integrujące
                mieszkańców. Wybierz projekt, aby poznać szczegóły.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* LIST */}
      <div className="projects-container">
        <div className="projects-header">
          <h2>Projekty</h2>
          <p>Wybierz interesującą Cię sekcję</p>
        </div>

        <div className="projects-grid" role="list">
          {features.map((feature) => (
            <Link
              href={feature.href}
              className="projects-card"
              key={feature.href}
              role="listitem"
              aria-label={feature.title}
            >
              <span className="projects-card-title">{feature.title}</span>
              <span className="projects-card-icon" aria-hidden>
                <ArrowIcon />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
