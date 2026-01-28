"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import "./Project9.scss";

type Paragraph = { t: "p"; text: string };
type Heading = { t: "h3"; text: string };
type LinkBlock = { t: "link"; label: string; href: string };
type Block = Paragraph | Heading | LinkBlock;

const DESCRIPTION: Block[] = [
  {
    t: "p",
    text: "Na zaproszenie Fundacji AITWAR braliśmy udział w organizacji obchodów 125. rocznicy połączenia wsi Święty Łazarz, Jeżyce i Wilda z Poznaniem. Wspólnie z reprezentacją Łazarza: stowarzyszeniem Wirtualny Łazarz, CIL Łazanka, Klubem Krąg i harcerzami ze Szczepu Łazarz przygotowywaliśmy wydarzenia na naszym fyrtlu.",
  },
  {
    t: "p",
    text: "My zrealizowaliśmy 2 projekty: spacer w Piotrem Ciesielskim, przewodnikiem z PoPoznaniu.pl, oraz opracowanie i wykonanie wystawy witrynowej Dawny Łazarz.",
  },
  {
    t: "p",
    text: "Spacer - to jak zawsze hit, pomimo mroźnej aury stawiły się tłumy! Zorganizowała go Joanna Kamińska.",
  },
  {
    t: "p",
    text: "A wystawa to była fantastyczna okazja, żeby razem w mieszkańcami powspominać… W 11 witrynach sklepowych umieszczone zostały plansze z pocztówką oraz opisem tego miejsca 125 lat temu. Zostały przygotowane przez Magdę Krawczyk i Romana Modrzyńskiego. Wystawa była też prezentowana na finałowym festynie, wraz z krówkami od Pomorskiego (dlaczego - dowiecie się z Wystawy 😊). Dziękujemy wszystkim gościom za wizytę i opowieści.",
  },
  {
    t: "p",
    text: "Zapraszamy na samodzielny spacer po dawnym Łazarzu z naszymi tablicami i pocztówkami z początku XX wieku od Biblioteki Uniwersyteckiej w Poznaniu.",
  },
  {
    t: "p",
    text: "Wystawa witrynowa „Dawny Łazarz” została zorganizowana w ramach Projektu „JEDEN-DWA-PIĘĆ! - działania międzydzielnicowe z okazji 125 rocznicy przyłączenia Jeżyc, Łazarza i Wildy do Poznania”, finansowanego ze środków Miasta Poznania.",
  },
  {
    t: "p",
    text: "Organizatorem obchodów była Fundacja AITWAR, która koordynowała działania lokalnych współorganizatorów.",
  },
  { t: "h3", text: "Linki" },
  { t: "p", text: "Wydarzenie na fb https://fb.me/e/4xXRenvof" },
  {
    t: "link",
    label: "Plik pdf",
    href: "/Projects/Project9/Dawny_11_plakaty_logo_qr_fin.pdf",
  },
  {
    t: "link",
    label: "Tablice „Dawny Łazarz”",
    href: "/Projects/Project9/Dawny_wydarzenie.png",
  },
  {
    t: "link",
    label: "Kalendarium obchodów",
    href: "/Projects/Project9/Kalendarium.pdf",
  },
];

const URL_RE = /(https?:\/\/[^\s]+)/g;

function renderWithLinks(text: string) {
  const parts = text.split(URL_RE);
  return parts.map((part, idx) =>
    part.startsWith("http") ? (
      <a
        key={`${part}-${idx}`}
        href={part}
        className="project9-link"
        target="_blank"
        rel="noreferrer"
      >
        {part}
      </a>
    ) : (
      part
    ),
  );
}

function RichText({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        if (b.t === "p") {
          return (
            <p key={i} className="project9-paragraph">
              {renderWithLinks(b.text)}
            </p>
          );
        }

        if (b.t === "h3") {
          return (
            <h3 key={i} className="project9-subheading">
              {b.text}
            </h3>
          );
        }

        return (
          <p key={i} className="project9-paragraph">
            <a
              href={b.href}
              className="project9-link"
              target="_blank"
              rel="noreferrer"
            >
              {b.label}
            </a>
          </p>
        );
      })}
    </>
  );
}

const IMAGES = [
  {
    src: "/Projects/Project9/125_spacer_wyd_fin.png",
    alt: "Galeria Project9 – zdjęcie 1",
    w: 1600,
    h: 1067,
  },
] as const;

export default function Project9Page() {
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

  const prev = () =>
    setIndex((i) => ((i ?? 0) - 1 + IMAGES.length) % IMAGES.length);
  const next = () => setIndex((i) => ((i ?? 0) + 1) % IMAGES.length);

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
    <main className="project9-wrapper">
      <section className="project9-content">
        <h2 className="project9-subtitle">
          Dawny Łazarz - wystawa witrynowa z okazji 125-lecia połączenia z
          Poznaniem
        </h2>

        <RichText blocks={DESCRIPTION} />

        <h3 className="project9-subheading">Galeria</h3>
        <div className="project9-gallery" role="list">
          {IMAGES.map((img, i) => (
            <button
              key={img.src}
              className="project9-gallery-item"
              onClick={() => open(i)}
              aria-label={`Otwórz zdjęcie ${i + 1} z ${IMAGES.length}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={img.w}
                height={img.h}
                sizes="(max-width: 480px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="project9-gallery-img"
              />
            </button>
          ))}
        </div>

        <dialog
          ref={dialogRef}
          className="project9-gallery-dialog"
          aria-label="Podgląd zdjęcia"
        >
          {index !== null && (
            <div className="project9-viewer">
              <button
                className="project9-viewer-close"
                onClick={close}
                aria-label="Zamknij"
              >
                ×
              </button>
              <button
                className="project9-viewer-nav project9-prev"
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
                className="project9-viewer-img"
                priority
              />
              <button
                className="project9-viewer-nav project9-next"
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
