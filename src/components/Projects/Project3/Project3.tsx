"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import "./Project3.scss";

type Paragraph = { t: "p"; text: string };
type Heading = { t: "h3"; text: string };
type Link = { t: "a"; text: string; href: string };
type OrderedList = { t: "ol"; items: string[] };
type Block = Paragraph | Heading | Link | OrderedList;

const DESCRIPTION: Block[] = [
  {
    t: "p",
    text: "Ognioodporny Łazarz to projekt, którego celem jest wyposażenie mieszkańców Osiedla Święty Łazarz w wiedzę oraz sprzęt do zapobiegania i reagowania na zagrożenia – pożary 🔥🔥🔥",
  },
  {
    t: "p",
    text: "W 2025 roku realizujemy działania dzięki programowi Wielkopolska Wiara. W ramach grantu zorganizujemy 2 spotkania podwórkowe z mieszkańcami 👨‍👩‍👦👨‍👩‍👧",
  },
  {
    t: "ol",
    items: [
      "▶️ strażaków, którzy powiedzą co robić – aby uniknąć pożaru, oraz strat – gdy już się zdarzył",
      "▶️ 100 czujników dymu do zainstalowania w domu",
      "▶️ okazję do spotkania sąsiadów – wierzymy, że wzajemna życzliwość jest podstawą bezpiecznych miast",
      "▶️ zrzutkowy poczęstunek piknikowy",
      "▶️ plakaty do przekazania sąsiadom lub znajomym",
    ],
  },
  {
    t: "p",
    text: "Na naszej stronie Ognioodporny Łazarz na facebooku, będą czekać posty z materiałami Państwowej Straży Pożarnej z zakresu prewencji.",
  },
  {
    t: "p",
    text: "Wielkopolska Wiara jest realizowana przez Stowarzyszenie Centrum PISOP ze środków Narodowego Instytutu Wolności – Centrum Rozwoju Społeczeństwa Obywatelskiego w ramach Rządowego Programu Fundusz Inicjatyw Obywatelskich #NOWEFIO na lata 2021–2030. Częścią grantu jest opracowanie planu rozwoju stowarzyszenia. Właśnie widzicie stronę www, która jest jednym z etapów naszych zamierzeń.",
  },
];

function RichText({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.t) {
          case "p":
            return (
              <p key={i} className="project3-paragraph">
                {b.text}
              </p>
            );
          case "h3":
            return (
              <h3 key={i} className="project3-subheading">
                {b.text}
              </h3>
            );
          case "ol":
            return (
              <ol key={i} className="project3-list">
                {b.items.map((it, idx) => (
                  <li key={idx}>{it}</li>
                ))}
              </ol>
            );
          case "a":
            return (
              <p key={i} className="project3-paragraph">
                <a
                  className="project3-link"
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
    src: "/Projects/Project3/image1.jpeg",
    alt: "Plakat wydarzenia „Sąsiedzkie Pikniki” na tablicy ogłoszeń w parku",
    w: 1600,
    h: 1067,
  },
  {
    src: "/Projects/Project3/image2.jpeg",
    alt: "Prowadząca rozmawia z mieszkańcami podczas spotkania na trawie",
    w: 1600,
    h: 1067,
  },
  {
    src: "/Projects/Project3/image3.jpeg",
    alt: "Mieszkańcy siedzą na kocach i krzesłach podczas prelekcji w plenerze",
    w: 1600,
    h: 1067,
  },
  {
    src: "/Projects/Project3/image4.jpeg",
    alt: "Strażacy prowadzą pokaz dla mieszkańców na osiedlowej polanie",
    w: 1600,
    h: 1067,
  },
  {
    src: "/Projects/Project3/image5.jpeg",
    alt: "Wóz strażacki i tłum uczestników podczas pikniku sąsiedzkiego",
    w: 1600,
    h: 1067,
  },
  {
    src: "/Projects/Project3/image6.jpeg",
    alt: "Zbliżenie na plakietkę Ognioodporny Łazarz na teczce z materiałami",
    w: 1600,
    h: 1067,
  },
  {
    src: "/Projects/Project3/image7.jpeg",
    alt: "Pączki i maliny – poczęstunek przygotowany dla uczestników wydarzenia",
    w: 1600,
    h: 1067,
  },
  {
    src: "/Projects/Project3/image8.jpeg",
    alt: "Dzieci i rodzice słuchają strażaków podczas pokazu bezpieczeństwa",
    w: 1600,
    h: 1067,
  },
  {
    src: "/Projects/Project3/image9.jpeg",
    alt: "Strażak trzyma czujnik dymu – prezentacja sprzętu przeciwpożarowego",
    w: 1600,
    h: 1067,
  },
  {
    src: "/Projects/Project3/image10.jpeg",
    alt: "Uczestniczka czyta ulotkę z instrukcjami bezpieczeństwa pożarowego",
    w: 1600,
    h: 1067,
  },
  {
    src: "/Projects/Project3/image11.jpeg",
    alt: "Wóz strażacki i mieszkańcy na terenie zielonym podczas pikniku",
    w: 1600,
    h: 1067,
  },
] as const;

export default function Project3Page() {
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
    <main className="project3-wrapper">
      <section className="project3-content">
        <h2 className="project3-subtitle">Ognioodporny Łazarz</h2>

        <RichText blocks={DESCRIPTION} />

        {/* Gallery */}
        <h3 className="project3-subheading">Galeria</h3>
        <div className="project3-gallery" role="list">
          {IMAGES.map((img, i) => (
            <button
              key={img.src}
              className="project3-gallery-item"
              onClick={() => open(i)}
              aria-label={`Otwórz zdjęcie ${i + 1} z ${IMAGES.length}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={img.w}
                height={img.h}
                sizes="(max-width: 480px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="project3-gallery-img"
              />
            </button>
          ))}
        </div>

        {/* Lightbox */}
        <dialog
          ref={dialogRef}
          className="project3-gallery-dialog"
          aria-label="Podgląd zdjęcia"
        >
          {index !== null && (
            <div className="project3-viewer">
              <button
                className="project3-viewer-close"
                onClick={close}
                aria-label="Zamknij"
              >
                ×
              </button>
              <button
                className="project3-viewer-nav project3-prev"
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
                className="project3-viewer-img"
                priority
              />
              <button
                className="project3-viewer-nav project3-next"
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
