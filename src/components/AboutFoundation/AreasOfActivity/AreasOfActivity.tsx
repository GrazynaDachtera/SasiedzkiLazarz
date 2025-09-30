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
};

const DEFAULT_ITEMS: ActivityItem[] = [
  {
    title: "Robimy Porzundek!",
    text: "chodzimy po Łazarzu wzdłuż i wszerz – nieporządek zgłaszamy komu trzeba i pilnujemy realizacji zadań porządkowych przez służby miejskie",
  },
  {
    title: "Integrujemy Łazarz i sąsiedztwo!",
    text: "organizujemy wydarzenia sąsiedzkie, od spacerów po pikniki i warsztaty dla mieszkańców, dbając o walor edukacyjny",
  },
  {
    title: "Zieleń i zwierzęta, natura!",
    text: "naszym priorytetem jest jeszcze więcej dobrze zaplanowanej zieleni na Łazarzu, miejsc przyjemnych dla ludzi i innych stworków – zawsze to uwzględniamy w naszych opiniach i projektach",
  },
  {
    title: "Inwestycje!",
    text: "wiemy jak dobrze planować, wydawać pieniądze i pilnować trwałości inwestycji. Staramy się o kompromis dla potrzeb pieszych, rowerzystów, kierowców, młodszych, starszych, chytrych i estetów",
  },
  {
    title: "Kultura i historia!",
    text: "co, gdzie, kiedy – uważnie śledzimy i nagłaśniamy informacje o wydarzeniach na Łazarzu, a także w całym Poznaniu: takich które właśnie się dzieją i takich które już się działy. Organizujemy spacery z historią Łazarza w tle",
  },
  { title: "… i wiele więcej!" },
];

export default function AreasOfActivity({
  title = "Obszary działalności",
  items = DEFAULT_ITEMS,
  image = {
    src: "/AboutFoundation/person.jpg",
    alt: "Portret osoby",
    width: 652,
    height: 336,
    priority: true,
  },
}: AreasOfActivityProps) {
  return (
    <section className="areas-top-wrapper">
      <div className="areas-container">
        <div className="areas-top">
          <div className="areas-content">
            <h2 className="areas-title">{title}</h2>

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

              <Link href="/AreasOfActivity" className="areas-cta">
                Poznaj wszystkie obszary naszej działalności
                <svg
                  className="areas-cta-icon"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d="M6 6 L18 18" />
                  <path d="M12 18 H18 V12" />
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
