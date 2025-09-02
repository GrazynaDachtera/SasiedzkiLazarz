"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import "./Project5.scss";

type Paragraph = { t: "p"; text: string };
type Heading = { t: "h3"; text: string };
type Block = Paragraph | Heading;

const DESCRIPTION: Block[] = [
  { t: "h3", text: "Spotkania sąsiedzkie przy wspólnym stole" },
  {
    t: "p",
    text: "Stowarzyszenie Sąsiedzki Łazarz zaprasza wszystkich mieszkańców dzielnicy Św. Łazarz do wspólnego spędzania czasu i rozmów w miłej atmosferze.",
  },
  {
    t: "p",
    text: "Raz na trzy miesiące spotykamy się w Kawiarni Cappuccina w City Park Poznań, by usiąść przy dużym stole, napić się domowej lemoniady i poczęstować ciasteczkami. To doskonała okazja, by poznać się bliżej, wymienić doświadczeniami i porozmawiać o tym, co ważne dla naszej okolicy.",
  },
  {
    t: "p",
    text: "Nie trzeba się zapisywać – wystarczy przyjść i dołączyć do sąsiadów.",
  },
  {
    t: "p",
    text: "Tworzymy otwartą przestrzeń do rozmowy, dzielenia się pomysłami i budowania dobrych relacji na Łazarzu.",
  },
  {
    t: "p",
    text: "👉 Do zobaczenia przy wspólnym stole!",
  },
];

function RichText({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) =>
        b.t === "p" ? (
          <p key={i} className="project5-paragraph">
            {b.text}
          </p>
        ) : (
          <h3 key={i} className="project5-subheading">
            {b.text}
          </h3>
        )
      )}
    </>
  );
}

const IMAGES = [
  {
    src: "/Projects/Project5/image1.jpeg",
    alt: "Spotkanie sąsiedzkie – wspólny stół",
    w: 1600,
    h: 1067,
  },
  {
    src: "/Projects/Project5/image2.jpeg",
    alt: "Rozmowy mieszkańców przy kawie",
    w: 1600,
    h: 1067,
  },
  {
    src: "/Projects/Project5/image3.jpeg",
    alt: "Sąsiedzi częstują się lemoniadą i ciastkami",
    w: 1600,
    h: 1067,
  },
] as const;

export default function Project5Page() {
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
    <main className="project5-wrapper">
      <section className="project5-content">
        <h2 className="project5-subtitle">
          Spotkania sąsiedzkie przy wspólnym stole
        </h2>
        <RichText blocks={DESCRIPTION} />

        <h3 className="project5-subheading">Galeria</h3>
        <div className="project5-gallery" role="list">
          {IMAGES.map((img, i) => (
            <button
              key={img.src}
              className="project5-gallery-item"
              onClick={() => open(i)}
              aria-label={`Otwórz zdjęcie ${i + 1} z ${IMAGES.length}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={img.w}
                height={img.h}
                sizes="(max-width: 480px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="project5-gallery-img"
              />
            </button>
          ))}
        </div>

        <dialog
          ref={dialogRef}
          className="project5-gallery-dialog"
          aria-label="Podgląd zdjęcia"
        >
          {index !== null && (
            <div className="project5-viewer">
              <button
                className="project5-viewer-close"
                onClick={close}
                aria-label="Zamknij"
              >
                ×
              </button>
              <button
                className="project5-viewer-nav project5-prev"
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
                className="project5-viewer-img"
                priority
              />
              <button
                className="project5-viewer-nav project5-next"
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
