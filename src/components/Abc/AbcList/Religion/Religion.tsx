"use client";

import React from "react";
import "./Religion.scss";

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
    className="religion-arrow-icon"
  >
    <path d="M7 7 L17 17" />
    <path d="M17 7 L17 17 L7 17" />
  </svg>
);

type Item = { title: string; contact: string; address: string };

export default function MuseumsPage() {
  const items: Item[] = [
    {
      title: "Kościół Matki Boskiej Bolesnej",
      address: "ul. Głogowska 97, 60-265 Poznań",
      contact: "https://mbbolesna.archpoznan.pl/",
    },
    {
      title: "Kościół św. Anny w Poznaniu",
      address: "ul. Limanowskiego 13, 60-744 Poznań",
      contact: "https://swanna.tami.pl/",
    },
    {
      title: "Kościół św. Michała Archanioła",
      address: "ul. Stolarska 7, 60-788 Poznań",
      contact: "https://swmichal.archpoznan.pl/",
    },
    {
      title: "Meczet – Muzułmańskie Centrum Kultury",
      address: "ul. Biedrzyckiego 13, 60-272 Poznań",
      contact: "https://www.islam.poznan.pl/",
    },
    {
      title: "Cerkiew św. Mikołaja",
      address: "ul. Marcelińska 20, 60-801 Poznań",
      contact: "https://cerkiewpoznan.pl/",
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
    <section className="Religion">
      <div className="religion-top-wrapper">
        <div className="religion-container">
          <div className="religion-top">
            <div className="religion-content">
              <h2 className="religion-title">Miejsca kultu religijnego</h2>
              <p className="religion-description">
                Tu znajdziesz pełną listę miejsc kultu religijnego działających
                na obszarze Łazarza. Kliknij w wybraną placówkę, by rozwinąć
                kontakt i adres.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="religion-grid-wrapper">
        <div className="religion-container">
          <div className="religion-grid">
            {items.map((s, index) => {
              const expanded = open.has(index);
              const detailsId = `religion-details-${index}`;
              return (
                <div className="religion-grid-block" key={index}>
                  <button
                    type="button"
                    className="religion-grid-item"
                    aria-expanded={expanded}
                    aria-controls={detailsId}
                    onClick={() => toggle(index)}
                  >
                    <span className="religion-grid-item-icon-wrapper">
                      <ArrowIcon />
                    </span>
                    <span className="religion-grid-item-text">
                      <h3 className="religion-grid-item-title">{s.title}</h3>
                    </span>
                  </button>

                  <ul
                    id={detailsId}
                    className={`religion-details ${expanded ? "open" : ""}`}
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
