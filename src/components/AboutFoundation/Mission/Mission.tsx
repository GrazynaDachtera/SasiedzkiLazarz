// Mission.tsx
"use client";

import React from "react";
import "./Mission.scss";

type MissionProps = {
  title?: string;
  missionTitle?: string;
  missionText?: string;
  visionTitle?: string;
  visionText?: string;
};

const DEFAULT_MISSION_TEXT =
  "Działamy na rzecz mieszkańców Osiedla Św. Łazarz, organizując wydarzenia, spotkania oraz działania edukacyjne i kanały komunikacyjne, aby zachęcać do aktywnej partycypacji w życiu społecznym. Wierzymy, że każdy ma prawo żyć w bezpiecznym, nowoczesnym i przyjaznym miejscu, dlatego łączymy nasze siły i doświadczenia jako społeczność mieszkająca tutaj, by skutecznie reprezentować potrzeby naszych sąsiadów.";

const DEFAULT_VISION_TEXT =
  "Święty Łazarz jako dzielnica przyjazna do życia – włączająca, sprzyjająca aktywnościom mieszkańców, motywująca do budowania relacji i kulturowej różnorodności, z wysokim poziomem integracji sąsiedzkiej oraz realnym wpływem na wspólne decyzje.";

export default function Mission({
  title = "Misja i wizja",
  missionTitle = "Misja",
  missionText = DEFAULT_MISSION_TEXT,
  visionTitle = "Wizja",
  visionText = DEFAULT_VISION_TEXT,
}: MissionProps) {
  return (
    <section
      className="mission-top-wrapper"
      aria-labelledby="mission-vision-heading"
    >
      <h2 id="mission-vision-heading" className="sr-only">
        {title}
      </h2>

      <div className="mission-container">
        <div className="mv-grid">
          <article className="mv-card mv-card--left">
            <header className="mv-header">
              <h3 className="mv-title">{missionTitle}</h3>
            </header>
            <p className="mv-text">{missionText}</p>
          </article>

          <article className="mv-card mv-card--right">
            <header className="mv-header">
              <h3 className="mv-title">{visionTitle}</h3>
            </header>
            <p className="mv-text">{visionText}</p>
          </article>
        </div>
      </div>
    </section>
  );
}
