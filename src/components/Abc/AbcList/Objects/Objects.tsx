"use client";

import React from "react";
import "./Objects.scss";

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
    className="objects-arrow-icon"
  >
    <path d="M7 7 L17 17" />
    <path d="M17 7 L17 17 L7 17" />
  </svg>
);

export default function ObjectsPage() {
  const items = [
    {
      title: "Hala Widowiskowo-Sportowa ARENA",
      address: "ul. Wyspiańskiego 33, 60-751 Poznań",
      contact: "https://arenapoznan.pl/pl/kontakt/",
    },
    {
      title: "Palmiarnia Poznańska",
      address: "ul. Matejki 18, 60-767 Poznań",
      contact: "https://palmiarnia.poznan.pl",
    },
    {
      title: "Centrum wystawiennicze Międzynarodowe Targi Poznańskie",
      address: "ul. Głogowska 10, 60-734 Poznań, wejście na Zieloną Rzekę",
      contact: "https://www.mtp.pl/pl/uslugi/zielona-rzeka/",
    },
    {
      title: "Rynek Łazarski",
      address: "Rynek Łazarski",
      contact: "https://www.targowiska.com.pl/lokalizacje/rynek-lazarski-2/",
    },
    {
      title: "Skwer Eki z Małeki, a tam Krawatto",
      address: "ul. Łukaszewicza 1a, 61-001 Poznań",
      contact:
        "https://www.otwartastrefakultury.pl/losk/instalacja-artystyczna-krawatto/",
    },
    {
      title: "Rower Kazimierza Nowaka – Otwarty Pomnik",
      address: "ul. Małeckiego 36, 60-707 Poznań",
      contact:
        "https://www.otwartastrefakultury.pl/losk/otwarty-pomnik-kazimierza-nowaka/",
    },
    {
      title: "Łazarskie Kandelabry",
      address: "ul. Mottego 10, 60-723 Poznań",
      contact:
        "https://www.lepszypoznan.pl/poznanskie-kandelabry-22-07-2024.html",
    },
    {
      title: "Totemy Alicji Białej",
      address: "ul. Bukowska 3, 60-809 Poznań",
      contact:
        "https://gloswielkopolski.pl/poznan-tajemnicze-rzezby-przy-baltyku-to-totemy-alicji-bialej-ktore-mowia-jak-zapobiec-katastrofie-zdjecia/ar/c13-14122249",
    },
    {
      title: "Zespół Johow-Gelände",
      address: "Matejki/Wyspiańskiego/Grottgera",
      contact: "https://pl.wikipedia.org/wiki/Johow-Gel%C3%A4nde_w_Poznaniu",
    },
    {
      title: "Łazarskie Bunkry",
      address:
        "Park Wilsona: 2 szczeliny przeciwlotnicze; Berwińskiego 5: schron Arthura Greisera",
      contact: "dostępne co roku podczas Dni Twierdzy Poznań",
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
    <section className="Objects">
      <div className="objects-top-wrapper">
        <div className="objects-container">
          <div className="objects-top">
            <div className="objects-content">
              <h2 className="objects-title">Ważne obiekty</h2>
              <p className="objects-description">
                Tu znajdziesz pełną ważnych obiektów na obszarze Łazarza.
                Kliknij w wybraną placówkę, by rozwinąć kontakt i adres.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="objects-grid-wrapper">
        <div className="objects-container">
          <div className="objects-grid">
            {items.map((s, index) => {
              const expanded = open.has(index);
              const detailsId = `objects-details-${index}`;
              return (
                <div className="objects-grid-block" key={index}>
                  <button
                    type="button"
                    className="objects-grid-item"
                    aria-expanded={expanded}
                    aria-controls={detailsId}
                    onClick={() => toggle(index)}
                  >
                    <span className="objects-grid-item-icon-wrapper">
                      <ArrowIcon />
                    </span>
                    <span className="objects-grid-item-text">
                      <h3 className="objects-grid-item-title">{s.title}</h3>
                    </span>
                  </button>

                  <ul
                    id={detailsId}
                    className={`objects-details ${expanded ? "open" : ""}`}
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
