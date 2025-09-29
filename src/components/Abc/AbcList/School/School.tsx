"use client";

import React from "react";
import "./School.scss";

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
    className="school-arrow-icon"
  >
    <path d="M7 7 L17 17" />
    <path d="M17 7 L17 17 L7 17" />
  </svg>
);

type Item = { title: string; contact: string; address: string };

export default function SchoolPage() {
  const schools: Item[] = [
    // SZKOŁY
    {
      title:
        "Zespół Szkół nr 8: Szkoła Podstawowa nr 69 im. Jarogniewa Drwęskiego (SMS)",
      contact: "https://sp69sms.edupage.org/",
      address: "ul. Jarochowskiego 62, 60-246 Poznań",
    },
    {
      title: "Szkoła Podstawowa nr 9 im. dr. Franciszka Witaszka",
      contact: "https://sp9poznan.edupage.org/",
      address: "ul. Łukaszewicza 9/13, 61-001 Poznań",
    },
    {
      title: "Szkoła Podstawowa nr 26 im. R. Berwińskiego",
      contact: "https://www.zsjpopoznan.pl/",
      address: "ul. Berwińskiego 2, 60-765 Poznań",
    },
    {
      title: "Zespół Szkół Ogólnokształcących nr 33 w Poznaniu",
      contact: "https://33.poznan.pl/",
      address: "ul. Wyspiańskiego 27, 60-751 Poznań",
    },
    {
      title: "Szkoła Podstawowa nr 77 im. 15 Pułku Ułanów Poznańskich",
      contact: "https://sp77poznan.pl/",
      address: "ul. Dmowskiego 50, 60-204 Poznań",
    },
    {
      title: "Szkoła Podstawowa nr 90 im. hr. W. Zamoyskiego",
      contact: "spnr90@wp.pl",
      address: "ul. Chociszewskiego 56, 60-261 Poznań",
    },
    {
      title: "I Liceum Ogólnokształcące im. K. Marcinkowskiego",
      contact: "https://marcinek.poznan.pl/",
      address: "ul. Bukowska 16, 60-809 Poznań",
    },
    {
      title:
        "II Liceum Ogólnokształcące im. Generałowej Zamoyskiej i Heleny Modrzejewskiej w Poznaniu",
      contact: "https://lo2.poznan.pl/",
      address: "ul. Matejki 8/10, 60-995 Poznań",
    },
    {
      title: "Zespół Szkół Handlowych",
      contact: "https://www.zsh.edu.pl/",
      address: "ul. Śniadeckich 54/58, 60-774 Poznań",
    },
    {
      title:
        "XXXVII Liceum Ogólnokształcące z Oddziałami Terapeutycznymi im. Jana Pawła II w Poznaniu",
      contact: "http://37lo.poznan.pl/",
      address: "ul. Potockiej 38, 60-211 Poznań",
    },
    {
      title:
        "Publiczne Liceum Ogólnokształcące Katolickiego Stowarzyszenia Wychowawców im. bł. Natalii Tułasiewicz w Poznaniu",
      contact: "https://dobrelieceum.pl/",
      address: "ul. Głogowska 92, 60-262 Poznań",
    },
    {
      title:
        "Zespół Szkół Sióstr Zmartwychwstanek im. Matki Jadwigi Borzęckiej w Poznaniu",
      contact: "sekretariat@gloszp.pl",
      address: "ul. Głogowska 147, 60-206 Poznań",
    },

    // UCZELNIE
    {
      title: "Wyższa Szkoła Bezpieczeństwa",
      contact: "https://www.wsb.net.pl/",
      address: "ul. Orzeszkowej 1, 60-778 Poznań",
    },
    {
      title:
        "Collegium Heliodori Święcicki Uniwersytetu im. Adama Mickiewicza w Poznaniu",
      contact: "",
      address: "ul. Grunwaldzka 6, 60-780 Poznań",
    },
    {
      title: "Wydział Anglistyki UAM w Poznaniu",
      contact: "https://anglistyka.amu.edu.pl/",
      address: "adres na stronie",
    },
    {
      title: "Centrum Językowe UAM w Poznaniu",
      contact: "https://sj.amu.edu.pl/kursy_jezykowe",
      address: "adres na stronie",
    },
    {
      title: "Instytut Konfucjusza UAM w Poznaniu",
      contact: "http://konfucjusz.amu.edu.pl/",
      address: "adres na stronie",
    },
    {
      title:
        "Collegium Anatomicum Uniwersytetu Medycznego im. Karola Marcinkowskiego w Poznaniu",
      contact: "",
      address: "ul. Święcickiego 6, 60-781 Poznań",
    },
    {
      title:
        "Collegium Stomatologicum Uniwersytetu Medycznego im. Karola Marcinkowskiego w Poznaniu",
      contact: "",
      address: "ul. Bukowska 70, 60-812 Poznań",
    },
    {
      title: "Wydział Lekarski (UMP)",
      contact: "https://wi.ump.edu.pl/",
      address: "adres na stronie",
    },
    {
      title: "Wydział Medyczny (UMP)",
      contact: "https://wm.ump.edu.pl/",
      address: "adres na stronie",
    },
    {
      title: "Wydział Farmaceutyczny (UMP)",
      contact: "https://wf.ump.edu.pl/",
      address: "adres na stronie",
    },
    {
      title: "Wydział Nauk o Zdrowiu (UMP)",
      contact: "https://wnoz.ump.edu.pl/",
      address: "adres na stronie",
    },
    {
      title: "Centrum Biologii Medycznej UMP",
      contact: "https://ump.edu.pl/uniwersyteckie-centrum-biologii-medycznej",
      address: "ul. Rokietnicka 8, 60-806 Poznań",
    },
    {
      title: "Centrum Symulacji Medycznej UMP",
      contact: "https://csm.ump.edu.pl/",
      address: "ul. Rokietnicka 7, 60-608 Poznań",
    },
    {
      title: "Centrum Kongresowo-Dydaktyczne i Biblioteka Uniwersytecka UMP",
      contact: "https://bg.ump.edu.pl/",
      address: "ul. Przybyszewskiego 37a, 60-356 Poznań",
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
    <section className="School">
      <div className="school-top-wrapper">
        <div className="school-container">
          <div className="school-top">
            <div className="school-content">
              <h2 className="school-title">Szkoły</h2>
              <p className="school-description">
                Tu znajdziesz pełną listę szkół działających na obszarze
                Łazarza. Kliknij w wybraną placówkę, by rozwinąć kontakt i
                adres.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="school-grid-wrapper">
        <div className="school-container">
          <div className="school-grid">
            {schools.map((s, index) => {
              const expanded = open.has(index);
              const detailsId = `sc-details-${index}`;
              return (
                <div className="school-grid-block" key={index}>
                  <button
                    type="button"
                    className="school-grid-item"
                    aria-expanded={expanded}
                    aria-controls={detailsId}
                    onClick={() => toggle(index)}
                  >
                    <span className="school-grid-item-icon-wrapper">
                      <ArrowIcon />
                    </span>
                    <span className="school-grid-item-text">
                      <h3 className="school-grid-item-title">{s.title}</h3>
                    </span>
                  </button>

                  <ul
                    id={detailsId}
                    className={`school-details ${expanded ? "open" : ""}`}
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
