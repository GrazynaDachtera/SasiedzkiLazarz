"use client";

import React from "react";
import "./Museums.scss";

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
    className="museums-arrow-icon"
  >
    <path d="M7 7 L17 17" />
    <path d="M17 7 L17 17 L7 17" />
  </svg>
);

type Item = { title: string; contact: string; address: string };

export default function MuseumsPage() {
  const items: Item[] = [
    {
      title: "Galeria Ego",
      address: "ul. Wyspiańskiego 41/3, 60-751 Poznań",
      contact: "http://galeriaego.pl/",
    },
    {
      title: "Brodziak Gallery",
      address: "ul. Głogowska 18, 60-734 Poznań",
      contact: "https://szymonbrodziak.com/",
    },
    {
      title: "VHP Gallery",
      address: "ul. Wyspiańskiego 26 City Park Poznań",
      contact: "https://vhpgallery.com/",
    },
    {
      title: "Galeria Wiele Sztuki",
      address: "ul. Małeckiego 28, 60-706 Poznań",
      contact: "https://www.facebook.com/wielesztuki/?locale=pl_PL",
    },
    {
      title: "Pani Domu – Prywatna Galeria Sztuki",
      address: "ul. Niegolewskich 7/7, 60-234 Poznań",
      contact: "https://www.facebook.com/panidomupoznan",
    },
    {
      title: "Galeria – ekspozytory na łazarskim Lejku",
      address: "skwer Kazimierza Nowaka, od ulicy Głogowskiej",
      contact: "",
    },
    {
      title: "PIX.HOUSE",
      address: "ul. Głogowska 35; 60-736 Poznań",
      contact: "https://pix.house/",
    },
    {
      title: "Muzeum Piwa (w sklepie Piwa Świata)",
      address: "ul. Głogowska 115, 60-224 Poznań",
      contact:
        "https://kultura.poznan.pl/mim/kultura/news/z-tylu-sklepu,151237.html",
    },
    {
      title: "Niewidzialna Ulica",
      address: "ul. Matejki 53, 60-770 Poznań",
      contact: "https://niewidzialnaulica.pl/",
    },
    {
      title: "Galeria Łęctwo",
      address: "Łukaszewicza 1, 60-725 Poznań",
      contact: "https://www.facebook.com/lectwo.galeria/?locale=pl_PL",
    },
    {
      title: "Młodzieżowy Dom Kultury nr 3",
      address: "ul. Jarochowskiego 1, 60-235 Poznań",
      contact: "https://mdk3.poznan.pl/",
    },
    {
      title: "Klub Osiedlowy KRĄG",
      address: "ul. Dmowskiego 37, 60-222 Poznań",
      contact: "https://www.klubkrag.pl/",
    },
    {
      title: "Przystanek Pireus",
      address: "ul. Głogowska 35, 60-736 Poznań",
      contact: "https://www.facebook.com/PrzystanekPireus",
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
    <section className="Museums">
      <div className="museums-top-wrapper">
        <div className="museums-container">
          <div className="museums-top">
            <div className="museums-content">
              <h2 className="museums-title">Kultura</h2>
              <p className="museums-description">
                Tu znajdziesz pełną listę muzeów i galerii działających na
                obszarze Łazarza. Kliknij w wybraną placówkę, by rozwinąć
                kontakt i adres.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="museums-grid-wrapper">
        <div className="museums-container">
          <div className="museums-grid">
            {items.map((s, index) => {
              const expanded = open.has(index);
              const detailsId = `museums-details-${index}`;
              return (
                <div className="museums-grid-block" key={index}>
                  <button
                    type="button"
                    className="museums-grid-item"
                    aria-expanded={expanded}
                    aria-controls={detailsId}
                    onClick={() => toggle(index)}
                  >
                    <span className="museums-grid-item-icon-wrapper">
                      <ArrowIcon />
                    </span>
                    <span className="museums-grid-item-text">
                      <h3 className="museums-grid-item-title">{s.title}</h3>
                    </span>
                  </button>

                  <ul
                    id={detailsId}
                    className={`museums-details ${expanded ? "open" : ""}`}
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
