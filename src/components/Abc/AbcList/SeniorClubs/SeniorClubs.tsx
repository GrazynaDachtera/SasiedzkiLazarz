"use client";

import React from "react";
import "./SeniorClubs.scss";

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
    className="senior-clubs-arrow-icon"
  >
    <path d="M7 7 L17 17" />
    <path d="M17 7 L17 17 L7 17" />
  </svg>
);

type SeniorClub = {
  title: string;
  address: string;
  meetingHours?: string;
  phone?: string;
  contactHours?: string;
  note?: string;
};

export default function SeniorClubsPage() {
  const seniorClubs: SeniorClub[] = [
    {
      title: "Klub Seniora „Bamberka” (Klub Krąg)",
      address: "ul. Dmowskiego 37",
      meetingHours: "czwartek 17:00-20:00",
      phone: "61 647 42 88",
    },
    {
      title: "Prozdrowotny Klub Seniora przy Fundacji Orchidea Neuro Wsparcie",
      address: "ul. Hetmańska 15",
      phone: "601 493 705",
      contactHours:
        "poniedziałek-czwartek w godz. 9:00-19:00, piątek w godz. 9:00-15:00",
    },
    {
      title: "Klub Seniora „Relaks”",
      address: "ul. Wojskowa 16",
      meetingHours: "piątki 12:00-14:00",
      note: "Jeśli chcesz się skontaktować z tym klubem, odezwij się do nas - podamy więcej wskazówek.",
    },
    {
      title: "Klub Seniora „Uśmiech”",
      address: "ul. Wojskowa 16",
      meetingHours: "środy 12:00-14:00",
      note: "Jeśli chcesz się skontaktować z tym klubem, odezwij się do nas - podamy więcej wskazówek.",
    },
    {
      title: "Klub Seniora „Zorza”",
      address: "ul. Wojskowa 16",
      meetingHours: "czwartki 12:00-14:00",
      note: "Jeśli chcesz się skontaktować z tym klubem, odezwij się do nas - podamy więcej wskazówek.",
    },
  ];

  const [open, setOpen] = React.useState<Set<number>>(new Set());

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);

      if (next.has(i)) {
        next.delete(i);
      } else {
        next.add(i);
      }

      return next;
    });

  const renderPhone = (phone: string) => (
    <a href={`tel:${phone.replace(/\s+/g, "")}`}>{phone}</a>
  );

  return (
    <section className="SeniorClubs">
      <div className="senior-clubs-top-wrapper">
        <div className="senior-clubs-container">
          <div className="senior-clubs-top">
            <div className="senior-clubs-content">
              <h2 className="senior-clubs-title">Kluby seniora</h2>

              <p className="senior-clubs-description">
                To lista klubów seniora na terenie Osiedla Święty Łazarz.
                Kliknij w wybrany klub, by rozwinąć adres, godziny spotkań i
                dane kontaktowe.
              </p>

              <p className="senior-clubs-description">
                Jeśli chcesz się skontaktować z klubami Relaks, Uśmiech albo
                Zorza - odezwij się do nas, podamy więcej wskazówek.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="senior-clubs-grid-wrapper">
        <div className="senior-clubs-container">
          <div className="senior-clubs-grid">
            {seniorClubs.map((club, index) => {
              const expanded = open.has(index);
              const detailsId = `senior-club-details-${index}`;

              return (
                <div className="senior-clubs-grid-block" key={club.title}>
                  <button
                    type="button"
                    className="senior-clubs-grid-item"
                    aria-expanded={expanded}
                    aria-controls={detailsId}
                    onClick={() => toggle(index)}
                  >
                    <span className="senior-clubs-grid-item-icon-wrapper">
                      <ArrowIcon />
                    </span>

                    <span className="senior-clubs-grid-item-text">
                      <h3 className="senior-clubs-grid-item-title">
                        {club.title}
                      </h3>
                    </span>
                  </button>

                  <ul
                    id={detailsId}
                    className={`senior-clubs-details ${expanded ? "open" : ""}`}
                  >
                    <li>
                      <strong>Adres:</strong> {club.address}
                    </li>

                    {club.meetingHours && (
                      <li>
                        <strong>Godziny spotkań:</strong> {club.meetingHours}
                      </li>
                    )}

                    {club.phone && (
                      <li>
                        <strong>Telefon:</strong> {renderPhone(club.phone)}
                      </li>
                    )}

                    {club.contactHours && (
                      <li>
                        <strong>Godziny kontaktu:</strong> {club.contactHours}
                      </li>
                    )}

                    {club.note && <li>{club.note}</li>}
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
