"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import "./Project2.scss";

type Paragraph = { t: "p"; text: string };
type Heading = { t: "h3"; text: string };
type Anchor = { t: "a"; text: string; href: string };
type OrderedList = { t: "ol"; items: string[] };
type Block = Paragraph | Heading | Anchor | OrderedList;

const DESCRIPTION: Block[] = [
  {
    t: "p",
    text: "Inicjatywa wspólnego sprzątania naszej dzielnicy powstała z pomysłu Michała Frankiewicza ze Stowarzyszenia Sąsiedzki Łazarz. Jej celem jest, aby ulice naszego fyrtla były czyste, estetyczne i przyjazne do życia. Wierzymy, że porządek w otoczeniu wpływa nie tylko na wygląd dzielnicy, ale także na komfort i jakość życia mieszkańców.",
  },
  { t: "h3", text: "Podczas każdej akcji:" },
  {
    t: "ol",
    items: [
      "zapewniamy wszystkie potrzebne materiały do sprzątania,",
      "organizujemy odbiór zebranych odpadów,",
      "zapraszamy wszystkich – zarówno dorosłych, jak i dzieci – do wspólnego działania.",
    ],
  },
  {
    t: "p",
    text: "Po pracy zawsze czeka na uczestników poczęstunek i chwila rozmowy, bo integracja i budowanie sąsiedzkich więzi są dla nas równie ważne, jak czyste ulice.",
  },
  {
    t: "p",
    text: "Dołącz do naszych cyklicznych spotkań i razem zadbajmy o nasz fyrtel!",
  },
];

function RichText({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.t) {
          case "p":
            return (
              <p key={i} className="project2-paragraph">
                {b.text}
              </p>
            );
          case "h3":
            return (
              <h3 key={i} className="project2-subheading">
                {b.text}
              </h3>
            );
          case "ol":
            return (
              <ol key={i} className="project2-list">
                {b.items.map((it, idx) => (
                  <li key={idx}>{it}</li>
                ))}
              </ol>
            );
          case "a":
            return (
              <p key={i} className="project2-paragraph">
                <a
                  className="project2-link"
                  href={b.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {b.text}
                </a>
              </p>
            );
        }
      })}
    </>
  );
}

const IMAGES = [
  {
    src: "/Projects/Project2/image4.jpeg",
    alt: "Mieszkańcy w akcji",
    w: 1600,
    h: 1067,
  },
  {
    src: "/Projects/Project2/image5.jpeg",
    alt: "Mieszkańcy w akcji",
    w: 1600,
    h: 1067,
  },
  {
    src: "/Projects/Project2/image1.jpeg",
    alt: "Sprzątanie Łazarza",
    w: 1600,
    h: 1067,
  },
  {
    src: "/Projects/Project2/image7.jpeg",
    alt: "Mieszkańcy w akcji",
    w: 1600,
    h: 1067,
  },
  {
    src: "/Projects/Project2/image2.jpeg",
    alt: "Materiały do sprzątania",
    w: 1600,
    h: 1067,
  },
  {
    src: "/Projects/Project2/image3.jpeg",
    alt: "Zebrane odpady",
    w: 1600,
    h: 1067,
  },
  {
    src: "/Projects/Project2/image6.jpeg",
    alt: "Mieszkańcy w akcji",
    w: 1600,
    h: 1067,
  },
] as const;

export default function Project2Page() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState<number | null>(null);

  const open = (i: number) => {
    setIndex(i);
    dialogRef.current?.showModal();
  };
  const close = () => {
    dialogRef.current?.close();
    setIndex(null);
  };
  const prev = () => setIndex((i) => (i! - 1 + IMAGES.length) % IMAGES.length);
  const next = () => setIndex((i) => (i! + 1) % IMAGES.length);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!dialogRef.current?.open) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <main className="project2-wrapper">
      <section className="project2-content">
        <h2 className="project2-subtitle">Sąsiedzkie sprzątanie Łazarza !!!</h2>

        <RichText blocks={DESCRIPTION} />

        <h3 className="project2-subheading">Galeria</h3>
        <div className="project2-gallery" role="list">
          {IMAGES.map((img, i) => (
            <button
              key={img.src}
              className="project2-gallery-item"
              onClick={() => open(i)}
              aria-label={`Otwórz zdjęcie ${i + 1} z ${IMAGES.length}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={img.w}
                height={img.h}
                sizes="(max-width: 480px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="project2-gallery-img"
              />
            </button>
          ))}
        </div>

        <dialog
          ref={dialogRef}
          className="project2-dialog"
          aria-label="Podgląd zdjęcia"
        >
          {index !== null && (
            <div className="project2-viewer">
              <button
                className="project2-viewer-close"
                onClick={close}
                aria-label="Zamknij"
              >
                ×
              </button>
              <button
                className="project2-viewer-nav prev"
                onClick={prev}
                aria-label="Poprzednie zdjęcie"
              >
                ‹
              </button>
              <Image
                key={IMAGES[index].src}
                src={IMAGES[index].src}
                alt={IMAGES[index].alt}
                width={IMAGES[index].w}
                height={IMAGES[index].h}
                sizes="90vw"
                className="project2-viewer-img"
                priority
              />
              <button
                className="project2-viewer-nav next"
                onClick={next}
                aria-label="Następne zdjęcie"
              >
                ›
              </button>
            </div>
          )}
        </dialog>
      </section>
    </main>
  );
}
