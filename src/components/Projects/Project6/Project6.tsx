"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import "./Project6.scss";

type Paragraph = { t: "p"; text: string };
type Heading = { t: "h3"; text: string };
type Block = Paragraph | Heading;

const DESCRIPTION: Block[] = [
  {
    t: "p",
    text: "Z inicjatywy naszej członkini Pauliny Prusieckiej Stowarzyszenie Sąsiedzki Łazarz zrealizowało piękną, wiosenną akcję – nasadzenia drzew owocowych.",
  },
  {
    t: "p",
    text: "Z radością przekazaliśmy grusze, śliwki, jabłonie i czereśnie do Domu Pomocy Społecznej oraz Szkoły Podstawowej nr 80. Wierzymy, że każde posadzone drzewo to nie tylko gest na rzecz ekologii, ale także symbol troski o przyszłe pokolenia i wspólnotę, którą budujemy na Łazarzu.",
  },
  {
    t: "p",
    text: "Dzięki tej inicjatywie nasze otoczenie stanie się jeszcze bardziej zielone i przyjazne, a owoce posłużą zarówno mieszkańcom, jak i uczniom. To mały krok ku większej zmianie – ku światu, w którym dbamy o naturę i o siebie nawzajem.",
  },
];

function RichText({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) =>
        b.t === "p" ? (
          <p key={i} className="project6-paragraph">
            {b.text}
          </p>
        ) : (
          <h3 key={i} className="project6-subheading">
            {b.text}
          </h3>
        )
      )}
    </>
  );
}

const IMAGES = [
  {
    src: "/Projects/Project6/image1.jpeg",
    alt: "Ręka trzymająca młode drzewko owocowe gotowe do posadzenia",
    w: 1600,
    h: 1067,
  },
  {
    src: "/Projects/Project6/image2.jpeg",
    alt: "Ulotka Stowarzyszenia Sąsiedzki Łazarz z logo i zdjęciem członków grupy",
    w: 1600,
    h: 1067,
  },
  {
    src: "/Projects/Project6/image3.jpeg",
    alt: "Kobieta trzymająca drzewko owocowe przed wejściem do budynku porośniętego bluszczem",
    w: 1600,
    h: 1067,
  },
] as const;

export default function Project6Page() {
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
    <main className="project6-wrapper">
      <section className="project6-content">
        <h2 className="project6-subtitle">
          Wiosenne nasadzenia drzew owocowych
        </h2>

        <RichText blocks={DESCRIPTION} />

        <h3 className="project6-subheading">Galeria</h3>
        <div className="project6-gallery" role="list">
          {IMAGES.map((img, i) => (
            <button
              key={img.src}
              className="project6-gallery-item"
              onClick={() => open(i)}
              aria-label={`Otwórz zdjęcie ${i + 1} z ${IMAGES.length}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={img.w}
                height={img.h}
                sizes="(max-width: 480px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="project6-gallery-img"
              />
            </button>
          ))}
        </div>

        <dialog
          ref={dialogRef}
          className="project6-gallery-dialog"
          aria-label="Podgląd zdjęcia"
        >
          {index !== null && (
            <div className="project6-viewer">
              <button
                className="project6-viewer-close"
                onClick={close}
                aria-label="Zamknij"
              >
                ×
              </button>
              <button
                className="project6-viewer-nav project6-prev"
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
                className="project6-viewer-img"
                priority
              />
              <button
                className="project6-viewer-nav project6-next"
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
