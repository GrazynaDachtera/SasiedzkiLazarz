"use client";

import React from "react";
import "./Kindergarten.scss";

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
    className="kindergarten-arrow-icon"
  >
    <path d="M7 7 L17 17" />
    <path d="M17 7 L17 17 L7 17" />
  </svg>
);

type KG = {
  title: string;
  address: string;
  email?: string;
  website?: string;
};

export default function AbcPage() {
  // Order follows the sheet: 25, 32, 39, 44, 48, 51, 89, 90
  const features: KG[] = [
    {
      title: "Przedszkole nr 25",
      address: "ul. Głogowska 97, 60-265 Poznań",
      email: "p25@poznan.interklasa.pl",
      website: "https://p25-poznan.pl/",
    },
    {
      title: 'Przedszkole nr 32 "Świerszczykowe Nutki"',
      address: "ul. Chociszewskiego 44c, 60-259 Poznań",
      email: "sekretariat@p32poznan.pl",
      website: "https://www.facebook.com/swierszczykowenutki/",
    },
    {
      title: 'Przedszkole nr 39 "Leśne Ludki"',
      address: "ul. Limanowskiego 23B, 60-744 Poznań",
      email: "p39@poznan.interklasa.pl",
      website: "https://lesneludki39.poznan.pl/",
    },
    {
      title: "Przedszkole nr 44 im. J. Korczaka",
      address: "ul. Dmowskiego 17, 60-222 Poznań",
      email: "ps44@o2.pl",
      website: "https://www.facebook.com/profile.php?id=100048408651912",
    },
    {
      title: "Przedszkole nr 48",
      address: "ul. Łukaszewicza 35, 60-729 Poznań",
      email: "p48@poznan.interklasa.pl",
      website: "https://p48poznan.szkolnastrona.pl/",
    },
    {
      title: "Przedszkole nr 51",
      address: "ul. Głogowska 40, 60-736 Poznań",
      email: "przedszkole51@zsipopoznan.pl",
      website: "https://p51.zsjpopoznan.pl/",
    },
    {
      title: "Przedszkole nr 89",
      address: "ul. Kasprzaka 46, 60-245 Poznań",
      email: "p89@onet.eu",
      website: "https://p89poznan.szkolnastrona.pl/",
    },
    {
      title: "Przedszkole nr 90 im. J. Brzechwy",
      address: "ul. Winklera 9, 60-246 Poznań",
      email: "",
      website: "https://www.facebook.com/przedszkole90poznan/?locale=pl_PL",
    },
  ];

  const [open, setOpen] = React.useState<Set<number>>(new Set());
  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });

  const renderWebsite = (url?: string) =>
    url ? (
      <a href={url} target="_blank" rel="noopener noreferrer">
        {url}
      </a>
    ) : (
      <span>brak strony</span>
    );

  const renderEmail = (email?: string) =>
    email ? <a href={`mailto:${email}`}>{email}</a> : <span>brak e-maila</span>;

  return (
    <section className="Kindergarten">
      <div className="kindergarten-top-wrapper">
        <div className="kindergarten-container">
          <div className="kindergarten-top">
            <div className="kindergarten-content">
              <h2 className="kindergarten-title">Przedszkola</h2>
              <p className="kindergarten-description">
                Tu znajdziesz pełną listę przedszkoli działających na obszarze
                Łazarza. Kliknij w wybraną placówkę, by rozwinąć kontakt i
                adres.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="kindergarten-grid-wrapper">
        <div className="kindergarten-container">
          <div className="kindergarten-grid">
            {features.map((feature, index) => {
              const expanded = open.has(index);
              const detailsId = `kg-details-${index}`;
              return (
                <div className="kindergarten-grid-block" key={index}>
                  <button
                    type="button"
                    className="kindergarten-grid-item"
                    aria-expanded={expanded}
                    aria-controls={detailsId}
                    onClick={() => toggle(index)}
                  >
                    <span className="kindergarten-grid-item-icon-wrapper">
                      <ArrowIcon />
                    </span>
                    <span className="kindergarten-grid-item-text">
                      <h3 className="kindergarten-grid-item-title">
                        {feature.title}
                      </h3>
                    </span>
                  </button>

                  <ul
                    id={detailsId}
                    className={`kindergarten-details ${expanded ? "open" : ""}`}
                  >
                    <li>{renderWebsite(feature.website)}</li>
                    <li>{renderEmail(feature.email)}</li>
                    <li>{feature.address}</li>
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
