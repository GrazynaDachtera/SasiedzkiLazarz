"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type SyntheticEvent as ReactSyntheticEvent,
} from "react";
import Image from "next/image";
import "./Project3.scss";

type Paragraph = { t: "p"; text: string };
type Heading = { t: "h3"; text: string };
type Link = { t: "a"; text: string; href: string };
type OrderedList = { t: "ol"; items: string[] };
type Block = Paragraph | Heading | Link | OrderedList;

type GalleryImage = {
  src: string;
  alt: string;
  w: number;
  h: number;
};

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
  {
    t: "p",
    text: "Ognioodporny Łazarz wymyśliła Magda Krawczyk, przygotowała też wniosek konkursowy.",
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

const IMAGES: readonly GalleryImage[] = [
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

function useLightbox(total: number) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState<number | null>(null);

  const isOpen = index !== null;

  const open = useCallback((i: number) => {
    setIndex(i);
    dialogRef.current?.showModal();
  }, []);

  const close = useCallback(() => {
    dialogRef.current?.close();
    setIndex(null);
  }, []);

  const step = useCallback(
    (delta: number) => {
      setIndex((i) => {
        if (i === null) return i;
        return (i + delta + total) % total;
      });
    },
    [total],
  );

  const prev = useCallback(() => step(-1), [step]);
  const next = useCallback(() => step(1), [step]);

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
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close, next, prev]);

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

  const swipe = useRef<{
    x: number;
    y: number;
    pointerId: number | null;
    active: boolean;
  }>({
    x: 0,
    y: 0,
    pointerId: null,
    active: false,
  });

  const onViewerPointerDown = useCallback(
    (e: ReactPointerEvent<HTMLElement>) => {
      if (e.pointerType === "mouse") return;
      swipe.current = {
        x: e.clientX,
        y: e.clientY,
        pointerId: e.pointerId,
        active: true,
      };
      (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    },
    [],
  );

  const onViewerPointerUp = useCallback(
    (e: ReactPointerEvent<HTMLElement>) => {
      if (!swipe.current.active || swipe.current.pointerId !== e.pointerId)
        return;

      swipe.current.active = false;
      try {
        (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
      } catch {}

      const dx = e.clientX - swipe.current.x;
      const dy = e.clientY - swipe.current.y;

      const min = 50;
      const ratio = 1.2;

      if (Math.abs(dx) >= min && Math.abs(dx) > Math.abs(dy) * ratio) {
        if (dx > 0) prev();
        else next();
      }
    },
    [next, prev],
  );

  const onViewerPointerCancel = useCallback(
    (e: ReactPointerEvent<HTMLElement>) => {
      swipe.current.active = false;
      try {
        (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
      } catch {}
    },
    [],
  );

  return {
    dialogRef,
    index,
    open,
    close,
    prev,
    next,
    onBackdropPointerDown,
    onCancel,
    onViewerPointerDown,
    onViewerPointerUp,
    onViewerPointerCancel,
  };
}

function Gallery({ images }: { images: readonly GalleryImage[] }) {
  const {
    dialogRef,
    index,
    open,
    close,
    prev,
    next,
    onBackdropPointerDown,
    onCancel,
    onViewerPointerDown,
    onViewerPointerUp,
    onViewerPointerCancel,
  } = useLightbox(images.length);

  const active = useMemo(
    () => (index === null ? null : images[index]),
    [images, index],
  );

  return (
    <>
      <div className="project3-gallery" role="list">
        {images.map((img, i) => (
          <button
            key={img.src}
            className="project3-gallery-item"
            onClick={() => open(i)}
            aria-label={`Otwórz zdjęcie ${i + 1} z ${images.length}`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 480px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="project3-gallery-img"
            />
          </button>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        className="project3-gallery-dialog"
        aria-label="Podgląd zdjęcia"
        onPointerDown={onBackdropPointerDown}
        onCancel={onCancel}
      >
        {active && (
          <div
            className="project3-viewer"
            role="document"
            onPointerDown={onViewerPointerDown}
            onPointerUp={onViewerPointerUp}
            onPointerCancel={onViewerPointerCancel}
          >
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
              key={active.src}
              src={active.src}
              alt={active.alt}
              width={active.w}
              height={active.h}
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
    </>
  );
}

export default function Project3Page() {
  return (
    <main className="project3-wrapper">
      <section className="project3-content">
        <h2 className="project3-subtitle">Ognioodporny Łazarz</h2>
        <RichText blocks={DESCRIPTION} />
        <h3 className="project3-subheading">Galeria</h3>
        <Gallery images={IMAGES} />
      </section>
    </main>
  );
}
