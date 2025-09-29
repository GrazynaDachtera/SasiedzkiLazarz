"use client";

import React from "react";
import "./Libraries.scss";

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
    className="libraries-arrow-icon"
  >
    <path d="M7 7 L17 17" />
    <path d="M17 7 L17 17 L7 17" />
  </svg>
);

type Item = { title: string; contact: string; address: string };

export default function MuseumsPage() {
  const items: Item[] = [
    {
      title: "Biblioteka Raczyńskich Filia 4",
      address: "ul. Lodowa 4, 60-226 Poznań",
      contact: "https://bracz.edu.pl/filia-4-dla-doroslych/",
    },
    {
      title: "Biblioteka Raczyńskich Filia 12 i 46",
      address: "ul. Arciszewskiego 27, 60-271 Poznań",
      contact: "https://www.facebook.com/profile.php?id=61551499283350",
    },
    {
      title: "Biblioteka Raczyńskich Filia 22",
      address: "ul. Dmowskiego 37, 60-222 Poznań",
      contact: "https://bracz.edu.pl/filia-22-dla-dzieci/",
    },
    {
      title: "Biblioteka Raczyńskich Filia 23",
      address: "ul. Hetmańska 41, 60-251 Poznań",
      contact: "https://bracz.edu.pl/filia-23-dla-dzieci/",
    },
  ];

  const [open, setOpen] = React.useState<Set<number>>(new Set());
  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });

  const renderContact = (value: string) => {
    if (!value) return <span>brak strony</span>;
    const isEmail = value.includes("@") && !value.startsWith("http");
    return isEmail ? (
      <a href={`mailto:${value}`}>{value}</a>
    ) : (
      <a href={value} target="_blank" rel="noopener noreferrer">
        {value}
      </a>
    );
  };

  return (
    <section className="Libraries">
      <div className="libraries-top-wrapper">
        <div className="libraries-container">
          <div className="libraries-top">
            <div className="libraries-content">
              <h2 className="libraries-title">Biblioteki</h2>
              <p className="libraries-description">
                Tu znajdziesz listę bibliotek na Łazarzu. Kliknij w wybraną
                placówkę, by rozwinąć stronę i adres.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="libraries-grid-wrapper">
        <div className="libraries-container">
          <div className="libraries-grid">
            {items.map((s, index) => {
              const expanded = open.has(index);
              const detailsId = `libraries-details-${index}`;
              return (
                <div className="libraries-grid-block" key={index}>
                  <button
                    type="button"
                    className="libraries-grid-item"
                    aria-expanded={expanded}
                    aria-controls={detailsId}
                    onClick={() => toggle(index)}
                  >
                    <span className="libraries-grid-item-icon-wrapper">
                      <ArrowIcon />
                    </span>
                    <span className="libraries-grid-item-text">
                      <h3 className="libraries-grid-item-title">{s.title}</h3>
                    </span>
                  </button>

                  <ul
                    id={detailsId}
                    className={`libraries-details ${expanded ? "open" : ""}`}
                  >
                    <li>{renderContact(s.contact)}</li>
                    <li>{s.address}</li>
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
