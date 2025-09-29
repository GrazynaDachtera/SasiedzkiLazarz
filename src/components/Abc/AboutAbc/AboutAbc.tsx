"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import "./AboutAbc.scss";

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
    className="arrow-icon"
  >
    <path d="M7 7 L17 17" />
    <path d="M17 7 L17 17 L7 17" />
  </svg>
);

export default function AbcPage() {
  const features = [
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
    <section className="AbcHeading">
      <div className="abc-heading-top-wrapper">
        <div className="abc-heading-container">
          <div className="abc-heading-top">
            <div className="abc-heading-image-wrapper">
              <Image
                src="/Abc/person.png"
                alt="Portret osoby"
                width={652}
                height={336}
                className="abc-heading-image"
                priority
                sizes="(max-width:700px) 90vw, (max-width:1200px) 50vw, 33vw"
              />
            </div>

            <div className="abc-heading-content">
              <h2 className="abc-heading-title">Osiedlowe ABC</h2>
              <p className="abc-heading-description">
                Osiedlowe ABC to praktyczny przewodnik po najważniejszych
                miejscach i usługach w naszej okolicy. W jednym miejscu
                zebraliśmy informacje o szkołach, przedszkolach i żłobkach,
                SOR-ze i wieczorynce, ośrodkach kultury i sportu, parkach,
                muzeach oraz innych ważnych obiektach - z adresami i przydatnymi
                linkami.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="abc-heading-grid-wrapper">
        <div className="abc-heading-container">
          <div className="abc-heading-grid">
            {features.map((feature) => (
              <Link
                href={feature.href}
                className="grid-item"
                key={feature.href}
              >
                <span className="grid-item-icon-wrapper">
                  <ArrowIcon />
                </span>
                <span className="grid-item-text">
                  <h3 className="grid-item-title">{feature.title}</h3>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
