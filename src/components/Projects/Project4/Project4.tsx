"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type SyntheticEvent as ReactSyntheticEvent,
} from "react";
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
    text: "W gwarze „blajba” jest używana w kilku znaczeniach, nam pasuje: blajba - fajrant, koniec pracy, czas wolny, odpoczynek.",
  },
  {
    t: "p",
    text: `Wydarzenia kulturalne "Blajba" organizuje Magda Krawczyk.`,
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

function useSingleLightbox() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => {
    setIsOpen(true);
    dialogRef.current?.showModal();
  }, []);

  const close = useCallback(() => {
    dialogRef.current?.close();
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const body = document.body;
    const docEl = document.documentElement;
    const scrollY = window.scrollY;

    const prevStyles = {
      overflow: body.style.overflow,
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      paddingRight: body.style.paddingRight,
    };

    const scrollbarWidth = window.innerWidth - docEl.clientWidth;

    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      body.style.overflow = prevStyles.overflow;
      body.style.position = prevStyles.position;
      body.style.top = prevStyles.top;
      body.style.left = prevStyles.left;
      body.style.right = prevStyles.right;
      body.style.width = prevStyles.width;
      body.style.paddingRight = prevStyles.paddingRight;
      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!dialogRef.current?.open) return;
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  const onBackdropPointerDown = useCallback(
    (e: ReactPointerEvent<HTMLDialogElement>) => {
      if (e.target === e.currentTarget) close();
    },
    [close],
  );

  const onCancel = useCallback(
    (e: ReactSyntheticEvent<HTMLDialogElement, Event>) => {
      e.preventDefault();
      close();
    },
    [close],
  );

  return { dialogRef, isOpen, open, close, onBackdropPointerDown, onCancel };
}

export default function Project4Page() {
  const { dialogRef, isOpen, open, close, onBackdropPointerDown, onCancel } =
    useSingleLightbox();

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
              fill
              sizes="(max-width: 480px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="project4-gallery-img"
            />
          </button>
        </div>

        <dialog
          ref={dialogRef}
          className="project4-gallery-dialog"
          aria-label="Podgląd zdjęcia"
          onPointerDown={onBackdropPointerDown}
          onCancel={onCancel}
        >
          {isOpen && (
            <div className="project4-viewer" role="document">
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
