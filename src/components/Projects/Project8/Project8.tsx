"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import "./Project8.scss";

type Paragraph = { t: "p"; text: string };
type Heading = { t: "h3"; text: string };
type Block = Paragraph | Heading;

const DESCRIPTION: Block[] = [
  {
    t: "p",
    text: "W ramach inicjatyw zorganizowaliśmy dwa sąsiedzkie spacery po terenach, które chcielibyśmy widzieć w przyszłości jako park-sad.",
  },
  {
    t: "p",
    text: "Pierwszy spacer poprowadzili Bartosz Kolenda i Łukasz Maćkowiak, dzieląc się swoją wiedzą botaniczno-przyrodniczą. Wspólnie odwiedziliśmy miejsce planowanego parku, a przy okazji zadbaliśmy o okolicę – zbierając zalegające śmieci. Worki, rękawice i odbiór odpadów zapewnił Wydział Gospodarki Komunalnej Miasta Poznania. Niektórzy uczestnicy przyszli nawet z wózkami, taczkami czy specjalnymi kijami do sięgania po odpady – dzięki czemu porządki przebiegły sprawnie i w dobrej atmosferze.",
  },
  {
    t: "p",
    text: "Drugi spacer prowadzony przez członków Koalicji ZaZieleń Poznań odbył się na terenie proponowanego Parku-Sadu w kwartale ulic Hetmańska, Dmowskiego, Krauthofera i Górecka. Zatrzymywaliśmy się pod drzewami, obserwowaliśmy ptaki i rozmawialiśmy o idei parku jako przestrzeni otwartej, pełnej bioróżnorodności i dostępnej dla wszystkich mieszkańców. Przy okazji sprzątaliśmy ten zielony teren aby miło było tam spacerować.",
  },
  {
    t: "p",
    text: "Spotkania pokazały, jak cenny jest ten teren – zarówno dla lokalnej społeczności, jak i dla przyrody.",
  },
];

function RichText({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) =>
        b.t === "p" ? (
          <p key={i} className="project8-paragraph">
            {b.text}
          </p>
        ) : (
          <h3 key={i} className="project8-subheading">
            {b.text}
          </h3>
        )
      )}
    </>
  );
}

const IMAGES = [
  {
    src: "/Projects/Project8/image (1).jpeg",
    alt: "Galeria Project8 – zdjęcie 1",
    w: 1600,
    h: 1067,
  },
  {
    src: "/Projects/Project8/image (2).jpeg",
    alt: "Galeria Project8 – zdjęcie 2",
    w: 1600,
    h: 1067,
  },
  {
    src: "/Projects/Project8/image (3).jpeg",
    alt: "Galeria Project8 – zdjęcie 3",
    w: 1600,
    h: 1067,
  },
  {
    src: "/Projects/Project8/image (4).jpeg",
    alt: "Galeria Project8 – zdjęcie 4",
    w: 1600,
    h: 1067,
  },
  {
    src: "/Projects/Project8/image (5).jpeg",
    alt: "Galeria Project8 – zdjęcie 5",
    w: 1600,
    h: 1067,
  },
  {
    src: "/Projects/Project8/image (6).jpeg",
    alt: "Galeria Project8 – zdjęcie 6",
    w: 1600,
    h: 1067,
  },
  {
    src: "/Projects/Project8/image (7).jpeg",
    alt: "Galeria Project8 – zdjęcie 7",
    w: 1600,
    h: 1067,
  },
  {
    src: "/Projects/Project8/image (8).jpeg",
    alt: "Galeria Project8 – zdjęcie 8",
    w: 1600,
    h: 1067,
  },
  {
    src: "/Projects/Project8/image (9).jpeg",
    alt: "Galeria Project8 – zdjęcie 9",
    w: 1600,
    h: 1067,
  },
  {
    src: "/Projects/Project8/image (10).jpeg",
    alt: "Galeria Project8 – zdjęcie 10",
    w: 1600,
    h: 1067,
  },
] as const;

export default function Project8Page() {
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
    <main className="project8-wrapper">
      <section className="project8-content">
        <h2 className="project8-subtitle">Sąsiedzkie spacery ze sprzątaniem</h2>

        <RichText blocks={DESCRIPTION} />

        <h3 className="project8-subheading">Galeria</h3>
        <div className="project8-gallery" role="list">
          {IMAGES.map((img, i) => (
            <button
              key={img.src}
              className="project8-gallery-item"
              onClick={() => open(i)}
              aria-label={`Otwórz zdjęcie ${i + 1} z ${IMAGES.length}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={img.w}
                height={img.h}
                sizes="(max-width: 480px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="project8-gallery-img"
              />
            </button>
          ))}
        </div>

        <dialog
          ref={dialogRef}
          className="project8-gallery-dialog"
          aria-label="Podgląd zdjęcia"
        >
          {index !== null && (
            <div className="project8-viewer">
              <button
                className="project8-viewer-close"
                onClick={close}
                aria-label="Zamknij"
              >
                ×
              </button>
              <button
                className="project8-viewer-nav project8-prev"
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
                className="project8-viewer-img"
                priority
              />
              <button
                className="project8-viewer-nav project8-next"
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
