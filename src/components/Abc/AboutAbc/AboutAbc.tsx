"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import "./AboutAbc.scss";

const ArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="butt"
    strokeLinejoin="miter"
    className="arrow-icon"
    aria-hidden="true"
  >
    <path d="M7 7 L17 17" />
    <path d="M17 7 L17 17 L7 17" />
  </svg>
);

type Feature = { title: string; href: string };

export default function AbcPage() {
  const features: Feature[] = [
    { title: "Szkoły", href: "/Abc/List/School" },
    { title: "Przedszkola", href: "/Abc/List/Kindergarten" },
    { title: "Żłobki", href: "/Abc/List/Nurseries" },
    { title: "Szpitale, SOR", href: "/Abc/List/SOR" },
    { title: "Biblioteki", href: "/Abc/List/Libraries" },
    { title: "Sport", href: "/Abc/List/SportsCenter" },
    { title: "Miejsca kultu religijnego", href: "/Abc/List/Religion" },
    { title: "Media", href: "/Abc/List/Media" },
    { title: "Parki, tereny zielone", href: "/Abc/List/Parks" },
    { title: "Kultura", href: "/Abc/List/Museums" },
    {
      title: "Urzędy, jednostki miejskie, służby mundurowe",
      href: "/Abc/List/Offices",
    },
    { title: "Trzeba zobaczyć!", href: "/Abc/List/Objects" },
  ];

  return (
    <section className="Abc">
      <div className="abc-hero">
        <div className="abc-container">
          <div className="abc-hero-grid">
            <div className="abc-hero-media">
              <Image
                src="/Abc/person.jpg"
                alt="Portret osoby"
                width={652}
                height={336}
                className="abc-hero-img"
                priority
                sizes="(max-width:700px) 92vw, (max-width:1200px) 50vw, 560px"
              />
            </div>
            <div className="abc-hero-copy">
              <p className="abc-eyebrow">Przewodnik mieszkańca</p>
              <h1 className="abc-title">Osiedlowe ABC</h1>
              <p className="abc-desc">
                Osiedlowe ABC to praktyczny przewodnik po najważniejszych
                miejscach i usługach w naszej okolicy. W jednym miejscu
                zebraliśmy informacje o szkołach, przedszkolach i żłobkach,
                SOR-ze i wieczorynce, ośrodkach kultury i sporcie, parkach,
                muzeach oraz innych ważnych obiektach – z adresami i przydatnymi
                linkami.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div id="kategorie" className="abc-categories">
        <div className="abc-container">
          <div className="abc-cats-header">
            <h2>Kategorie</h2>
            <p>Wybierz interesującą Cię sekcję</p>
          </div>
          <div className="abc-cats-grid" role="list">
            {features.map((f, i) => (
              <Link
                href={f.href}
                key={f.href}
                className={`abc-card tone-${i + 1}`}
                role="listitem"
                aria-label={f.title}
              >
                <span className="abc-card-title">{f.title}</span>
                <span className="abc-card-icon">
                  <ArrowIcon />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
