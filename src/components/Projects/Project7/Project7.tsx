"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import "./Project7.scss";

type Paragraph = { t: "p"; text: string };
type Heading = { t: "h3"; text: string };
type Block = Paragraph | Heading;

const DESCRIPTION: Block[] = [
  {
    t: "p",
    text: "„Spacery z historią w tle” to projekt, dzięki któremu chcemy pokazać, jak niezwykła i pełna tajemnic jest nasza dzielnica – Święty Łazarz. Członkowie i członkinie stowarzyszenia – Joanna Kamińska, Paulina Prusiecka i Roman Modrzyński – zapraszają mieszkańców do wspólnych odkryć, podczas których historia splata się z teraźniejszością, a codzienne miejsca nabierają nowego znaczenia.",
  },
  {
    t: "p",
    text: "Cztery razy w roku organizujemy spacery architektoniczne po City Park Poznań – wyjątkowym kompleksie powstałym na terenie dawnych koszar wojskowych. To właśnie tutaj stacjonował słynny XV Pułk Ułanów Poznańskich, uczestników Powstania Wielkopolskiego. Dziś w odrestaurowanych budynkach z 1905 roku mieszczą się eleganckie hotele, butiki i restauracje, a nowoczesna część kompleksu harmonijnie łączy cegłę, szkło i stal. To miejsce, w którym historia spotyka się z nowoczesnością – i które najlepiej odkrywać wspólnie, podczas spaceru z przewodnikiem.",
  },
  {
    t: "p",
    text: "Łazarz to jednak nie tylko architektura, ale przede wszystkim ludzie i ich historie. Dlatego częścią projektu są także spacery po fyrtlu, podczas których zaglądamy w podwórka, zaułki i mniej oczywiste zakątki dzielnicy. Poznajemy ciekawostki, odkrywamy detale i uczymy się patrzeć na znane ulice z nowej perspektywy. To okazja, by spotkać się z sąsiadami, wymienić wspomnieniami i wspólnie tworzyć nowe opowieści.",
  },
  {
    t: "p",
    text: "Jednym z wyjątkowych wydarzeń był spacer z Romanem Modrzyńskim po parku Wilsona – miejscu o bogatej i barwnej historii. Uczestnicy poznają nie tylko losy samego parku, ale także jego ukryte zakamarki oraz plany współczesnych inwestycji w jego sąsiedztwie.",
  },
  {
    t: "p",
    text: "Przygotowaliśmy także spacer „Śladami mieszkańców Łazarza” – inspirowany Galerią Witrynową opracowaną przez Fest Fyrtel. To wędrówka, która przybliża codzienność dawnych łazarskich rodzin, zwłaszcza w okolicach Rynku Łazarskiego – serca dzielnicy i miejsca tętniącego historią którą zaprezentował nam Roman Modrzyński",
  },
  {
    t: "p",
    text: "Nie mogło zabraknąć również spaceru poświęconego wydarzeniu, które zapisało się złotymi zgłoskami w dziejach całego miasta – Powszechnej Wystawie Krajowej z 1929 roku. To jedno z największych wydarzeń w historii Poznania, którego znaczna część odbywała się właśnie na Łazarzu – w parkach Kasprowicza i Wilsona. Podczas spaceru przypominamy, jak wyglądały te miejsca w czasie PeWuKi: awangardowe pawilony, Wesołe Miasteczko tętniące życiem do rana, pierwszy w historii mecz polskiej reprezentacji hokeja na trawie, a także rekordy – poważne i zupełnie absurdalne. To podróż w czasie do roku, w którym Łazarz stał się sercem największej wystawy, jaką kiedykolwiek widziała Polska.",
  },
  {
    t: "p",
    text: "Każdy spacer to mała podróż w czasie i przestrzeni. Chcemy, aby mieszkańcy poczuli dumę z tego, że żyją właśnie tutaj – w dzielnicy pełnej charakteru, klimatu i niezwykłej przeszłości.",
  },
  { t: "p", text: "👉 Wstęp wolny. Zapraszamy do wspólnych odkryć!" },
];

function RichText({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) =>
        b.t === "p" ? (
          <p key={i} className="project7-paragraph">
            {b.text}
          </p>
        ) : (
          <h3 key={i} className="project7-subheading">
            {b.text}
          </h3>
        )
      )}
    </>
  );
}

const IMAGES = [
  {
    src: "/Projects/Project7/image (1).jpeg",
    alt: "Zdjęcie 1 z galerii",
    w: 1600,
    h: 1067,
  },
  {
    src: "/Projects/Project7/image (2).jpeg",
    alt: "Zdjęcie 2 z galerii",
    w: 1600,
    h: 1067,
  },
  {
    src: "/Projects/Project7/image (3).jpeg",
    alt: "Zdjęcie 3 z galerii",
    w: 1600,
    h: 1067,
  },
  {
    src: "/Projects/Project7/image (4).jpeg",
    alt: "Zdjęcie 4 z galerii",
    w: 1600,
    h: 1067,
  },
  {
    src: "/Projects/Project7/image (5).jpeg",
    alt: "Zdjęcie 5 z galerii",
    w: 1600,
    h: 1067,
  },
  {
    src: "/Projects/Project7/image (6).jpeg",
    alt: "Zdjęcie 6 z galerii",
    w: 1600,
    h: 1067,
  },
  {
    src: "/Projects/Project7/image (7).jpeg",
    alt: "Zdjęcie 7 z galerii",
    w: 1600,
    h: 1067,
  },
  {
    src: "/Projects/Project7/image (8).jpeg",
    alt: "Zdjęcie 8 z galerii",
    w: 1600,
    h: 1067,
  },
  {
    src: "/Projects/Project7/image (9).jpeg",
    alt: "Zdjęcie 9 z galerii",
    w: 1600,
    h: 1067,
  },
] as const;

export default function Project7Page() {
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
    <main className="project7-wrapper">
      <section className="project7-content">
        <h2 className="project7-subtitle">Spacery z historią w tle</h2>

        <RichText blocks={DESCRIPTION} />

        <h3 className="project7-subheading">Galeria</h3>
        <div className="project7-gallery" role="list">
          {IMAGES.map((img, i) => (
            <button
              key={img.src}
              className="project7-gallery-item"
              onClick={() => open(i)}
              aria-label={`Otwórz zdjęcie ${i + 1} z ${IMAGES.length}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={img.w}
                height={img.h}
                sizes="(max-width: 480px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="project7-gallery-img"
              />
            </button>
          ))}
        </div>

        <dialog
          ref={dialogRef}
          className="project7-gallery-dialog"
          aria-label="Podgląd zdjęcia"
        >
          {index !== null && (
            <div className="project7-viewer">
              <button
                className="project7-viewer-close"
                onClick={close}
                aria-label="Zamknij"
              >
                ×
              </button>
              <button
                className="project7-viewer-nav project7-prev"
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
                className="project7-viewer-img"
                priority
              />
              <button
                className="project7-viewer-nav project7-next"
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
