"use client";

import React from "react";
import "./Offices.scss";

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
    className="offices-arrow-icon"
  >
    <path d="M7 7 L17 17" />
    <path d="M17 7 L17 17 L7 17" />
  </svg>
);

export default function ObjectsPage() {
  const items = [
    {
      title: "Biuro Strefy Płatnego Parkowania",
      address: "ul. Głogowska 18, 60-734 Poznań",
      contact: "https://zdm.poznan.pl/wydzial-parkowania",
    },
    {
      title: "Biuro Obsługi Klienta ZTM (PEKA)",
      address: "ul. Matejki 59, 60-770 Poznań",
      contact: "https://www.ztm.poznan.pl/",
    },
    {
      title: "Główny Punkt Obsługi Klienta OK Poznań MTP",
      address: "ul. Głogowska 16, 60-734 Poznań",
      contact: "https://okpoznan.pl/",
    },
    {
      title: "Urząd Miasta Poznania – Biuro Spraw Lokalowych",
      address: "ul. Matejki 50, 60-770 Poznań",
      contact: "https://bip.poznan.pl/",
    },
    {
      title: "Urząd Transportu Kolejowego, Oddział Terenowy w Poznaniu",
      address: "ul. Górecka 1, 60-201 Poznań",
      contact: "https://utk.gov.pl/",
    },
    {
      title: "Urząd Komunikacji Elektronicznej, Delegatura",
      address: "ul. Marcina Kasprzaka 54, 60-245 Poznań",
      contact: "http://www.uke.gov.pl/",
    },
    {
      title: "Komenda Miejska Policji w Poznaniu",
      address: "ul. Szylinga 2, 60-787 Poznań",
      contact: "https://poznan.policja.gov.pl/",
    },
    {
      title: "Jednostka Ratowniczo-Gaśnicza nr 2 KM Państwowej Straży Pożarnej",
      address: "ul. Grunwaldzka 16a, 60-782 Poznań",
      contact: "https://www.facebook.com/Jrg2Poznan/?locale=pl_PL",
    },
    {
      title: "Straż Miejska Miasta Poznania – Komenda",
      address: "ul. Głogowska 26, 60-734 Poznań",
      contact: "https://sm.poznan.pl/imm/straz/",
    },
    {
      title: "14 Wojskowy Oddział Gospodarczy",
      address: "ul. Bukowska 34, 60-811 Poznań",
      contact: "https://14wog.wp.mil.pl/",
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
    <section className="Offices">
      <div className="offices-top-wrapper">
        <div className="offices-container">
          <div className="offices-top">
            <div className="offices-content">
              <h2 className="offices-title">Ważne obiekty</h2>
              <p className="offices-description">
                Tu znajdziesz pełną ważnych obiektów na obszarze Łazarza.
                Kliknij w wybraną placówkę, by rozwinąć kontakt i adres.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="offices-grid-wrapper">
        <div className="offices-container">
          <div className="offices-grid">
            {items.map((s, index) => {
              const expanded = open.has(index);
              const detailsId = `offices-details-${index}`;
              return (
                <div className="offices-grid-block" key={index}>
                  <button
                    type="button"
                    className="offices-grid-item"
                    aria-expanded={expanded}
                    aria-controls={detailsId}
                    onClick={() => toggle(index)}
                  >
                    <span className="offices-grid-item-icon-wrapper">
                      <ArrowIcon />
                    </span>
                    <span className="offices-grid-item-text">
                      <h3 className="offices-grid-item-title">{s.title}</h3>
                    </span>
                  </button>

                  <ul
                    id={detailsId}
                    className={`offices-details ${expanded ? "open" : ""}`}
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
