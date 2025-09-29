"use client";

import React from "react";
import "./SportsCenter.scss";

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
    className="sportscenter-arrow-icon"
  >
    <path d="M7 7 L17 17" />
    <path d="M17 7 L17 17 L7 17" />
  </svg>
);

export default function SportsCenterPage() {
  const items = [
    {
      title: "Poznański Klub Brydżowy",
      contact: "https://brydz.pl/",
      address: "ul. Grunwaldzka 41b/1, 61-001 Poznań",
    },
    {
      title: "Fabryka Formy Korty Poznań",
      contact: "https://fabryka-formy.pl/kluby-fitness/poznan-korty-arena/",
      address: "ul. Reymonta 35, 60-791 Poznań",
    },
    {
      title: "Pływalnia letnia POSiR – Park Kasprowicza",
      contact: "https://posir.poznan.pl/obiekty/kasprowicza/plywalnia-letnia",
      address: "ul. Jarochowskiego 5/5a, 60-235 Poznań",
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
    if (!value) return <span>brak e-maila</span>;
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
    <section className="SportsCenter">
      <div className="sportscenter-top-wrapper">
        <div className="sportscenter-container">
          <div className="sportscenter-top">
            <div className="sportscenter-content">
              <h2 className="sportscenter-title">Ośrodki kultury i sportu</h2>
              <p className="sportscenter-description">
                Tu znajdziesz pełną listę ośrodków kultury i sportu działających
                na obszarze Łazarza. Kliknij w wybraną placówkę, by rozwinąć
                kontakt i adres.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="sportscenter-grid-wrapper">
        <div className="sportscenter-container">
          <div className="sportscenter-grid">
            {items.map((s, index) => {
              const expanded = open.has(index);
              const detailsId = `sportscenter-details-${index}`;
              return (
                <div className="sportscenter-grid-block" key={index}>
                  <button
                    type="button"
                    className="sportscenter-grid-item"
                    aria-expanded={expanded}
                    aria-controls={detailsId}
                    onClick={() => toggle(index)}
                  >
                    <span className="sportscenter-grid-item-icon-wrapper">
                      <ArrowIcon />
                    </span>
                    <span className="sportscenter-grid-item-text">
                      <h3 className="sportscenter-grid-item-title">
                        {s.title}
                      </h3>
                    </span>
                  </button>

                  <ul
                    id={detailsId}
                    className={`sportscenter-details ${expanded ? "open" : ""}`}
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
