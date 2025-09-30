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
    {
      title: "Spacery z historią w tle",
      description:
        "„Spacery z historią w tle” to projekt, dzięki któremu chcemy pokazać, jak niezwykła i pełna tajemnic jest nasza dzielnica – Święty Łazarz. Członkowie i członkinie stowarzyszenia – Joanna Kamińska, Paulina Prusiecka i Roman Modrzyński – zapraszają mieszkańców do wspólnych odkryć, podczas których historia splata się z teraźniejszością, a codzienne miejsca nabierają nowego znaczenia.",
      link: "/Projects/Project7",
    },
    {
      title: "Sąsiedzkie spacery ze sprzątaniem",
      description:
        "W ramach inicjatyw zorganizowaliśmy dwa sąsiedzkie spacery po terenach, które chcielibyśmy widzieć w przyszłości jako park-sad. Pierwszy spacer poprowadzili Bartosz Kolenda i Łukasz Maćkowiak, dzieląc się swoją wiedzą botaniczno-przyrodniczą. Wspólnie odwiedziliśmy miejsce planowanego parku, a przy okazji zadbaliśmy o okolicę – zbierając zalegające śmieci. ",
      link: "/Projects/Project8",
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
              <Link href="/Projects" className="projectsHomePage-button">
                Sprawdź
              </Link>
            </div>

            <div className="projectsHomePage-image-wrapper">
              <Image
                src="/ProjectsHomePage/person.jpg"
                alt="Portret osoby"
                width={652}
                height={336}
                sizes="(max-width: 768px) 85vw, 560px"
                className="projectsHomePage-image"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      <div className="projectsHomePage-grid-wrapper">
        <div className="projectsHomePage-container">
          <ul className="projectsHomePage-grid" role="list">
            {features.map((f, i) => (
              <li key={i} className="feature-li">
                <article className="feature-card">
                  <Link
                    href={f.link}
                    className="feature-link"
                    aria-label={f.title}
                  >
                    <span className="feature-icon" aria-hidden="true">
                      <ArrowIcon />
                    </span>
                    <span className="feature-text">
                      <h3 className="feature-title">{f.title}</h3>
                      <p className="feature-desc">{f.description}</p>
                      <span className="feature-cta">
                        Zobacz projekt
                        <svg
                          viewBox="0 0 24 24"
                          className="chevron"
                          aria-hidden="true"
                        >
                          <path
                            d="M9 6l6 6-6 6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                        </svg>
                      </span>
                    </span>
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
