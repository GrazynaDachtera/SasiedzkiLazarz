"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import "./ProjectsHomePage.scss";

const ArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="arrow-icon"
  >
    <path d="M7 7h10v10" />
  </svg>
);

export default function ProjectsHomePage() {
  const features = [
    {
      title: "Park-sad przy Hetmańskiej",
      description:
        "Stowarzyszenie Sąsiedzkie Łazarz, wspólnie z mieszkankami i mieszkańcami dzielnicy, podjęło inicjatywę utworzenia nowego parku w kwartale ulic: Hetmańska – Dmowskiego – Krauthofera – Górecka.",
      link: "/Projects/Project1",
    },
    {
      title: "Sąsiedzkie sprzątanie Łazarza",
      description:
        "Inicjatywa wspólnego sprzątania naszej dzielnicy powstała z pomysłu Michała Frankiewicza ze Stowarzyszenia Sąsiedzki Łazarz.",
      link: "/Projects/Project2",
    },
    {
      title: "Ognioodporny Łazarz",
      description:
        "Ognioodporny Łazarz to projekt, którego celem jest wyposażenie mieszkańców Osiedla Święty Łazarz w wiedzę oraz sprzęt do zapobiegania i reagowania na zagrożenia – pożary.",
      link: "/Projects/Project3",
    },
    {
      title: "Blajba na łazarskim fyrtlu",
      description:
        "Blajba na łazarskim fyrtlu to ekskluzywny serwis kulturalny – tworzony specjalnie dla mieszkańców Osiedla Święty Łazarz. Pojawia się w każdą środę z listą wydarzeń weekendowych w naszej okolicy, często też w mieście.",
      link: "/Projects/Project4",
    },
    {
      title: "Spotkania sąsiedzkie przy wspólnym stole",
      description:
        "Stowarzyszenie Sąsiedzki Łazarz zaprasza wszystkich mieszkańców dzielnicy Św. Łazarz do wspólnego spędzania czasu i rozmów w miłej atmosferze.",
      link: "/Projects/Project5",
    },
    {
      title: "Wiosenne nasadzenia drzew owocowych",
      description:
        "Z inicjatywy naszej członkini Pauliny Prusieckiej Stowarzyszenie Sąsiedzki Łazarz zrealizowało piękną, wiosenną akcję – nasadzenia drzew owocowych.",
      link: "/Projects/Project6",
    },
  ];

  return (
    <section className="ProjectsHomePage">
      <div className="projectsHomePage-top-wrapper">
        <div className="projectsHomePage-container">
          <div className="projectsHomePage-top">
            <div className="projectsHomePage-content">
              <h2 className="projectsHomePage-title">Projekty</h2>
              <p className="projectsHomePage-description">
                Poznaj inicjatywy, które tworzymy razem z mieszkankami i
                mieszkańcami Łazarza. Realizujemy projekty ożywiające okolicę -
                od zielonych nasadzeń i wspólnych przestrzeni, przez spacery i
                warsztaty, po działania integrujące sąsiadów. Zobacz, nad czym
                pracujemy i dołącz do nas!
              </p>

              {/* ✅ Link styled as a button */}
              <Link href="/Projects" className="projectsHomePage-button">
                Sprawdź
              </Link>
            </div>

            <div className="projectsHomePage-image-wrapper">
              <Image
                src="/ProjectsHomePage/person.png"
                alt="Portret osoby"
                width={652}
                height={336}
                className="projectsHomePage-image"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      <div className="projectsHomePage-grid-wrapper">
        <div className="projectsHomePage-container">
          <div className="projectsHomePage-grid">
            {features.map((feature, index) => (
              <div className="grid-item" key={index}>
                <div className="grid-item-icon-wrapper">
                  <ArrowIcon />
                </div>
                <div className="grid-item-text">
                  {feature.link ? (
                    <h3 className="grid-item-title">
                      <Link href={feature.link}>{feature.title}</Link>
                    </h3>
                  ) : (
                    <h3 className="grid-item-title">{feature.title}</h3>
                  )}
                  {feature.description && (
                    <p className="grid-item-description">
                      {feature.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
