// AreasOfActivity.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import "./AreasOfActivity.scss";

type Img = {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
};

type ActivityItem = {
  title: string;
  text?: string;
};

type AreasOfActivityProps = {
  title?: string;
  items?: ActivityItem[];
  image?: Img;
  lead?: string;
};

const DEFAULT_ITEMS: ActivityItem[] = [
  {
    title: "Robimy Porzundek!",
    text: "Patrolujemy Łazarz. Zgłaszamy bałagan, pilnujemy realizacji i chwalimy dobre praktyki służb miejskich.",
  },
  {
    title: "Integrujemy Łazarz i sąsiedztwo",
    text: "Spacery, pikniki i warsztaty. Łączymy sąsiadów, a dobre pomysły przekuwamy w konkretne działania.",
  },
  {
    title: "Zieleń, zwierzęta, natura",
    text: "Walczymy o mądrą zieleń: cień na ulicach, drzewa przy szkołach, przyjazne skwery i miski z wodą latem. Projektujemy z myślą o ludziach i futrzastych sąsiadach.",
  },
  {
    title: "Inwestycje z sensem",
    text: "Pilnujemy planów i budżetów. Szukamy balansu między pieszymi, rowerami, komunikacją i kierowcami. Stawiamy na trwałość i estetykę.",
  },
  {
    title: "Kultura i historia",
    text: "Kalendarz wydarzeń, mikro-wycieczki i spacery z historią Łazarza. Opowiadamy o tym, co było i co dopiero będzie.",
  },
  {
    title: "…i dużo więcej",
    text: "Akcje sąsiedzkie, konsultacje, porady. Jeśli coś poprawia codzienność na Łazarzu - wchodzimy w to.",
  },
];

export default function AreasOfActivity({
  title = "Czym się zajmujemy",
  items = DEFAULT_ITEMS,
  image = {
    src: "/AboutFoundation/AreasOfActivity.jpeg",
    alt: "Spacer po Łazarzu – sąsiadka z psem na łące",
    width: 652,
    height: 336,
    priority: true,
  },
  lead = "Na co dzień robimy małe i duże rzeczy, które realnie poprawiają życie na Łazarzu. Oto kilka naszych kierunków:",
}: AreasOfActivityProps) {
  return (
    <section className="areas-top-wrapper">
      <div className="areas-container">
        <div className="areas-top">
          <div className="areas-content">
            <h2 className="areas-title">{title}</h2>
            <p className="areas-lead">{lead}</p>

            <div className="areas-description">
              <ul className="areas-list" role="list">
                {items.map((item, idx) => (
                  <li key={idx} className="areas-item">
                    <h3 className="areas-item-title">{item.title}</h3>
                    {item.text ? (
                      <div className="areas-item-text">{item.text}</div>
                    ) : null}
                  </li>
                ))}
              </ul>

              <Link
                href="/AreasOfActivity"
                className="areas-btn"
                aria-label="Zobacz pełną listę działań"
              >
                <span>Zobacz pełną listę działań</span>
                <svg
                  className="areas-btn-icon"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d="M5 12 H19" />
                  <path d="M13 6 L19 12 L13 18" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="areas-image-wrapper">
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              className="areas-image"
              priority={image.priority}
              sizes="(max-width:700px) 90vw, (max-width:1200px) 50vw, 33vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
