"use client";

import React from "react";
import "./Nurseries.scss";

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
    className="nurseries-arrow-icon"
  >
    <path d="M7 7 L17 17" />
    <path d="M17 7 L17 17 L7 17" />
  </svg>
);

type Nursery = {
  title: string;
  address: string;
  email?: string;
  website?: string;
};

export default function NurseriesPage() {
  const nurseries: Nursery[] = [
    {
      title: "Żłobek „Jacek i Agatka”",
      address: "ul. Winklera 8, 60-246 Poznań",
      email: "jacekiagatka@zlobekpoznan.pl",
      website: "https://zlobekpoznan.pl/zlobki/zlobek-jacek-i-agatka/",
    },
    {
      title: "Żłobek „Czerwony Kapturek”",
      address: "ul. Klonowica 3, 60-747 Poznań",
      email: "czerwonykapturek@zlobekpoznan.pl",
      website: "https://zlobekpoznan.pl/zlobki/zlobek-czerwony-kapturek/",
    },
    {
      title: "Żłobek „Królewna Śnieżka”",
      address: "ul. Grunwaldzka 34, 60-786 Poznań",
      email: "krolewnasniezka@zlobekpoznan.pl",
      website: "https://zlobekpoznan.pl/zlobki/zlobek-krolewna-sniezka/",
    },
    {
      title: "Żłobek „Kolorowy Domek”",
      address: "ul. Ułańska 15/64, 60-748 Poznań",
      email: "biuropoznankolorowydomek@wp.pl",
      website: "https://kolorowydomek.com.pl/",
    },
    {
      title: "Żłobek „Tygryskowa Chatka”",
      address: "ul. Głogowska 18, 60-734 Poznań",
      email: "j.piechniak@firs.org.pl",
      website: "https://www.facebook.com/tygryskowachatka/",
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
    <section className="Nurseries">
      <div className="nurseries-top-wrapper">
        <div className="nurseries-container">
          <div className="nurseries-top">
            <div className="nurseries-content">
              <h2 className="nurseries-title">Żłobki</h2>
              <p className="nurseries-description">
                Tu znajdziesz pełną listę żłobków działających na obszarze
                Łazarza. Kliknij w wybraną placówkę, by rozwinąć kontakt i
                adres.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="nurseries-grid-wrapper">
        <div className="nurseries-container">
          <div className="nurseries-grid">
            {nurseries.map((n, index) => {
              const expanded = open.has(index);
              const detailsId = `ns-details-${index}`;
              return (
                <div className="nurseries-grid-block" key={index}>
                  <button
                    type="button"
                    className="nurseries-grid-item"
                    aria-expanded={expanded}
                    aria-controls={detailsId}
                    onClick={() => toggle(index)}
                  >
                    <span className="nurseries-grid-item-icon-wrapper">
                      <ArrowIcon />
                    </span>
                    <span className="nurseries-grid-item-text">
                      <h3 className="nurseries-grid-item-title">{n.title}</h3>
                    </span>
                  </button>

                  <ul
                    id={detailsId}
                    className={`nurseries-details ${expanded ? "open" : ""}`}
                  >
                    <li>{renderWebsite(n.website)}</li>
                    <li>{renderEmail(n.email)}</li>
                    <li>{n.address}</li>
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
