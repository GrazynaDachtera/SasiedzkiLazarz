"use client";

import Image from "next/image";
import React from "react";
import "./Mission.scss";

type Img = {
  src: string;
  alt: string;
  priority?: boolean;
};

type MissionProps = {
  title?: string;
  missionImg?: Img;
  visionImg?: Img;
};

const DEFAULT_MISSION_IMG: Img = {
  src: "/AboutFoundation/Mission.png",
  alt: "Misja — grafika",
  priority: true,
};

const DEFAULT_VISION_IMG: Img = {
  src: "/AboutFoundation/Vision.png",
  alt: "Wizja — grafika",
  priority: false,
};

export default function Mission({
  title = "Misja i wizja",
  missionImg = DEFAULT_MISSION_IMG,
  visionImg = DEFAULT_VISION_IMG,
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
          <div className="mv-card">
            <Image
              src={missionImg.src}
              alt={missionImg.alt}
              fill
              priority={missionImg.priority}
              quality={90}
              sizes="(max-width: 768px) 92vw, (max-width: 1200px) 44vw, 560px"
              className="mv-image"
            />
          </div>
          <div className="mv-card">
            <Image
              src={visionImg.src}
              alt={visionImg.alt}
              fill
              priority={visionImg.priority}
              quality={90}
              sizes="(max-width: 768px) 92vw, (max-width: 1200px) 44vw, 560px"
              className="mv-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
