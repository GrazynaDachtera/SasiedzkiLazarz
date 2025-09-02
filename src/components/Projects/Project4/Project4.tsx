"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import "./Project4.scss";

type Paragraph = { t: "p"; text: string };
type Heading = { t: "h3"; text: string };
type Block = Paragraph | Heading;

const DESCRIPTION: Block[] = [
  { t: "h3", text: "Blajba na łazarskim fyrtlu" },
  {
    t: "p",
    text: "Blajba na łazarskim fyrtlu to ekskluzywny serwis kulturalny – tworzony specjalnie dla mieszkańców Osiedla Święty Łazarz. Pojawia się w każdą środę z listą wydarzeń weekendowych w naszej okolicy, często też w mieście. Jego celem jest budowanie sąsiedzkości i wyciągnięcie ludzi z domu: dzielimy się informacjami, wspieramy lokalne inicjatywy.",
  },
  {
    t: "p",
    text: "To tutaj znajdziesz zaproszenia na nadchodzące wydarzenia: wybieramy tutaj te z bezpłatnym wstępem. Nie wahaj się z nich skorzystać. Gwarantujemy, że już za drugim razem na wydarzeniu zobaczysz znajome twarze!",
  },
  {
    t: "p",
    text: "W gwarze „blajba” jest używana w kilku znaczeniach, nam pasuje: blajba - fajrant, koniec pracy, czas wolny, odpoczynek",
  },
];

function RichText({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.t) {
          case "p":
            return (
              <p key={i} className="project4-paragraph">
                {b.text}
              </p>
            );
          case "h3":
            return (
              <h3 key={i} className="project4-subheading">
                {b.text}
              </h3>
            );
        }
      })}
    </>
  );
}

const IMAGE = {
  src: "/Projects/Project4/image1.jpeg",
  alt: "Blajba – spotkanie mieszkańców na Łazarzu",
  w: 1600,
  h: 1067,
} as const;

export default function Project4Page() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const open = () => {
    setOpenDialog(true);
    dialogRef.current?.showModal();
  };

  const close = () => {
    dialogRef.current?.close();
    setOpenDialog(false);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!dialogRef.current?.open) return;
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <main className="project4-wrapper">
      <section className="project4-content">
        <h2 className="project4-subtitle">Blajba na łazarskim fyrtlu</h2>
        <RichText blocks={DESCRIPTION} />

        <h3 className="project4-subheading">Galeria</h3>
        <div className="project4-gallery" role="list">
          <button
            className="project4-gallery-item"
            onClick={open}
            aria-label="Otwórz zdjęcie"
          >
            <Image
              src={IMAGE.src}
              alt={IMAGE.alt}
              width={IMAGE.w}
              height={IMAGE.h}
              sizes="(max-width: 480px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="project4-gallery-img"
            />
          </button>
        </div>

        <dialog
          ref={dialogRef}
          className="project4-gallery-dialog"
          aria-label="Podgląd zdjęcia"
        >
          {openDialog && (
            <div className="project4-viewer">
              <button
                className="project4-viewer-close"
                onClick={close}
                aria-label="Zamknij"
              >
                ×
              </button>
              <Image
                key={IMAGE.src}
                src={IMAGE.src}
                alt={IMAGE.alt}
                width={IMAGE.w}
                height={IMAGE.h}
                sizes="90vw"
                className="project4-viewer-img"
                priority
              />
            </div>
          )}
        </dialog>
      </section>
    </main>
  );
}
