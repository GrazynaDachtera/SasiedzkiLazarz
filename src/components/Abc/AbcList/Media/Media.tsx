"use client";

import React from "react";
import "./Media.scss";

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
    className="media-arrow-icon"
  >
    <path d="M7 7 L17 17" />
    <path d="M17 7 L17 17 L7 17" />
  </svg>
);

type Item = { title: string; contact: string; address: string };

export default function MuseumsPage() {
  const items: Item[] = [
    {
      title: "Radio Poznań",
      address: "ul. Berwińskiego 5, 60-765 Poznań",
      contact: "https://radiopoznan.fm/",
    },
    {
      title: "wPoznaniu.pl",
      address: "ul. Bukowska 12, 60-810 Poznań",
      contact: "https://wpoznaniu.pl/",
    },
    {
      title: "Głos Wielkopolski",
      address: "ul. Grunwaldzka 19, 60-782 Poznań",
      contact: "https://gloswielkopolski.pl/",
    },
    {
      title: "Portal Lazarz.pl",
      address: "online",
      contact: "https://lazarz.pl/",
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
    <section className="Media">
      <div className="media-top-wrapper">
        <div className="media-container">
          <div className="media-top">
            <div className="media-content">
              <h2 className="media-title">Media</h2>
              <p className="media-description">
                Lokalne media i portale z Łazarza i Poznania. Kliknij w pozycję,
                by zobaczyć stronę i adres.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="media-grid-wrapper">
        <div className="media-container">
          <div className="media-grid">
            {items.map((s, index) => {
              const expanded = open.has(index);
              const detailsId = `media-details-${index}`;
              return (
                <div className="media-grid-block" key={index}>
                  <button
                    type="button"
                    className="media-grid-item"
                    aria-expanded={expanded}
                    aria-controls={detailsId}
                    onClick={() => toggle(index)}
                  >
                    <span className="media-grid-item-icon-wrapper">
                      <ArrowIcon />
                    </span>
                    <span className="media-grid-item-text">
                      <h3 className="media-grid-item-title">{s.title}</h3>
                    </span>
                  </button>

                  <ul
                    id={detailsId}
                    className={`media-details ${expanded ? "open" : ""}`}
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
