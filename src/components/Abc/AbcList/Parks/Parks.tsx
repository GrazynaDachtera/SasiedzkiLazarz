"use client";

import React from "react";
import "./Parks.scss";

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
    className="parks-arrow-icon"
  >
    <path d="M7 7 L17 17" />
    <path d="M17 7 L17 17 L7 17" />
  </svg>
);

export default function ParksPage() {
  const items = [
    {
      title: "Park Kasprowicza",
      contact: "otwarty całą dobę",
      address: "wejścia od Reymonta, Wyspiańskiego, Jarochowskiego",
    },
    {
      title: "Park Wilsona",
      contact: "otwarty od 5:00–22:00",
      address: "wejścia od Głogowskiej, Matejki, Śniadeckich",
    },
    {
      title: "ROD im. Marii Skłodowskiej-Curie",
      contact: "ogólnodostępne w wyznaczonych godzinach od wiosny do jesieni",
      address: "ul. Potockiej 50, 60-211 Poznań",
    },
    {
      title: "ROD im. O. Kopczyńskiego",
      contact: "ogólnodostępne w wyznaczonych godzinach od wiosny do jesieni",
      address: "ul. Hetmańska, 60-905 Poznań",
    },
    {
      title: "Ogród Społeczny Kolektyw Kąpielisko",
      contact: "https://www.facebook.com/kolektywkapielisko",
      address: "Park Kasprowicza, teren wzdłuż basenu letniego",
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
    <section className="Parks">
      <div className="parks-top-wrapper">
        <div className="parks-container">
          <div className="parks-top">
            <div className="parks-content">
              <h2 className="parks-title">Parki, tereny zielone</h2>
              <p className="parks-description">
                Tu znajdziesz pełną listę parków i terenów zielonych na obszarze
                Łazarza. Kliknij w wybraną placówkę, by rozwinąć kontakt i
                adres.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="parks-grid-wrapper">
        <div className="parks-container">
          <div className="parks-grid">
            {items.map((s, index) => {
              const expanded = open.has(index);
              const detailsId = `parks-details-${index}`;
              return (
                <div className="parks-grid-block" key={index}>
                  <button
                    type="button"
                    className="parks-grid-item"
                    aria-expanded={expanded}
                    aria-controls={detailsId}
                    onClick={() => toggle(index)}
                  >
                    <span className="parks-grid-item-icon-wrapper">
                      <ArrowIcon />
                    </span>
                    <span className="parks-grid-item-text">
                      <h3 className="parks-grid-item-title">{s.title}</h3>
                    </span>
                  </button>

                  <ul
                    id={detailsId}
                    className={`parks-details ${expanded ? "open" : ""}`}
                  >
                    <li>{renderContact(s.contact)}</li>
                    <li>{s.address || <span>brak adresu</span>}</li>
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
