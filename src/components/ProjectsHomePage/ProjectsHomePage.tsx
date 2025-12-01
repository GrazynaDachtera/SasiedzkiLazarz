"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import "./ProjectsHomePage.scss";

const ProjectsHomePage: React.FC = () => {
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
    </section>
  );
};

export default ProjectsHomePage;
