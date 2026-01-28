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
import "./Project2.scss";

type Paragraph = { t: "p"; text: string };
type Heading = { t: "h3"; text: string };
type Anchor = { t: "a"; text: string; href: string };
type OrderedList = { t: "ol"; items: string[] };
type Block = Paragraph | Heading | Anchor | OrderedList;

type GalleryImage = {
  src: string;
  alt: string;
  w: number;
  h: number;
};

const DESCRIPTION: Block[] = [
  {
    t: "p",
    text: "Inicjatywa wspólnego sprzątania naszej dzielnicy powstała z pomysłu Michała Frankiewicza ze Stowarzyszenia Sąsiedzki Łazarz. Jej celem jest, aby ulice naszego fyrtla były czyste, estetyczne i przyjazne do życia. Wierzymy, że porządek w otoczeniu wpływa nie tylko na wygląd dzielnicy, ale także na komfort i jakość życia mieszkańców.",
  },
  { t: "h3", text: "Podczas każdej akcji:" },
  {
    t: "ol",
    items: [
      "zapewniamy wszystkie potrzebne materiały do sprzątania,",
      "organizujemy odbiór zebranych odpadów,",
      "zapraszamy wszystkich – zarówno dorosłych, jak i dzieci – do wspólnego działania.",
    ],
  },
  {
    t: "p",
    text: "Po pracy zawsze czeka na uczestników poczęstunek i chwila rozmowy, bo integracja i budowanie sąsiedzkich więzi są dla nas równie ważne, jak czyste ulice.",
  },
  {
    t: "p",
    text: "Dołącz do naszych cyklicznych spotkań i razem zadbajmy o nasz fyrtel!",
  },
];

function RichText({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        if (b.t === "p")
          return (
            <p key={i} className="project2-paragraph">
              {b.text}
            </p>
          );
        if (b.t === "h3")
          return (
            <h3 key={i} className="project2-subheading">
              {b.text}
            </h3>
          );
        if (b.t === "ol") {
          return (
            <ol key={i} className="project2-list">
              {b.items.map((it, idx) => (
                <li key={idx}>{it}</li>
              ))}
            </ol>
          );
        }
        return (
          <p key={i} className="project2-paragraph">
            <a
              className="project2-link"
              href={b.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {b.text}
            </a>
          </p>
        );
      })}
    </>
  );
}

const IMAGES: readonly GalleryImage[] = [
  {
    src: "/Projects/Project2/image4.jpeg",
    alt: "Mieszkańcy w akcji",
    w: 1600,
    h: 1067,
  },
  {
    src: "/Projects/Project2/image5.jpeg",
    alt: "Mieszkańcy w akcji",
    w: 1600,
    h: 1067,
  },
  {
    src: "/Projects/Project2/image1.jpeg",
    alt: "Sprzątanie Łazarza",
    w: 1600,
    h: 1067,
  },
  {
    src: "/Projects/Project2/image7.jpeg",
    alt: "Mieszkańcy w akcji",
    w: 1600,
    h: 1067,
  },
  {
    src: "/Projects/Project2/image2.jpeg",
    alt: "Materiały do sprzątania",
    w: 1600,
    h: 1067,
  },
  {
    src: "/Projects/Project2/image3.jpeg",
    alt: "Zebrane odpady",
    w: 1600,
    h: 1067,
  },
  {
    src: "/Projects/Project2/image6.jpeg",
    alt: "Mieszkańcy w akcji",
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
      <div className="project2-gallery" role="list">
        {images.map((img, i) => (
          <button
            key={img.src}
            className="project2-gallery-item"
            onClick={() => open(i)}
            aria-label={`Otwórz zdjęcie ${i + 1} z ${images.length}`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 480px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="project2-gallery-img"
            />
          </button>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        className="project2-dialog"
        aria-label="Podgląd zdjęcia"
        onPointerDown={onBackdropPointerDown}
        onCancel={onCancel}
      >
        {active && (
          <div
            className="project2-viewer"
            role="document"
            onPointerDown={onViewerPointerDown}
            onPointerUp={onViewerPointerUp}
            onPointerCancel={onViewerPointerCancel}
          >
            <button
              className="project2-viewer-close"
              onClick={close}
              aria-label="Zamknij"
            >
              ×
            </button>
            <button
              className="project2-viewer-nav prev"
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
              className="project2-viewer-img"
              priority
            />
            <button
              className="project2-viewer-nav next"
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

export default function Project2Page() {
  return (
    <main className="project2-wrapper">
      <section className="project2-content">
        <h2 className="project2-subtitle">Sąsiedzkie sprzątanie Łazarza !!!</h2>
        <RichText blocks={DESCRIPTION} />
        <h3 className="project2-subheading">Galeria</h3>
        <Gallery images={IMAGES} />
      </section>
    </main>
  );
}
