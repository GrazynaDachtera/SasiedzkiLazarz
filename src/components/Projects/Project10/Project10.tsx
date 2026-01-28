"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import "./Project10.scss";

type Paragraph = { t: "p"; text: string };
type Heading = { t: "h3"; text: string };
type Block = Paragraph | Heading;

const DESCRIPTION: Block[] = [
  {
    t: "p",
    text: `Wspólnie z mieszkańcami przygotowaliśmy listę budynków, których wygląd budzi obawy co do stanu
technicznego. Listę przekazaliśmy do Powiatowego Inspektora Nadzoru Budowlanego dla Miasta
Poznania. Cyklicznie zwracamy się do PINB o informacje o przeprowadzonych kontrolach,
interwencjach i ich wynikach. Aktualności udostępniamy na naszej stronie FB i Instagramie.`,
  },
  {
    t: "p",
    text: `#łazarskierudery #rudery`,
  },
];

const normalize = (s: string) => s.replace(/\s+/g, " ").trim();
const isHashtagsOnly = (s: string) =>
  /^(\s*#[^\s#]+(\s+#[^\s#]+)*)\s*$/.test(s);

function RichText({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        if (b.t === "h3") {
          return (
            <h3 key={i} className="project10-subheading">
              {b.text}
            </h3>
          );
        }

        const text = normalize(b.text);
        const hashtagsOnly = isHashtagsOnly(text);

        return (
          <p
            key={i}
            className={`project10-paragraph${
              hashtagsOnly ? " project10-hashtags" : ""
            }`}
          >
            {text}
          </p>
        );
      })}
    </>
  );
}

const IMAGES = [
  {
    src: "/Projects/Project10/rudery_czerwiec.jpg",
    alt: "Galeria Project10 – zdjęcie 1",
    w: 1600,
    h: 1067,
  },
] as const;

export default function Project10Page() {
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
    <main className="project10-wrapper">
      <section className="project10-content">
        <h2 className="project10-subtitle">Rudery na Łazarzu</h2>

        <RichText blocks={DESCRIPTION} />

        <h3 className="project10-subheading">Galeria</h3>
        <div className="project10-gallery" role="list">
          {IMAGES.map((img, i) => (
            <button
              key={img.src}
              className="project10-gallery-item"
              onClick={() => open(i)}
              aria-label={`Otwórz zdjęcie ${i + 1} z ${IMAGES.length}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={img.w}
                height={img.h}
                sizes="(max-width: 480px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="project10-gallery-img"
              />
            </button>
          ))}
        </div>

        <dialog
          ref={dialogRef}
          className="project10-gallery-dialog"
          aria-label="Podgląd zdjęcia"
        >
          {index !== null && (
            <div className="project10-viewer">
              <button
                className="project10-viewer-close"
                onClick={close}
                aria-label="Zamknij"
              >
                ×
              </button>
              <button
                className="project10-viewer-nav project10-prev"
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
                className="project10-viewer-img"
                priority
              />
              <button
                className="project10-viewer-nav project10-next"
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
